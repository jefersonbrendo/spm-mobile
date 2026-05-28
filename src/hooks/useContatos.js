import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

const CACHE_KEY = "contatosEmergencia";

export function useContatos() {
  const { user } = useAuth();
  const [contatos, setContatos] = useState([]);

  const atualizarCache = async (lista) => {
    setContatos(lista);
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(lista));
    } catch {
      // falha silenciosa no cache
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(CACHE_KEY).then((cached) => {
      if (cached) setContatos(JSON.parse(cached));
    });
    fetchContatos();
  }, [user]);

  const fetchContatos = async () => {
    const uid = user?.localId;
    if (!uid) return;
    try {
      const ref = collection(db, "usuarios", uid, "contatosEmergencia");
      const snapshot = await getDocs(ref);
      const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      await atualizarCache(lista);
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
    }
  };

  const adicionarContato = async ({ nome, telefone }) => {
    const uid = user?.localId;
    if (!uid) return;
    const ref = collection(db, "usuarios", uid, "contatosEmergencia");
    await addDoc(ref, { nome, telefone, criadoEm: new Date() });
    await fetchContatos();
  };

  const editarContato = async (id, { nome, telefone }) => {
    const uid = user?.localId;
    if (!uid) return;
    const ref = doc(db, "usuarios", uid, "contatosEmergencia", id);
    await updateDoc(ref, { nome, telefone });
    await fetchContatos();
  };

  const deletarContato = async (id) => {
    const uid = user?.localId;
    if (!uid) return;
    await deleteDoc(doc(db, "usuarios", uid, "contatosEmergencia", id));
    await fetchContatos();
  };

  return { contatos, fetchContatos, adicionarContato, editarContato, deletarContato };
}
