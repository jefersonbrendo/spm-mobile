// Migrado do web: src/hooks/useMapa.js
// Mudança: removido navigator.geolocation → usa useLocalizacao (expo-location)
//          removidas dependências do Leaflet — lógica de Haversine mantida igual
import { useEffect, useState } from "react";
import { calcularDistanciaKm } from "../services/haversine";
import { useLocalizacao } from "./useLocalizacao";

// Lista completa de delegacias de Fortaleza (copiada do projeto web)
const DELEGACIAS = [
  { id: 1, nome: "Delegacia Policial - Vicente Pinzon", latitude: -3.731169235144808, longitude: -38.46267435618919 },
  { id: 2, nome: "Delegacia de Defesa da Mulher", latitude: -3.7578458274045183, longitude: -38.559861536805506 },
  { id: 3, nome: "DHPP - Homicídios e Proteção à Pessoa", latitude: -3.7525247383449063, longitude: -38.52368332736063 },
  { id: 4, nome: "Delegacia-Geral da Polícia Civil – Borges de Melo", latitude: -3.75920538436976, longitude: -38.52605963904237 },
  { id: 5, nome: "2º Distrito Policial - Meireles", latitude: -3.731878605845242, longitude: -38.50648863153899 },
  { id: 6, nome: "10° Distrito Policial - Antônio Bezerra", latitude: -3.7400036126980294, longitude: -38.59149398972575 },
  { id: 7, nome: "11° Distrito Policial - PanAmericano", latitude: -3.7540979382537327, longitude: -38.56538289599834 },
  { id: 8, nome: "13º Distrito Policial – Cidade dos Funcionários", latitude: -3.7972983685380166, longitude: -38.50122994555225 },
  { id: 9, nome: "30º Distrito Policial – São Cristóvão", latitude: -3.8317410671977585, longitude: -38.517727866216916 },
  { id: 10, nome: "32° Distrito Policial - Granja Lisboa", latitude: -3.797812372488262, longitude: -38.618230983165816 },
  { id: 11, nome: "34° Distrito Policial", latitude: -3.7316843714843233, longitude: -38.53717603565538 },
];

export function useMapa() {
  const { localizacao, obterLocalizacao, carregando } = useLocalizacao();
  const [maisProxima, setMaisProxima] = useState(null);

  // Recalcula a delegacia mais próxima sempre que a localização mudar
  useEffect(() => {
    if (!localizacao) return;

    let menorDistancia = Infinity;
    let maisPerto = null;

    DELEGACIAS.forEach((d) => {
      const dist = calcularDistanciaKm(
        localizacao.latitude,
        localizacao.longitude,
        d.latitude,
        d.longitude
      );
      if (dist < menorDistancia) {
        menorDistancia = dist;
        maisPerto = { ...d, distanciaKm: dist.toFixed(2) };
      }
    });

    setMaisProxima(maisPerto);
  }, [localizacao]);

  return {
    delegacias: DELEGACIAS,
    posicaoAtual: localizacao,
    maisProxima,
    obterLocalizacao,
    carregando,
  };
}
