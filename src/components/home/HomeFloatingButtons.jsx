import { View, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

export function HomeFloatingButtons({
  aberto,
  onToggleMenu,
  onAdicionar,
  onDisparar,
  disparando = false,
}) {
  return (
    <View style={s.container} pointerEvents="box-none">

      {aberto && (
        <>
          {/* Botão adicionar contato — equivale ao IconMais do web */}
          <Pressable
            style={[s.fab, s.fabAdicionar]}
            onPress={onAdicionar}
          >
            <MaterialIcons name="person-add" size={24} color="#FFF" />
          </Pressable>

          {/* Botão alerta geral — equivale ao IconAlerta do web */}
          <Pressable
            style={[s.fab, s.fabAlerta, disparando && s.fabDesabilitado]}
            onPress={onDisparar}
            disabled={disparando}
          >
            {disparando
              ? <ActivityIndicator color="#FFF" size="small" />
              : <MaterialIcons name="sos" size={26} color="#FFF" />
            }
          </Pressable>
        </>
      )}

      {/* Botão toggle — equivale ao IconAbrir/Fechar do web */}
      <Pressable style={[s.fab, s.fabToggle]} onPress={onToggleMenu}>
        <MaterialIcons
          name={aberto ? "close" : "apps"}
          size={28}
          color="#FFF"
        />
      </Pressable>

    </View>
  );
}

const s = StyleSheet.create({
  // fixed bottom-24 right-6 flex flex-col items-end gap-3 z-50 (web)
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 99,
    alignItems: "flex-end",
    gap: 12,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  fabToggle: {
    backgroundColor: theme.colors.primary,
  },
  fabAdicionar: {
    backgroundColor: theme.colors.primaryDark,
  },
  fabAlerta: {
    backgroundColor: "#DC2626",
  },
  fabDesabilitado: {
    opacity: 0.6,
  },
});
