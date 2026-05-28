import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

/**
 * Badge (etiqueta) para exibir contagem ou status.
 * Variantes: primary, success, danger.
 */
export function Badge({ texto, variante = "primary", style }) {
  return (
    <View style={[estilos.base, estilos[variante], style]}>
      <Text style={estilos.texto}>{texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    alignSelf: "flex-start",
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  texto: {
    color: "#FFF",
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
  },
});
