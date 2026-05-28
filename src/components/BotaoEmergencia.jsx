import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

/**
 * Botão circular de emergência — cor primária roxa do app.
 * width/height 200, borderRadius 100, ícone sos tamanho 48.
 */
export function BotaoEmergencia({ onPress, carregando = false }) {
  return (
    <Pressable
      style={({ pressed }) => [s.botao, pressed && s.pressionado]}
      onPress={onPress}
      disabled={carregando}
    >
      {carregando ? (
        <ActivityIndicator color="#FFF" size="large" />
      ) : (
        <>
          <MaterialIcons name="sos" size={48} color="#FFF" />
          <Text style={s.texto}>EMERGÊNCIA</Text>
        </>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  botao: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
  },
  pressionado: {
    backgroundColor: theme.colors.primaryDark,
    transform: [{ scale: 0.96 }],
  },
  texto: {
    color: "#FFF",
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    marginTop: theme.spacing.xs,
    letterSpacing: 1,
  },
});
