import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export function EmptyStateContatos({ onAdicionar }) {
  return (
    <View style={s.container}>
      <Pressable onPress={onAdicionar} style={s.imagemWrapper}>
        <Image
          source={require("../../assets/figura.png")}
          style={s.imagem}
          resizeMode="contain"
        />
      </Pressable>
      <Text style={s.texto}>
        Toque no '+' para adicionar{"\n"}alguém em quem você confia.
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imagemWrapper: {
    width: 140,
    height: 140,
  },
  imagem: {
    width: "100%",
    height: "100%",
  },
  texto: {
    textAlign: "center",
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    lineHeight: 20,
  },
});
