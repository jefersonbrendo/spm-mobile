import { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../src/context/AuthContext";
import { theme } from "../../src/styles/theme";

export default function AppLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Fundo roxo igual ao bottom-gradient do web
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: "rgba(255,255,255,0.55)",
        tabBarLabelStyle: {
          fontSize: theme.fontSize.sm,
          fontWeight: "600",
        },
        // Fundo do ícone ativo: círculo branco semi-transparente (como web: rounded-full border-white)
        tabBarItemStyle: { borderRadius: theme.borderRadius.full },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="home" size={focused ? 28 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="map" size={focused ? 28 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="contatos" options={{ href: null }} />
      <Tabs.Screen
        name="leis"
        options={{
          title: "Leis",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="gavel"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="person"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
