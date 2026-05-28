import { useState } from "react";
import { Alert } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { enviarAlertaComLocalizacao, enviarAlertaSemLocalizacao } from "../services/whatsapp";
import { useLocalizacao } from "./useLocalizacao";

export function useEmergencia(contatos) {
  const { user } = useAuth();
  const [disparando, setDisparando] = useState(false);
  const { obterLocalizacao } = useLocalizacao();

  const dispararAlerta = async () => {
    if (!contatos?.length) {
      Alert.alert(
        "Sem contatos",
        "Cadastre pelo menos um contato de emergência antes de usar o alerta.",
        [{ text: "OK" }]
      );
      return;
    }

    setDisparando(true);

    try {
      let nomeUsuario = "Usuária";
      const uid = user?.localId;
      if (uid) {
        const snap = await getDoc(doc(db, "usuarios", uid));
        if (snap.exists()) nomeUsuario = snap.data().usuario || nomeUsuario;
      }

      const coords = await obterLocalizacao();
      const primeiroContato = contatos[0];

      if (coords) {
        await enviarAlertaComLocalizacao(
          primeiroContato.telefone,
          nomeUsuario,
          coords.latitude,
          coords.longitude
        );
      } else {
        await enviarAlertaSemLocalizacao(primeiroContato.telefone, nomeUsuario);
      }
    } catch (err) {
      console.error("Erro ao disparar alerta:", err);
      Alert.alert("Erro", "Não foi possível enviar o alerta. Tente novamente.");
    } finally {
      setDisparando(false);
    }
  };

  return { dispararAlerta, disparando };
}
