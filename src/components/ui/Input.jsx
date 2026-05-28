import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

/**
 * Campo de texto — estilo web: flex items-center bg-gray-200 rounded-md com ícone.
 * Passa `icone` (nome MaterialIcons) para exibir ícone roxo à esquerda.
 */
export function Input({ label, erro, icone, style, ...props }) {
  return (
    <View style={[s.container, style]}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <View style={[s.row, erro && s.rowErro]}>
        {icone ? (
          <MaterialIcons name={icone} size={20} color={theme.colors.textPurple} style={s.icone} />
        ) : null}
        <TextInput
          style={s.input}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
      </View>
      {erro ? <Text style={s.textoErro}>{erro}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: { marginBottom: theme.spacing.md },
  label: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    fontWeight: "500",
  },
  // bg-gray-200 px-3 py-2 rounded-md (web)
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rowErro: { borderWidth: 1, borderColor: theme.colors.danger },
  icone: { marginRight: 8 },
  input: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    minHeight: 24,
  },
  textoErro: { color: theme.colors.danger, fontSize: theme.fontSize.sm, marginTop: theme.spacing.xs },
});
