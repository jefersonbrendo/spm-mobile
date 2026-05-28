// Migrado do web: src/utils/whatsapp.js
// Mudança: window.open → Linking.openURL (React Native não tem window)
import { Linking, Alert } from "react-native";

/**
 * Abre o WhatsApp com uma mensagem pré-preenchida para o número informado.
 */
export async function enviarMensagemWhatsApp(telefone, mensagem) {
  if (!telefone) {
    Alert.alert("Erro", "Telefone inválido!");
    return;
  }

  const numeroLimpo = telefone.replace(/\D/g, "");
  if (numeroLimpo.length < 10) {
    Alert.alert("Erro", "Número de telefone inválido.");
    return;
  }

  const link = `whatsapp://send?phone=55${numeroLimpo}&text=${encodeURIComponent(mensagem)}`;

  const podeAbrir = await Linking.canOpenURL(link);
  if (!podeAbrir) {
    // Fallback para wa.me se o app não estiver instalado
    const linkFallback = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    await Linking.openURL(linkFallback);
    return;
  }

  await Linking.openURL(link);
}

/**
 * Envia alerta de emergência com localização via WhatsApp.
 * Recebe latitude e longitude já obtidos via expo-location.
 */
export async function enviarAlertaComLocalizacao(telefone, usuarioNome, latitude, longitude) {
  const linkMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const mensagem =
    `🚨 *Emergência!*\n\n${usuarioNome || "Um contato"} precisa de ajuda agora!\n\n` +
    `📍 Localização: ${linkMaps}\n\n(enviado via aplicativo SAS)`;

  await enviarMensagemWhatsApp(telefone, mensagem);
}

/**
 * Envia alerta sem localização (fallback quando a permissão é negada).
 */
export async function enviarAlertaSemLocalizacao(telefone, usuarioNome) {
  const mensagem =
    `🚨 *Emergência!*\n\n${usuarioNome || "Um contato"} precisa de ajuda agora!\n\n` +
    `(Localização não disponível)\n\n(enviado via aplicativo SAS)`;

  await enviarMensagemWhatsApp(telefone, mensagem);
}
