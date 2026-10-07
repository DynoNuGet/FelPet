import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute, StackActions } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { cores } from "../constants/tema";

const TELAS_PRINCIPAIS = ["Home", "Notificações", "Perfil"];

export default function Cabecalho() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const inicial = (user?.displayName || user?.email || "?").trim().charAt(0).toUpperCase();
  const mostrarVoltar = !TELAS_PRINCIPAIS.includes(route.name) && navigation.canGoBack();

  const irParaPerfil = () => {
    if (route.name === "Perfil") return;
    if (TELAS_PRINCIPAIS.includes(route.name)) navigation.dispatch(StackActions.replace("Perfil"));
    else navigation.navigate("Perfil");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitulo} pointerEvents="none">
        <Text style={styles.titulo}>{route.params?.titulo ?? route.name}</Text>
      </View>

      {mostrarVoltar ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.voltar}
          hitSlop={10}
        >
          <Feather name="chevron-left" size={28} color={cores.primaria} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <TouchableOpacity onPress={irParaPerfil}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>{inicial}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  containerTitulo: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  voltar: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  placeholder: {
    width: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.primaria,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTexto: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
});