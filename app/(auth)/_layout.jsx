import { Stack } from "expo-router";
import { theme } from "../../src/styles/theme";

/**
 * Layout das telas de autenticação (login e cadastro).
 * Sem header visível — as telas têm seu próprio cabeçalho visual.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: "slide_from_right",
      }}
    />
  );
}
