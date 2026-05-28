import { useEffect, useState } from "react";
import {
  Modal, View, Text, TextInput, Pressable,
  KeyboardAvoidingView, Platform, StyleSheet, Alert,
} from "react-native";
import { theme } from "../../styles/theme";

export default function AdicionarContatoModal({
  visible,
  onClose,
  onSalvar,
  contatoExistente = null,
}) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    setNome(contatoExistente?.nome || "");
    setTelefone(contatoExistente?.telefone || "");
  }, [contatoExistente, visible]);

  const handleSalvar = () => {
    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (!nome.trim() || telefoneLimpo.length !== 11) {
      Alert.alert("Atenção", "Preencha nome e um telefone válido com 11 dígitos.");
      return;
    }
    onSalvar({ nome: nome.trim(), telefone: telefoneLimpo });
    setNome("");
    setTelefone("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm (web) */}
      <View style={s.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* w-11/12 max-w-md bg-white rounded-2xl p-6 shadow-lg (web) */}
          <View style={s.card}>
            <Text style={s.titulo}>
              {contatoExistente ? "Editar contato" : "Adicionar contato"}
            </Text>

            {/* Nome */}
            <Text style={s.label}>Nome</Text>
            <TextInput
              style={s.input}
              placeholder="Nome do contato"
              placeholderTextColor={theme.colors.textSecondary}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            {/* Telefone */}
            <Text style={s.label}>Telefone</Text>
            <TextInput
              style={s.input}
              placeholder="(85) 9 9999-9999"
              placeholderTextColor={theme.colors.textSecondary}
              value={telefone}
              onChangeText={(t) => setTelefone(t.replace(/\D/g, ""))}
              keyboardType="phone-pad"
              maxLength={11}
            />

            {/* Aviso */}
            <View style={s.aviso}>
              <Text style={s.avisoTexto}>
                ⚠️ Certifique-se de adicionar apenas pessoas de confiança que possam
                te ajudar em situações de emergência.
              </Text>
            </View>

            {/* Botões — flex justify-end gap-3 mt-6 (web) */}
            <View style={s.botoesRow}>
              <Pressable
                style={({ pressed }) => [s.btnCancelar, pressed && s.btnPressed]}
                onPress={onClose}
              >
                <Text style={s.btnCancelarTexto}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [s.btnSalvar, pressed && { opacity: 0.85 }]}
                onPress={handleSalvar}
              >
                <Text style={s.btnSalvarTexto}>
                  {contatoExistente ? "Salvar" : "Adicionar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFF",
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  titulo: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    color: "#111827",
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 4,
  },
  // w-full border border-gray-300 rounded-lg px-3 py-2 text-sm (web)
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  aviso: {
    marginTop: 4,
  },
  avisoTexto: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
  },
  // flex justify-end gap-3 mt-6 (web)
  botoesRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: theme.spacing.lg,
  },
  btnCancelar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  btnPressed: { backgroundColor: "#F3F4F6" },
  btnCancelarTexto: {
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
    color: "#374151",
  },
  // gradient bg-purple (web: background: "linear-gradient(90deg, #8B00FF 0%, #BF00FF 100%)")
  btnSalvar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primaryDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  btnSalvarTexto: {
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
    color: "#FFF",
  },
});
