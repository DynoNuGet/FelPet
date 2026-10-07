import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Botao, Campo } from "../components/UI";
import { cadastrar, mensagemErro } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { cores } from "../constants/tema";

export default function Cadastro({ navigation }) {
  const { refresh } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    if (!nome.trim() || !email.trim() || !senha) return setErro("Preencha todos os campos.");
    if (senha.length < 6) return setErro("A senha precisa ter pelo menos 6 caracteres.");
    if (senha !== confirmar) return setErro("As senhas não conferem.");
    
    setErro("");
    setCarregando(true);
    
    try {
      await cadastrar(nome, email, senha);
      refresh();
    } catch (e) {
      setErro(mensagemErro(e));
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={s.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <View style={s.logoContainer}>
          <Feather name="user-plus" size={48} color={cores.primaria} />
        </View>
        
        <Text style={s.titulo}>Criar conta</Text>
        <Text style={s.sub}>Leva menos de um minuto</Text>

        <Campo 
          rotulo="Nome" 
          value={nome} 
          onChangeText={setNome} 
          placeholder="Seu nome" 
        />
        <Campo
          rotulo="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="voce@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Campo
          rotulo="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          autoCapitalize="none"
        />
        <Campo
          rotulo="Confirmar senha"
          value={confirmar}
          onChangeText={setConfirmar}
          placeholder="Repita a senha"
          secureTextEntry
          autoCapitalize="none"
        />
        
        {erro ? <Text style={s.erro}>{erro}</Text> : null}
        
        <Botao titulo="Cadastrar" onPress={handleCadastro} carregando={carregando} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={s.botaoVoltar}>
          <Text style={s.link}>
            Já tem conta? <Text style={s.linkDestaque}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  keyboardContainer: {
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
    marginBottom: 16,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "900",
    color: cores.primaria,
    textAlign: "center",
  },
  sub: {
    textAlign: "center",
    color: cores.textoSuave,
    marginTop: 4,
    marginBottom: 24,
  },
  erro: {
    color: cores.erro,
    marginBottom: 12,
    textAlign: "center",
  },
  botaoVoltar: {
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