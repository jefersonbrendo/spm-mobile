// Componente nativo: usa react-native-maps (Android/iOS apenas)
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useMapa } from "../hooks/useMapa";
import { theme } from "../styles/theme";

const REGIAO_INICIAL = {
  latitude: -3.7327,
  longitude: -38.527,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

export default function MapaDelegaciasNative() {
  const { delegacias, posicaoAtual, maisProxima, obterLocalizacao, carregando } = useMapa();

  return (
    <SafeAreaView style={estilos.safe}>
      {/* Header roxo — estilo web */}
      <View style={estilos.header}>
        <View style={estilos.headerLogo}>
          <Text style={estilos.headerLogoTexto}>SAS</Text>
        </View>
        <Text style={estilos.headerTitulo}>MAPA</Text>
      </View>

      <View style={estilos.container}>

        <View style={estilos.mapaWrapper}>
          <MapView
            style={estilos.mapa}
            initialRegion={REGIAO_INICIAL}
            region={
              posicaoAtual
                ? {
                    latitude: posicaoAtual.latitude,
                    longitude: posicaoAtual.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  }
                : undefined
            }
            showsUserLocation={!!posicaoAtual}
            showsMyLocationButton={false}
          >
            {delegacias.map((d) => (
              <Marker
                key={d.id}
                coordinate={{ latitude: d.latitude, longitude: d.longitude }}
                title={d.nome}
                pinColor={
                  maisProxima?.id === d.id
                    ? theme.colors.primary
                    : theme.colors.primaryLight
                }
              />
            ))}
          </MapView>

          <Pressable
            style={[estilos.botaoLocalizacao, carregando && estilos.carregando]}
            onPress={obterLocalizacao}
            disabled={carregando}
          >
            <MaterialIcons
              name={carregando ? "hourglass-empty" : "my-location"}
              size={24}
              color="#FFF"
            />
          </Pressable>
        </View>

        {maisProxima && (
          <View style={estilos.cardProxima}>
            <View style={estilos.cardProximaIcone}>
              <MaterialIcons name="location-on" size={20} color="#FFF" />
            </View>
            <View style={estilos.cardProximaInfo}>
              <Text style={estilos.cardProximaLabel}>Mais próxima de você</Text>
              <Text style={estilos.cardProximaNome} numberOfLines={2}>
                {maisProxima.nome}
              </Text>
              <Text style={estilos.cardProximaDistancia}>
                {maisProxima.distanciaKm} km de distância
              </Text>
            </View>
          </View>
        )}

        <ScrollView style={estilos.lista} showsVerticalScrollIndicator={false}>
          {delegacias.map((d) => (
            <View
              key={d.id}
              style={[estilos.itemLista, maisProxima?.id === d.id && estilos.itemDestaque]}
            >
              <MaterialIcons
                name="local-police"
                size={18}
                color={maisProxima?.id === d.id ? theme.colors.primary : theme.colors.textSecondary}
              />
              <Text
                style={[estilos.itemTexto, maisProxima?.id === d.id && estilos.itemTextoDestaque]}
                numberOfLines={1}
              >
                {d.nome}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
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
  headerLogoTexto: { color: "#FFF", fontWeight: "900", fontSize: theme.fontSize.md },
  headerTitulo: { color: "#FFF", fontSize: theme.fontSize.lg, fontWeight: "600", letterSpacing: 1 },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    overflow: "hidden",
  },
  mapaWrapper: {
    height: 280,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    position: "relative",
  },
  mapa: { flex: 1 },
  botaoLocalizacao: {
    position: "absolute",
    bottom: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  carregando: { opacity: 0.6 },
  cardProxima: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  cardProximaIcone: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  cardProximaInfo: { flex: 1 },
  cardProximaLabel: { fontSize: theme.fontSize.sm, color: theme.colors.primary, fontWeight: "600" },
  cardProximaNome: { fontSize: theme.fontSize.md, fontWeight: "700", color: theme.colors.text },
  cardProximaDistancia: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary },
  lista: { flex: 1, paddingHorizontal: theme.spacing.md },
  itemLista: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemTexto: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  itemDestaque: {
    backgroundColor: "rgba(198,40,40,0.05)",
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  itemTextoDestaque: { color: theme.colors.primary, fontWeight: "600" },
});
