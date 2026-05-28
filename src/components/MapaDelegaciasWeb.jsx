// Substituto web: react-native-maps não funciona no browser
import { View, Text, StyleSheet } from "react-native";

export default function MapaDelegaciasWeb() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>Mapa disponível apenas no app mobile</Text>
      <Text style={estilos.subtexto}>Abra no Expo Go para ver o mapa interativo</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  texto: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtexto: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
