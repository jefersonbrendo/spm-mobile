import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

/**
 * Card de contato de emergência com nome, telefone e botão de exclusão.
 */
export function CardContato({ contato, onDeletar }) {
  return (
    <View style={estilos.card}>
      <View style={estilos.avatar}>
        <Text style={estilos.avatarLetra}>
          {contato.nome?.charAt(0).toUpperCase() || "?"}
        </Text>
      </View>

      <View style={estilos.info}>
        <Text style={estilos.nome} numberOfLines={1}>{contato.nome}</Text>
        <Text style={estilos.telefone}>{contato.telefone}</Text>
      </View>

      <Pressable
        style={estilos.botaoDeletar}
        onPress={() => onDeletar(contato.id)}
        hitSlop={8}
      >
        <MaterialIcons name="delete-outline" size={24} color={theme.colors.danger} />
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  avatarLetra: {
    color: "#FFF",
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    color: theme.colors.text,
  },
  telefone: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  botaoDeletar: {
    padding: theme.spacing.xs,
  },
});
