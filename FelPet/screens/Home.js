import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { SERVICOS } from "../constants/tema";

export default function Home({ navigation }) {
  const { user } = useAuth();
  const primeiroNome = user?.displayName?.split(" ")[0];

  const agendar = (tipo) => navigation.navigate("Agendar", { tipo, titulo: `Agendar ${SERVICOS[tipo].titulo.toLowerCase()}` });

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.ola}>Olá{primeiroNome ? `, ${primeiroNome}` : ""}! 👋</Text>
        <Text style={styles.sub}>O que o seu pet precisa hoje?</Text>

        <View style={styles.optionView}>
          <View style={styles.optionHorView}>
            <TouchableOpacity
              style={{ ...styles.optionButton, backgroundColor: "rgb(181, 161, 255)" }}
              onPress={() => agendar("banho")}
            >
              <Text style={styles.optionText}>Agende seu banho</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.optionButton, backgroundColor: "rgb(255, 172, 88)" }}
              onPress={() => agendar("tosa")}
            >
              <Text style={styles.optionText}>Agende sua tosa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionHorView}>
            <TouchableOpacity
              style={{ ...styles.optionButton, backgroundColor: "rgb(75, 255, 195)" }}
              onPress={() => agendar("consulta")}
            >
              <Text style={styles.optionText}>Agende sua consulta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.optionButton, backgroundColor: "rgb(233, 224, 97)" }}
              onPress={() => navigation.navigate("Produtos", { titulo: "Produtos" })}
            >
              <Text style={styles.optionText}>Compre nossos produtos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  ola: { fontSize: 26, fontWeight: "900", color: "#2B2B2B" },
  sub: { color: "#7A7A7A", fontSize: 15, marginTop: 2, marginBottom: 16 },
  optionView: { flex: 1, marginBottom: 200, gap: 12 },
  optionHorView: { flex: 1, flexDirection: "row", gap: 12 },
  optionButton: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 18,
  },
  optionEmoji: { fontSize: 44, marginBottom: 8 },
  optionText: { fontSize: 18, fontWeight: "bold", color: "#FFF", textAlign: "center" },
});
