// Migrado do web: src/utils/geolocalizacao.js
// Mudança: navigator.geolocation → expo-location (API de permissões explícitas no mobile)
import { useState } from "react";
import * as Location from "expo-location";

export function useLocalizacao() {
  const [localizacao, setLocalizacao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const obterLocalizacao = async () => {
    setCarregando(true);
    setErro(null);

    try {
      // Solicita permissão ao usuário antes de acessar o GPS
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErro("Permissão de localização negada.");
        return null;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };

      setLocalizacao(coords);
      return coords;
    } catch (err) {
      console.error("Erro ao obter localização:", err);
      setErro("Não foi possível acessar sua localização.");
      return null;
    } finally {
      setCarregando(false);
    }
  };

  return { localizacao, obterLocalizacao, carregando, erro };
}
