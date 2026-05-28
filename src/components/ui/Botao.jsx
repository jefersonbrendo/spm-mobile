import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

/**
 * Botão reutilizável — rounded-full (pill shape), estilo web bg-purple-600.
 * Variantes: primary (roxo), outline, danger.
 */
export function Botao({ titulo, onPress, variante = "primary", carregando = false, desabilitado = false, style }) {
  const containerStyle = [
    s.base,
    variante === "primary" && s.primary,
    variante === "outline" && s.outline,
    variante === "danger" && s.danger,
    (desabilitado || carregando) && s.desabilitado,
    style,
  ];

  return (
    <Pressable
      style={containerStyle}
      onPress={onPress}
      disabled={desabilitado || carregando}
    >
      {carregando ? (
        <ActivityIndicator color={variante === "outline" ? theme.colors.primary : "#FFF"} />
      ) : (
        <Text style={[s.texto, variante === "outline" && s.textoOutline]}>
          {titulo}
        </Text>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  // rounded-full — pill shape (estilo web)
  base: {
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  primary: { backgroundColor: theme.colors.primaryDark },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  danger: { backgroundColor: theme.colors.danger },
  desabilitado: { opacity: 0.5 },
  texto: { color: "#FFF", fontSize: theme.fontSize.lg, fontWeight: "600" },
  textoOutline: { color: theme.colors.primary },
});
