import { useRef, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useMapa } from "../../src/hooks/useMapa";
import { theme } from "../../src/styles/theme";

// react-native-maps só existe em Android/iOS — conditional require evita crash na web
const MapView  = Platform.OS !== "web" ? require("react-native-maps").default   : null;
const Marker   = Platform.OS !== "web" ? require("react-native-maps").Marker    : null;
const Callout  = Platform.OS !== "web" ? require("react-native-maps").Callout   : null;

// Equivalente a abrirRotaGoogleMaps de src/utils/maps.js do web
function abrirRota(latitude, longitude) {
  Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
  );
}

export default function MapaScreen() {
  // Mobile: posicaoAtual.latitude/longitude (não .lat/.lng como no web)
  const { posicaoAtual, delegacias, maisProxima, obterLocalizacao, carregando } = useMapa();
  const mapRef = useRef(null);

  // Auto-solicita localização na montagem — equivale ao navigator.geolocation.getCurrentPosition do web
  useEffect(() => {
    obterLocalizacao();
  }, []);

  const centralizarMapa = () => {
    if (mapRef.current && posicaoAtual) {
      mapRef.current.animateToRegion(
        {
          latitude: posicaoAtual.latitude,
          longitude: posicaoAtual.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );
    }
  };

  // Fallback web — react-native-maps não roda no browser
  if (Platform.OS === "web") {
    return (
      <View style={s.loading}>
        <MaterialIcons name="map" size={48} color={theme.colors.primary} />
        <Text style={s.loadingText}>Mapa disponível apenas no app mobile.</Text>
      </View>
    );
  }

  // Estado de carregamento / sem permissão
  if (carregando || !posicaoAtual) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.header}>
          <View style={s.headerLogo}>
            <Text style={s.headerLogoTexto}>SAS</Text>
          </View>
          <Text style={s.headerTitulo}>MAPA</Text>
        </View>
        <View style={s.loading}>
          <MaterialIcons
            name={carregando ? "location-searching" : "location-off"}
            size={52}
            color={theme.colors.primary}
          />
          <Text style={s.loadingText}>
            {carregando ? "Obtendo localização…" : "Localização não obtida"}
          </Text>
          {!carregando && (
            <Pressable style={s.btnObter} onPress={obterLocalizacao}>
              <Text style={s.btnObterTexto}>Permitir localização</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>

      {/* Header roxo — mesmo padrão das demais telas */}
      <View style={s.header}>
        <View style={s.headerLogo}>
          <Text style={s.headerLogoTexto}>SAS</Text>
        </View>
        <Text style={s.headerTitulo}>MAPA</Text>
      </View>

      {/* Área do mapa — relative w-full flex-1 (web) */}
      <View style={s.container}>
        <MapView
          ref={mapRef}
          style={s.map}
          initialRegion={{
            latitude: posicaoAtual.latitude,
            longitude: posicaoAtual.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          showsMyLocationButton={false}
        >
          {delegacias.map((d) => {
            // Mobile usa id para comparar; web usava lat/lng iguais
            const isMaisProxima = maisProxima?.id === d.id;

            return (
              <Marker
                key={d.id}
                coordinate={{ latitude: d.latitude, longitude: d.longitude }}
                pinColor={isMaisProxima ? "#6B4CFF" : theme.colors.primary}
              >
                {/* Callout — equivale ao popup Leaflet do web com botão "Ir" */}
                <Callout onPress={() => abrirRota(d.latitude, d.longitude)}>
                  <View style={s.callout}>
                    <Text style={s.calloutNome}>{d.nome}</Text>
                    {isMaisProxima && (
                      <Text style={s.calloutProxima}>Mais próxima</Text>
                    )}
                    <View style={s.calloutBtn}>
                      <Text style={s.calloutBtnTexto}>Ir</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>

        {/* CenterMapButton — absolute bottom-12 right-5 rounded-full z-[9999] (web) */}
        <Pressable
          style={({ pressed }) => [s.centerBtn, pressed && { opacity: 0.85 }]}
          onPress={centralizarMapa}
        >
          <MaterialIcons name="my-location" size={24} color="#6B4CFF" />
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.primary },

  // Header roxo — igual às demais telas
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  headerLogoTexto: { color: "#FFF", fontWeight: "900", fontSize: theme.fontSize.md },
  headerTitulo: {
    color: "#FFF",
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Área do mapa (flex: 1 abaixo do header)
  container: { flex: 1, position: "relative" },
  map: { flex: 1 },

  // Estado de carregamento — flex justify-center items-center h-full (web)
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    gap: 16,
  },
  loadingText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    textAlign: "center",
  },
  btnObter: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  btnObterTexto: { color: "#FFF", fontWeight: "600", fontSize: theme.fontSize.md },

  // CenterMapButton — absolute bottom-12 right-5 w-14 h-14 border-purple-300 shadow-xl rounded-full (web)
  centerBtn: {
    position: "absolute",
    bottom: 32,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  // Callout — popup do marcador (equivale ao popup Leaflet do web)
  callout: { width: 180, padding: 8 },
  calloutNome: {
    fontWeight: "bold",
    fontSize: theme.fontSize.md,
    marginBottom: 4,
    color: "#111827",
  },
  calloutProxima: {
    color: "#6B4CFF",
    fontWeight: "bold",
    fontSize: theme.fontSize.sm,
    marginBottom: 4,
  },
  // background: #9576F7, borderRadius: 8, padding: 6 (web inline style)
  calloutBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 6,
    alignItems: "center",
    marginTop: 4,
  },
  calloutBtnTexto: { color: "#FFF", fontWeight: "bold", fontSize: theme.fontSize.sm },
});
