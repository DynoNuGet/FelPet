import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Cabecalho from "./cabecalho";
import NavBar from "./navBar";
import { cores } from "../constants/tema";

export default function Layout({ children, semNav = false }) {
  return (
    <SafeAreaView style={s.tela} edges={["top", "bottom"]}>
      <Cabecalho />
      <View style={s.conteudo}>{children}</View>
      {!semNav && <NavBar />}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { flex: 1 },
});
