import { View, Text, ScrollView, Pressable, StyleSheet, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useJuridico } from "../../src/hooks/useJuridico";
import { theme } from "../../src/styles/theme";

// Card de lei — replica exatamente o LeiCard do web:
// bg-[#EDEDED] rounded-xl shadow-md, expandido mostra inner bg-white rounded-xl
function LeiCard({ lei, expandida, onToggle }) {
  return (
    <View style={s.card}>
      {/* Botão de toggle — título + seta (web: button w-full flex items-center justify-between) */}
      <Pressable style={s.cardHeader} onPress={() => onToggle(lei.id)}>
        <Text style={s.cardTitulo}>{lei.titulo}</Text>
        <MaterialIcons
          name={expandida ? "expand-less" : "expand-more"}
          size={28}
          color={theme.colors.textPurple}
        />
      </Pressable>

      {/* Conteúdo expandido — inner card branco (web: bg-white rounded-xl p-4 shadow-inner) */}
      {expandida && (
        <View style={s.inner}>
          {/* Artigo — text-purple-700 font-semibold (web exato) */}
          <Text style={s.innerArtigo}>{lei.artigo}</Text>

          {/* Descrição */}
          <Text style={s.innerDescricao}>{lei.descricao}</Text>

          {/* Principais Pontos */}
          <Text style={s.innerPontosTitulo}>Principais Pontos:</Text>
          {lei.pontos.map((p, i) => (
            <Text key={i} style={s.innerPonto}>• {p}</Text>
          ))}

          {/* Botão "Saiba Mais" — bg-purple-600 (web exato) */}
          <Pressable
            style={s.btnSaibaMais}
            onPress={() => Linking.openURL(lei.link)}
          >
            <Text style={s.btnSaibaMaisTexto}>Saiba Mais</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function JuridicoScreen() {
  const { leis, leiExpandida, toggleLei } = useJuridico();

  return (
    <SafeAreaView style={s.safe}>
      {/* Header roxo */}
      <View style={s.header}>
        <View style={s.headerLogo}>
          <Text style={s.headerLogoTexto}>SAS</Text>
        </View>
        <Text style={s.headerTitulo}>LEIS</Text>
      </View>

      {/* Conteúdo branco */}
      <View style={s.conteudo}>
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          {leis.map((lei) => (
            <LeiCard
              key={lei.id}
              lei={lei}
              expandida={leiExpandida === lei.id}
              onToggle={toggleLei}
            />
          ))}
        </ScrollView>
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
  },
  scroll: { padding: theme.spacing.md, paddingBottom: theme.spacing.xl },

  // Card externo — bg-[#EDEDED] rounded-xl shadow-md p-4 mb-4 (web exato)
  card: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  cardTitulo: { fontSize: 15, fontWeight: "700", color: theme.colors.text, flex: 1, marginRight: 8 },

  // Inner card — bg-white rounded-xl p-4 shadow-inner (web exato)
  inner: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  // text-purple-700 font-semibold text-sm (web exato)
  innerArtigo: {
    color: theme.colors.textPurple,
    fontWeight: "600",
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.sm,
  },
  innerDescricao: {
    color: "#374151",
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  innerPontosTitulo: {
    fontWeight: "600",
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.xs,
  },
  innerPonto: {
    fontSize: theme.fontSize.sm,
    color: "#4B5563",
    marginBottom: 6,
    lineHeight: 20,
  },
  // bg-purple-600 text-white rounded-lg (web exato)
  btnSaibaMais: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    alignItems: "center",
  },
  btnSaibaMaisTexto: { color: "#FFF", fontWeight: "600", fontSize: theme.fontSize.md },
});
