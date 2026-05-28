import { View, Text, Image, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export function HomeHeader({ title = "HOME" }) {
  return (
    <View style={s.header}>
      <Image
        source={require("../../assets/logo.png")}
        style={s.logo}
        resizeMode="contain"
      />
      <Text style={s.titulo}>{title}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    minHeight: 72,
  },
  logo: {
    width: 52,
    height: 52,
    marginRight: theme.spacing.sm,
  },
  titulo: {
    color: "#FFF",
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
