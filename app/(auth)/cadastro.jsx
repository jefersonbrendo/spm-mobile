import { useState } from "react";
import {
  View, Text, TextInput, Pressable, Image,
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, ActivityIndicator, Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { signUp } from "../../src/services/auth";
import { db } from "../../src/services/firebase";
import { useAuth } from "../../src/context/AuthContext";
import { theme } from "../../src/styles/theme";

const { width } = Dimensions.get("window");

export default function CadastroScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastro = async () => {
    setErro("");
    setSucesso("");

    if (usuario.trim().length < 3) {
      setErro("O nome de usuário deve ter pelo menos 3 caracteres.");
      return;
    }
    if (!/^\d{11}$/.test(telefone)) {
      setErro("O telefone deve conter 11 números (DDD + número).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const userData = await signUp(email.trim(), senha);
      await setDoc(doc(db, "usuarios", userData.localId), {
        usuario: usuario.trim(),
        telefone,
        email: email.trim(),
        criadoEm: new Date(),
      });
      login(userData);
      router.replace("/(app)/home");
    } catch (err) {
      const msg = err.message || "";
      if (msg.includes("EMAIL_EXISTS") || msg.includes("email-already-in-use")) {
        setErro("Este e-mail já está em uso.");
      } else if (msg.includes("INVALID_EMAIL")) {
        setErro("E-mail inválido.");
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
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

          {/* Alertas — banner acima do logo */}
          {!!sucesso && (
            <View style={[s.alerta, s.alertaSucesso]}>
              <Text style={s.alertaTexto}>{sucesso}</Text>
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
            <Text style={s.cardTitulo}>CADASTRO</Text>
            <Text style={s.cardSub}>Crie uma conta gratuita</Text>

            {/* Usuário — person icon */}
            <View style={s.inputRow}>
              <MaterialIcons name="person" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Usuário"
                placeholderTextColor={theme.colors.textSecondary}
                value={usuario}
                onChangeText={t => { setUsuario(t); setErro(""); }}
                autoCapitalize="words"
              />
            </View>

            {/* Telefone — call icon, somente números, 11 dígitos */}
            <View style={s.inputRow}>
              <MaterialIcons name="call" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Telefone (ex: 85912345678)"
                placeholderTextColor={theme.colors.textSecondary}
                value={telefone}
                onChangeText={t => { setTelefone(t.replace(/\D/g, "")); setErro(""); }}
                keyboardType="phone-pad"
                maxLength={11}
              />
            </View>

            {/* E-mail — mail icon */}
            <View style={s.inputRow}>
              <MaterialIcons name="mail" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="E-mail"
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={t => { setEmail(t); setErro(""); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Senha — lock icon + toggle visibilidade */}
            <View style={[s.inputRow, s.inputRowUltimo]}>
              <MaterialIcons name="lock" size={20} color={theme.colors.textPurple} style={s.inputIcone} />
              <TextInput
                style={s.inputTexto}
                placeholder="Senha"
                placeholderTextColor={theme.colors.textSecondary}
                value={senha}
                onChangeText={t => { setSenha(t); setErro(""); }}
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

            {/* Botão cadastrar — bg-purple-600 rounded-full */}
            <Pressable
              style={[s.botao, loading && s.botaoDesabilitado]}
              onPress={handleCadastro}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#FFF" />
                : <Text style={s.botaoTexto}>Cadastrar-se</Text>
              }
            </Pressable>

            {/* Mensagens inline (texto simples) — texto-red-500/green-600 do web */}
            {!!erro && <Text style={s.textoErro}>{erro}</Text>}
            {!!sucesso && <Text style={s.textoSucesso}>{sucesso}</Text>}

            {/* Rodapé — Tem uma conta? Conecte-se */}
            <View style={s.rodape}>
              <Text style={s.rodapeTexto}>Já tem conta? </Text>
              <Pressable onPress={() => router.replace("/(auth)/login")}>
                <Text style={s.rodapeLink}>Entrar</Text>
              </Pressable>
            </View>
          </View>

          {/* Botões Sociais — CadastroSocialButtons do web */}
          <View style={s.socialRow}>
            {[
              { label: "Google",   icon: "google",   color: "#EA4335" },
              { label: "Facebook", icon: "facebook", color: "#1877F2" },
              { label: "Apple",    icon: "apple",    color: "#000000" },
            ].map((item) => (
              <Pressable
                key={item.label}
                style={({ pressed }) => [s.socialBtn, pressed && s.socialBtnPressed]}
              >
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
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 16,
    zIndex: 1,
  },

  // Alertas em banner
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

  // Logo — w-24 h-24 mb-4 (web)
  logo: {
    width: 96,
    height: 96,
    marginBottom: 4,
  },

  // Card — bg-purple-100 mt-4 rounded-2xl shadow-lg max-w-sm p-6
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

  // Input — flex items-center bg-gray-200 px-3 py-2 rounded-md mb-4
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: theme.spacing.md,
  },
  inputRowUltimo: {
    marginBottom: theme.spacing.lg,
  },
  inputIcone: { marginRight: 8 },
  inputTexto: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    minHeight: 22,
  },

  // Botão — bg-purple-600 rounded-full py-2
  botao: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoTexto: { color: "#FFF", fontSize: theme.fontSize.md, fontWeight: "600" },

  // Mensagens inline (texto simples — web: text-red-500 / text-green-600)
  textoErro: { color: "#EF4444", fontSize: theme.fontSize.sm, marginTop: 4, marginBottom: 4 },
  textoSucesso: { color: "#16A34A", fontSize: theme.fontSize.sm, marginTop: 4, marginBottom: 4 },

  // Rodapé
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.md,
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
