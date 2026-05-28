import { useState } from "react";
import {
  View, Text, FlatList, Modal, Pressable, Alert,
  StyleSheet, KeyboardAvoidingView, Platform,
  TextInput, ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useContatos } from "../../src/hooks/useContatos";
import { theme } from "../../src/styles/theme";

// Card de contato no estilo web (bg-gray-100, expansível, botões pill)
function ContatoCard({ contato, onDeletar }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <Pressable
      style={s.card}
      onPress={() => setExpandido(v => !v)}
    >
      {/* Cabeçalho do card */}
      <View style={s.cardHeader}>
        <View style={s.cardEsquerda}>
          {/* Avatar purple-200 com ícone (web: w-10 h-10 bg-purple-200 rounded-full) */}
          <View style={s.avatar}>
            <MaterialIcons name="person" size={20} color={theme.colors.textPurple} />
          </View>
          <Text style={s.cardNome} numberOfLines={1}>{contato.nome}</Text>
        </View>
        <MaterialIcons
          name={expandido ? "expand-less" : "expand-more"}
          size={24}
          color={theme.colors.primary}
        />
      </View>

      {/* Telefone (sempre visível abaixo do nome) */}
      <Text style={s.cardTelefone}>{contato.telefone}</Text>

      {/* Botões de ação — visíveis quando expandido (web: yellow/red/green pill buttons) */}
      {expandido && (
        <View style={s.cardAcoes}>
          <Pressable
            style={[s.btnAcao, s.btnExcluir]}
            onPress={() => onDeletar(contato.id)}
          >
            <MaterialIcons name="delete" size={14} color="#FFF" />
            <Text style={s.btnTexto}>EXCLUIR</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

export default function ContatosScreen() {
  const { contatos, adicionarContato, deletarContato } = useContatos();
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [salvando, setSalvando] = useState(false);

  const abrirModal = () => { setNome(""); setTelefone(""); setModalAberto(true); };
  const fecharModal = () => setModalAberto(false);

  const handleSalvar = async () => {
    if (!nome.trim()) { Alert.alert("Atenção", "Informe o nome do contato."); return; }
    if (telefone.replace(/\D/g, "").length < 10) { Alert.alert("Atenção", "Telefone inválido (mínimo 10 dígitos)."); return; }

    setSalvando(true);
    try {
      await adicionarContato({ nome: nome.trim(), telefone: telefone.replace(/\D/g, "") });
      fecharModal();
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o contato.");
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = (id) => {
    Alert.alert("Remover contato", "Tem certeza que deseja remover este contato?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: () => deletarContato(id) },
    ]);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header roxo */}
      <View style={s.header}>
        <View style={s.headerLogo}>
          <Text style={s.headerLogoTexto}>SAS</Text>
        </View>
        <Text style={s.headerTitulo}>CONTATOS</Text>
      </View>

      {/* Conteúdo branco */}
      <View style={s.conteudo}>
        <FlatList
          data={contatos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContatoCard contato={item} onDeletar={handleDeletar} />
          )}
          contentContainerStyle={s.lista}
          ListHeaderComponent={
            <Text style={s.listaInfo}>
              {contatos.length} contato{contatos.length !== 1 ? "s" : ""} de emergência
            </Text>
          }
          ListEmptyComponent={
            <View style={s.vazio}>
              <MaterialIcons name="person-add-disabled" size={52} color={theme.colors.border} />
              <Text style={s.vazioTexto}>Nenhum contato ainda</Text>
              <Text style={s.vazioSub}>Toque em + para adicionar seu primeiro contato de emergência.</Text>
            </View>
          }
        />

        {/* FAB roxo — igual ao floating button do web */}
        <Pressable style={s.fab} onPress={abrirModal}>
          <MaterialIcons name="add" size={28} color="#FFF" />
        </Pressable>
      </View>

      {/* Modal de adição */}
      <Modal visible={modalAberto} transparent animationType="slide" onRequestClose={fecharModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={s.modalOverlay}
        >
          <View style={s.modalBox}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitulo}>Novo contato</Text>
              <Pressable onPress={fecharModal} hitSlop={8}>
                <MaterialIcons name="close" size={24} color={theme.colors.text} />
              </Pressable>
            </View>

            {/* Inputs estilo web */}
            <View style={s.inputRow}>
              <MaterialIcons name="person" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Nome"
                placeholderTextColor={theme.colors.textSecondary}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            <View style={s.inputRow}>
              <MaterialIcons name="call" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Telefone (ex: 85912345678)"
                placeholderTextColor={theme.colors.textSecondary}
                value={telefone}
                onChangeText={t => setTelefone(t.replace(/\D/g, ""))}
                keyboardType="phone-pad"
                maxLength={11}
              />
            </View>

            <Pressable
              style={[s.botaoSalvar, salvando && { opacity: 0.6 }]}
              onPress={handleSalvar}
              disabled={salvando}
            >
              {salvando
                ? <ActivityIndicator color="#FFF" />
                : <Text style={s.botaoSalvarTexto}>Salvar contato</Text>
              }
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.primary },

  header: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  headerLogo: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  headerLogoTexto: { color: theme.colors.white, fontWeight: "900", fontSize: theme.fontSize.md },
  headerTitulo: { color: theme.colors.white, fontSize: theme.fontSize.lg, fontWeight: "600", letterSpacing: 1 },

  conteudo: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
  },
  lista: { padding: theme.spacing.md, paddingBottom: 80 },
  listaInfo: {
    fontSize: theme.fontSize.md, color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md, fontWeight: "500",
  },

  // Card — bg-gray-100 rounded-xl shadow-md (web: ContatoCard)
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    marginBottom: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardEsquerda: { flexDirection: "row", alignItems: "center", flex: 1 },
  // Avatar purple-200 (web: w-10 h-10 bg-purple-200 rounded-full)
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#DDD6FE",
    alignItems: "center", justifyContent: "center",
    marginRight: 12,
  },
  cardNome: { fontSize: theme.fontSize.md, fontWeight: "600", color: "#1F2937", flex: 1 },
  cardTelefone: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, marginTop: 4, marginLeft: 52 },

  // Botões de ação — pill buttons (web: rounded-full)
  cardAcoes: { flexDirection: "row", gap: 8, marginTop: 12, justifyContent: "flex-end" },
  btnAcao: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  btnExcluir: { backgroundColor: "#F87171" },
  btnTexto: { color: "#FFF", fontSize: theme.fontSize.sm, fontWeight: "600" },

  vazio: { alignItems: "center", paddingTop: 60 },
  vazioTexto: { fontSize: theme.fontSize.lg, fontWeight: "600", color: theme.colors.textSecondary, marginTop: 12 },
  vazioSub: { fontSize: theme.fontSize.md, color: theme.colors.textSecondary, textAlign: "center", marginTop: 6, paddingHorizontal: 32, lineHeight: 22 },

  // FAB
  fab: {
    position: "absolute", bottom: theme.spacing.lg, right: theme.spacing.lg,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: "center", justifyContent: "center",
    elevation: 6,
    shadowColor: "#000", shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3, shadowRadius: 4,
  },

  // Modal
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
  modalBox: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl + 8,
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.lg },
  modalTitulo: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text },

  inputRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12, paddingVertical: 10,
    marginBottom: theme.spacing.md,
  },
  inputIcone: { marginRight: 8 },
  inputTexto: { flex: 1, fontSize: theme.fontSize.md, color: theme.colors.text },

  botaoSalvar: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  botaoSalvarTexto: { color: "#FFF", fontWeight: "600", fontSize: theme.fontSize.lg },
});
