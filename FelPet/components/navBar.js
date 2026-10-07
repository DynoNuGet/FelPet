import { useNavigation, useRoute, StackActions } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNotif } from "../context/NotifContext";
import { cores, sombra } from "../constants/tema";

const ABAS = [
  { nome: "Home", rotulo: "Home", emoji: "🏠" },
  { nome: "Notificações", rotulo: "Notificações", emoji: "🔔" },
  { nome: "Perfil", rotulo: "Perfil", emoji: "👤" },
];

export default function NavBar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { naoLidas } = useNotif();

  const ir = (nome) => {
    if (nome !== route.name) navigation.dispatch(StackActions.replace(nome));
  };

  return (
    <View style={styles.container}>
      {ABAS.map((a) => {
        const ativa = route.name === a.nome;
        return (
          <TouchableOpacity key={a.nome} style={[styles.button, ativa && styles.buttonAtivo]} onPress={() => ir(a.nome)}>
            <View>
              <Text style={styles.emoji}>{a.emoji}</Text>
              {a.nome === "Notificações" && naoLidas > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeTexto}>{naoLidas > 9 ? "9+" : naoLidas}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.rotulo, ativa && { color: cores.primaria, fontWeight: "800" }]}>{a.rotulo}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 50,
    width: "88%",
    marginBottom: 12,
    marginTop: 6,
    flexDirection: "row",
    paddingHorizontal: 6,
    ...sombra,
  },
  button: { flex: 1, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 30 },
  buttonAtivo: { backgroundColor: "#FFF1EC" },
  emoji: { fontSize: 20 },
  rotulo: { fontSize: 11, color: cores.textoSuave, marginTop: 1 },
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: cores.erro,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeTexto: { color: "#fff", fontSize: 10, fontWeight: "800" },
});
