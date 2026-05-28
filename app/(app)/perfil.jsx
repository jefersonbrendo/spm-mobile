import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../src/context/AuthContext";
import { theme } from "../../src/styles/theme";

// Opções de configuração — replica o ConfigContent do web
const OPCOES = [
  { titulo: "Editar Perfil", icone: "person" },
  { titulo: "Privacidade & Segurança", icone: "shield" },
  { titulo: "Termos de Uso", icone: "description" },
  { titulo: "Sobre o App", icone: "info" },
];

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const obterIniciais = () => {
    const nome = user?.displayName || user?.email || "";
    const partes = nome.split(/[\s@]/);
    return partes.slice(0, 2).map(p => p.charAt(0).toUpperCase()).join("") || "?";
  };

  const handleSair = () => {
    Alert.alert("Sair da conta", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header roxo */}
      <View style={s.header}>
        <View style={s.headerLogo}>
          <Text style={s.headerLogoTexto}>SAS</Text>
        </View>
        <Text style={s.headerTitulo}>CONFIGURAÇÕES</Text>
      </View>

      {/* Conteúdo branco */}
      <View style={s.conteudo}>

        {/* Avatar + nome + email */}
        <View style={s.avatarSection}>
          <View style={s.avatar}>
            <Text style={s.avatarTexto}>{obterIniciais()}</Text>
          </View>
          <Text style={s.nomeTexto}>{user?.displayName || user?.email?.split("@")[0] || "Usuária"}</Text>
          <Text style={s.emailTexto}>{user?.email || ""}</Text>
        </View>

        {/* Lista de opções — estilo web: bg-white rounded-2xl shadow com items bg-gray-100 */}
        <View style={s.listaBox}>
          {OPCOES.map((op, i) => (
            <Pressable
              key={i}
              style={({ pressed }) => [s.opcaoItem, pressed && s.opcaoPressed]}
              onPress={() => {}} // futuro: navegar para sub-tela
            >
              <View style={s.opcaoEsquerda}>
                {/* material-symbols-outlined text-purple-600 text-3xl (web) */}
                <MaterialIcons name={op.icone} size={28} color={theme.colors.primary} />
                <Text style={s.opcaoTexto}>{op.titulo}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={theme.colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Botão sair — bg-red-500 rounded-xl (web exato) */}
        <Pressable style={s.btnSair} onPress={handleSair}>
          <Text style={s.btnSairTexto}>Sair da Conta</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.primary },

  header: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  headerLogo: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  headerLogoTexto: { color: theme.colors.white, fontWeight: "900", fontSize: theme.fontSize.md },
  headerTitulo: { color: theme.colors.white, fontSize: theme.fontSize.lg, fontWeight: "600", letterSpacing: 1 },

  conteudo: {
    flex: 1, backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
  },

  // Seção de avatar
  avatarSection: { alignItems: "center", marginBottom: theme.spacing.xl },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: "center", justifyContent: "center",
    marginBottom: theme.spacing.md,
    elevation: 4,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4,
  },
  avatarTexto: { fontSize: theme.fontSize.xxl, fontWeight: "800", color: "#FFF" },
  nomeTexto: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text },
  emailTexto: { fontSize: theme.fontSize.md, color: theme.colors.textSecondary, marginTop: 4 },

  // Lista de opções — bg-white rounded-2xl shadow-md (web: lista de settings)
  listaBox: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: theme.spacing.xl,
  },
  // Item — bg-gray-100 p-4 rounded-xl shadow (web exato)
  opcaoItem: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  opcaoPressed: { backgroundColor: "#E9EBEE" },
  opcaoEsquerda: { flexDirection: "row", alignItems: "center", gap: 12 },
  opcaoTexto: { fontSize: theme.fontSize.lg, fontWeight: "500", color: theme.colors.text },

  // Botão sair — bg-red-500 rounded-xl (web exato)
  btnSair: {
    backgroundColor: "#EF4444",
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  btnSairTexto: { color: "#FFF", fontWeight: "600", fontSize: theme.fontSize.lg },
});
