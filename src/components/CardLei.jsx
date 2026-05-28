import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

/**
 * Card expansível de lei de proteção à mulher.
 * Toca no card para expandir/recolher os detalhes.
 */
export function CardLei({ lei, expandida, onToggle }) {
  return (
    <Pressable style={estilos.card} onPress={() => onToggle(lei.id)}>
      <View style={estilos.cabecalho}>
        <View style={estilos.infoCabecalho}>
          <Text style={estilos.artigo}>{lei.artigo}</Text>
          <Text style={estilos.titulo}>{lei.titulo}</Text>
        </View>
        <MaterialIcons
          name={expandida ? "expand-less" : "expand-more"}
          size={24}
          color={theme.colors.primary}
        />
      </View>

      <Text style={estilos.descricao}>{lei.descricao}</Text>

      {expandida && (
        <View style={estilos.detalhes}>
          <View style={estilos.separador} />
          {lei.pontos.map((ponto, index) => (
            <View key={index} style={estilos.ponto}>
              <MaterialIcons name="check-circle" size={16} color={theme.colors.primary} />
              <Text style={estilos.textoPonto}>{ponto}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  infoCabecalho: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  artigo: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: "600",
    marginBottom: 2,
  },
  titulo: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  descricao: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  detalhes: {
    marginTop: theme.spacing.sm,
  },
  separador: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
  },
  ponto: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  textoPonto: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
    lineHeight: 20,
  },
});
