import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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
    <KeyboardAvoidingView
      style={s.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.logoContainer}>
          <FontAwesome5 name="paw" size={48} color={cores.primaria} />
        </View>

        <Text style={s.titulo}>FelPet</Text>
        <Text style={s.sub}>Cuidado e carinho para o seu melhor amigo</Text>

        <View style={s.form}>
          <Campo
            rotulo="E-mail"
            icone="mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Insira seu e-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <Campo
            rotulo="Senha"
            icone="lock"
            value={senha}
            onChangeText={setSenha}
            placeholder="Sua senha"
            secureTextEntry
            autoCapitalize="none"
          />

          {erro ? <Text style={s.erro}>{erro}</Text> : null}

          <Botao
            titulo="Entrar"
            icone="log-in"
            onPress={handleLogin}
            carregando={carregando}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastro")}
          style={s.linkContainer}
        >
          <Text style={s.link}>
            Ainda não tem conta? <Text style={s.linkDestaque}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: cores.fundo,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  titulo: {
    fontSize: 34,
    fontWeight: "900",
    color: cores.primaria,
    textAlign: "center",
  },
  sub: {
    textAlign: "center",
    color: cores.textoSuave,
    marginTop: 4,
    marginBottom: 28,
  },
  form: {
    width: "100%",
  },
  erro: {
    color: cores.erro,
    marginBottom: 12,
    textAlign: "center",
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    textAlign: "center",
    color: cores.secundaria,
    fontSize: 15,
  },
  linkDestaque: {
    fontWeight: "800",
  },
});