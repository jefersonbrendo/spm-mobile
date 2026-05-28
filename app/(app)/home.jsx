import { View, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHomePage } from "../../src/hooks/useHomePage";
import { useEmergencia } from "../../src/hooks/useEmergencia";
import { enviarAlertaSemLocalizacao } from "../../src/services/whatsapp";
import { useAuth } from "../../src/context/AuthContext";
import { HomeHeader } from "../../src/components/home/HomeHeader";
import { HomeFloatingButtons } from "../../src/components/home/HomeFloatingButtons";
import { ListaContatos } from "../../src/components/contatos/ListaContatos";
import { EmptyStateContatos } from "../../src/components/contatos/EmptyStateContatos";
import AdicionarContatoModal from "../../src/components/contatos/AdicionarContatoModal";
import { theme } from "../../src/styles/theme";

export default function HomeScreen() {
  const { user } = useAuth();
  const {
    contatos,
    aberto,
    toggleMenu,
    mostrarModal,
    abrirModalNovo,
    abrirModalEditar,
    fecharModal,
    expandedIndex,
    handleToggleExpand,
    salvarContato,
    handleDeletarContato,
    contatoEditando,
  } = useHomePage();

  const { dispararAlerta, disparando } = useEmergencia(contatos);

  const confirmarAlerta = () => {
    Alert.alert(
      "Enviar Alerta de Emergência?",
      "Isso enviará sua localização para seus contatos via WhatsApp.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Enviar agora", style: "destructive", onPress: dispararAlerta },
      ]
    );
  };

  const handleEnviarContato = (contato) => {
    const nomeUsuario = user?.displayName || user?.email?.split("@")[0] || "Usuária";
    Alert.alert(
      "Enviar mensagem?",
      `Enviar alerta de emergência para ${contato.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Enviar",
          onPress: () => enviarAlertaSemLocalizacao(contato.telefone, nomeUsuario),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={s.safe}>

      {/* Header roxo com logo — HomeHeader do web */}
      <HomeHeader title="HOME" />

      {/* Conteúdo branco — flex flex-col px-4 py-6 bg-white rounded-bl-4xl rounded-br-4xl (web) */}
      <View style={s.conteudo}>

        {contatos.length === 0 ? (
          <View style={s.emptyContainer}>
            <EmptyStateContatos onAdicionar={abrirModalNovo} />
          </View>
        ) : (
          <ListaContatos
            contatos={contatos}
            expandedIndex={expandedIndex}
            onToggleExpand={handleToggleExpand}
            onEditarContato={abrirModalEditar}
            onDeletarContato={handleDeletarContato}
            onEnviarContato={handleEnviarContato}
          />
        )}

        {/* Botões flutuantes — fixed bottom-24 right-6 z-50 (web) */}
        <HomeFloatingButtons
          aberto={aberto}
          onToggleMenu={toggleMenu}
          onAdicionar={abrirModalNovo}
          onDisparar={confirmarAlerta}
          disparando={disparando}
        />

      </View>

      {/* Modal de adicionar/editar contato */}
      <AdicionarContatoModal
        visible={mostrarModal}
        onClose={fecharModal}
        onSalvar={salvarContato}
        contatoExistente={contatoEditando}
      />

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.primary },

  // flex flex-col bg-white rounded-bl-4xl rounded-br-4xl flex-1 (web)
  conteudo: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    overflow: "hidden",
    position: "relative",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
