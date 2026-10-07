import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Botao, Campo } from "../components/UI";
import { entrar, mensagemErro } from "../services/auth";
import { cores } from "../constants/tema";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha) return setErro("Preencha e-mail e senha.");
    setErro("");
    setCarregando(true);
    try {
      await entrar(email, senha);
    } catch (e) {
      setErro(mensagemErro(e));
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <Text style={s.titulo}>FelPet</Text>
        <Text style={s.sub}>Cuidado e carinho para o seu melhor amigo</Text>

        <View style={s.form}>
          <Campo
            rotulo="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Insira seu e-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <Campo
            rotulo="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Sua senha"
            secureTextEntry
            autoCapitalize="none"
          />
          {erro ? <Text style={s.erro}>{erro}</Text> : null}
          <Botao titulo="Entrar" onPress={handleLogin} carregando={carregando} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} style={{ marginTop: 20 }}>
          <Text style={s.link}>
            Ainda não tem conta? <Text style={{ fontWeight: "800" }}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 24, backgroundColor: cores.fundo },
  logo: { fontSize: 64, textAlign: "center" },
  titulo: { fontSize: 34, fontWeight: "900", color: cores.primaria, textAlign: "center" },
  sub: { textAlign: "center", color: cores.textoSuave, marginTop: 4, marginBottom: 28 },
  form: { width: "100%" },
  erro: { color: cores.erro, marginBottom: 12, textAlign: "center" },
  link: { textAlign: "center", color: cores.secundaria, fontSize: 15 },
});
