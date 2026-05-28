// Migrado do web: src/hooks/useLogin.js + useCadastro.js
// Mudança: removido useNavigate/useLocation (React Router) — navegação fica nas telas via Expo Router
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "../services/firebase";

export function useAuthActions() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const limparErro = () => setErro("");

  const login = async (email, senha) => {
    setErro("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(app), email, senha);
      return true;
    } catch {
      setErro("E-mail ou senha inválidos.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async ({ nome, telefone, email, senha }) => {
    setErro("");
    setLoading(true);

    if (nome.trim().length < 3) {
      setErro("O nome deve ter pelo menos 3 caracteres.");
      setLoading(false);
      return false;
    }
    const telefoneRegex = /^\d{11}$/;
    if (!telefoneRegex.test(telefone.replace(/\D/g, ""))) {
      setErro("O telefone deve conter 11 números (DDD + número).");
      setLoading(false);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("Por favor, insira um e-mail válido.");
      setLoading(false);
      return false;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
      return false;
    }

    try {
      const credencial = await createUserWithEmailAndPassword(getAuth(app), email, senha);
      const user = credencial.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        usuario: nome,
        telefone,
        email,
        criadoEm: new Date(),
      });

      return true;
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está em uso.");
      } else if (err.code === "auth/invalid-email") {
        setErro("E-mail inválido.");
      } else {
        setErro("Erro ao cadastrar: " + err.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sair = async () => {
    await firebaseSignOut(getAuth(app));
  };

  return { login, cadastrar, sair, loading, erro, limparErro };
}
