import { FlatList, View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

// ContatoCard — espelho de src/components/contatos/ContatoCard.jsx do web
function ContatoCard({ contato, isExpanded, onToggleExpand, onEditar, onDeletar, onEnviar }) {
  const confirmarDeletar = () => {
    Alert.alert(
      "Excluir contato",
      `Remover ${contato.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: onDeletar },
      ]
    );
  };

  return (
    // bg-gray-100 rounded-xl shadow-md px-4 py-3 (web)
    <Pressable style={s.card} onPress={onToggleExpand}>

      {/* Cabeçalho — flex items-center justify-between (web) */}
      <View style={s.cabecalho}>
        <View style={s.cabecalhoEsquerda}>
          {/* w-10 h-10 bg-purple-200 rounded-full (web) */}
          <View style={s.avatar}>
            <MaterialIcons name="person" size={20} color={theme.colors.textPurple} />
          </View>
          <Text style={s.nome} numberOfLines={1}>{contato.nome}</Text>
        </View>
        <MaterialIcons
          name={isExpanded ? "expand-less" : "expand-more"}
          size={24}
          color={theme.colors.primary}
        />
      </View>

      {/* Botões de ação — exibidos quando expandido */}
      {isExpanded && (
        <View style={s.acoes}>
          {/* EDITAR — bg-yellow-300 rounded-full (web) */}
          <Pressable
            style={({ pressed }) => [s.btnAcao, s.btnEditar, pressed && { opacity: 0.8 }]}
            onPress={(e) => { e.stopPropagation?.(); onEditar(); }}
          >
            <MaterialIcons name="edit" size={14} color="#000" />
            <Text style={s.btnAcaoTexto}>EDITAR</Text>
          </Pressable>

          {/* EXCLUIR — bg-red-400 rounded-full (web) */}
          <Pressable
            style={({ pressed }) => [s.btnAcao, s.btnExcluir, pressed && { opacity: 0.8 }]}
            onPress={(e) => { e.stopPropagation?.(); confirmarDeletar(); }}
          >
            <MaterialIcons name="delete" size={14} color="#FFF" />
            <Text style={[s.btnAcaoTexto, s.btnAcaoTextoBranco]}>EXCLUIR</Text>
          </Pressable>

          {/* ENVIAR — bg-green-300 rounded-full (web) */}
          <Pressable
            style={({ pressed }) => [s.btnAcao, s.btnEnviar, pressed && { opacity: 0.8 }]}
            onPress={(e) => { e.stopPropagation?.(); onEnviar(); }}
          >
            <MaterialIcons name="send" size={14} color="#000" />
            <Text style={s.btnAcaoTexto}>ENVIAR</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

// ListaContatos — espelho de src/components/contatos/ListaContatos.jsx do web
export function ListaContatos({
  contatos,
  expandedIndex,
  onToggleExpand,
  onEditarContato,
  onDeletarContato,
  onEnviarContato,
}) {
  return (
    <FlatList
      data={contatos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={s.lista}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ContatoCard
          contato={item}
          isExpanded={expandedIndex === index}
          onToggleExpand={() => onToggleExpand(index)}
          onEditar={() => onEditarContato(item)}
          onDeletar={() => onDeletarContato(item.id)}
          onEnviar={() => onEnviarContato?.(item)}
        />
      )}
    />
  );
}

const s = StyleSheet.create({
  lista: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 100,
    gap: 12,
  },

  // bg-gray-100 rounded-xl shadow-md px-4 py-3 (web)
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // flex items-center justify-between (web)
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cabecalhoEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  // w-10 h-10 bg-purple-200 rounded-full (web)
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DDD6FE",
    alignItems: "center",
    justifyContent: "center",
  },
  nome: {
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
    color: "#1F2937",
    flex: 1,
  },

  // mt-3 flex justify-between items-center gap-2 (web)
  acoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 12,
  },

  // flex-1 rounded-full py-2 gap-2 (web — pill buttons)
  btnAcao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  btnEditar: { backgroundColor: "#FDE047" },
  btnExcluir: { backgroundColor: "#F87171" },
  btnEnviar: { backgroundColor: "#86EFAC" },
  btnAcaoTexto: {
    fontSize: 11,
    fontWeight: "600",
    color: "#000",
  },
  btnAcaoTextoBranco: { color: "#FFF" },
});
