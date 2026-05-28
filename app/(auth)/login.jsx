import { useState, useEffect } from "react";
import {
  View, Text, TextInput, Pressable, Image,
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, ActivityIndicator, Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { signIn } from "../../src/services/auth";
import { useAuth } from "../../src/context/AuthContext";
import { theme } from "../../src/styles/theme";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  useEffect(() => {
    if (cadastroSucesso) {
      const t = setTimeout(() => setCadastroSucesso(false), 2000);
      return () => clearTimeout(t);
    }
  }, [cadastroSucesso]);

  const handleLogin = async () => {
    setErro("");
    if (!email.trim() || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    try {
      const userData = await signIn(email.trim(), senha);
      login(userData);
      router.replace("/(app)/home");
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.root}>

      {/* Ondas decorativas — simula wave-bg.svg do web */}
      <View style={s.waveTop} />
      <View style={s.waveBottom} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={s.flex}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* Alertas — LoginAlerts do web */}
          {cadastroSucesso && (
            <View style={[s.alerta, s.alertaSucesso]}>
              <Text style={s.alertaTexto}>Cadastro realizado com sucesso!</Text>
            </View>
          )}
          {!!erro && (
            <View style={[s.alerta, s.alertaErro]}>
              <Text style={s.alertaTexto}>{erro}</Text>
            </View>
          )}

          {/* Logo — /logo.png do web */}
          <Image
            source={require("../../src/assets/logo.png")}
            style={s.logo}
            resizeMode="contain"
          />

          {/* Card — bg-purple-100 rounded-2xl shadow-lg (web exato) */}
          <View style={s.card}>
            <Text style={s.cardTitulo}>LOGIN</Text>
            <Text style={s.cardSub}>Acessa seu conta</Text>

            {/* Email — flex items-center bg-gray-200 px-3 py-2 rounded-md */}
            <View style={s.inputRow}>
              <MaterialIcons name="mail" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="E-mail"
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Senha — com toggle de visibilidade */}
            <View style={[s.inputRow, s.inputRowSenha]}>
              <MaterialIcons name="lock" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Senha"
                placeholderTextColor={theme.colors.textSecondary}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!senhaVisivel}
              />
              <Pressable onPress={() => setSenhaVisivel(v => !v)} hitSlop={8}>
                <MaterialIcons
                  name={senhaVisivel ? "visibility-off" : "visibility"}
                  size={18}
                  color={theme.colors.textSecondary}
                />
              </Pressable>
            </View>

            {/* Esqueceu a senha — text-right text-xs text-blue-700 */}
            <View style={s.esqueciRow}>
              <Text style={s.esqueciTexto}>Esqueceu a senha?</Text>
            </View>

            {/* Botão Entrar — bg-purple-600 rounded-full */}
            <Pressable
              style={[s.botao, loading && s.botaoDesabilitado]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#FFF" />
                : <Text style={s.botaoTexto}>Entrar</Text>
              }
            </Pressable>

            {/* Rodapé — Não tem uma conta? Cadastre-se */}
            <View style={s.rodape}>
              <Text style={s.rodapeTexto}>Não tem uma conta? </Text>
              <Pressable onPress={() => router.push("/(auth)/cadastro")}>
                <Text style={s.rodapeLink}>Cadastre-se</Text>
              </Pressable>
            </View>
          </View>

          {/* Botões Sociais — SocialLoginButtons do web */}
          <View style={s.socialRow}>
            {[
              { label: "Google",   icon: "google",    color: "#EA4335" },
              { label: "Facebook", icon: "facebook",  color: "#1877F2" },
              { label: "Apple",    icon: "apple",     color: "#000000" },
            ].map((item) => (
              <Pressable key={item.label} style={({ pressed }) => [s.socialBtn, pressed && s.socialBtnPressed]}>
                <MaterialCommunityIcons name={item.icon} size={18} color={item.color} />
                <Text style={s.socialBtnTexto}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: { flex: 1 },

  // Ondas decorativas (simulam wave-bg.svg)
  waveTop: {
    position: "absolute",
    top: -100,
    left: -60,
    width: width * 1.3,
    height: 340,
    backgroundColor: "#7C3AED",
    opacity: 0.12,
    borderRadius: 170,
    transform: [{ rotate: "-14deg" }],
    zIndex: 0,
  },
  waveBottom: {
    position: "absolute",
    bottom: -100,
    right: -80,
    width: width * 1.3,
    height: 340,
    backgroundColor: "#7C3AED",
    opacity: 0.08,
    borderRadius: 170,
    transform: [{ rotate: "-14deg" }],
    zIndex: 0,
  },

  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 16,
    zIndex: 1,
  },

  // Alertas — bg-green-400 / bg-red-400
  alerta: {
    width: "100%",
    maxWidth: 380,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    marginBottom: 12,
  },
  alertaSucesso: { backgroundColor: "#4ADE80" },
  alertaErro: { backgroundColor: "#F87171" },
  alertaTexto: { color: "#FFF", fontSize: theme.fontSize.sm, fontWeight: "500" },

  // Logo — w-24 h-24 mt-12 (web)
  logo: {
    width: 96,
    height: 96,
    marginTop: 16,
    marginBottom: 8,
  },

  // Card — bg-purple-100 mt-10 rounded-2xl shadow-lg max-w-sm p-6
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTitulo: {
    fontSize: theme.fontSize.xxl,
    fontWeight: "800",
    textAlign: "center",
    color: theme.colors.text,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: theme.fontSize.sm,
    color: "#374151",
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },

  // Input — flex items-center bg-gray-200 px-3 py-2 rounded-md
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: theme.spacing.md,
  },
  inputRowSenha: {
    marginBottom: 4,
  },
  inputIcone: { marginRight: 8 },
  inputTexto: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    minHeight: 22,
  },

  // Esqueceu — text-right text-xs text-blue-700
  esqueciRow: { alignItems: "flex-end", marginBottom: theme.spacing.md },
  esqueciTexto: { fontSize: 12, color: "#1D4ED8" },

  // Botão — bg-purple-600 rounded-full py-2
  botao: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoTexto: { color: "#FFF", fontSize: theme.fontSize.md, fontWeight: "600" },

  // Rodapé
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  rodapeTexto: { fontSize: theme.fontSize.sm, color: "#374151" },
  rodapeLink: { fontSize: theme.fontSize.sm, color: "#1D4ED8", fontWeight: "600" },

  // Botões sociais — flex gap-3 mt-6 (web)
  socialRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  socialBtnPressed: { backgroundColor: "#F3F4F6" },
  socialBtnTexto: { fontSize: theme.fontSize.sm, color: "#1F2937" },
});
