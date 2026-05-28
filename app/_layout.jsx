import { Slot } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

/**
 * Layout raiz: envolve todo o app com o provedor de autenticação.
 * O <Slot /> renderiza a rota ativa (index, (auth)/*, (app)/*).
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <Slot />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
