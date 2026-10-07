import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert,
  KeyboardAvoidingView, Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../components/Layout";
import { Botao, Campo, Chip } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { usePets } from "../context/PetsContext";
import { sair } from "../services/auth";
import { cores, sombra } from "../constants/tema";

const ESPECIES = ["Cachorro", "Gato", "Pássaro", "Outro"];

function emojiEspecie(especie) {
  switch (especie) {
    case "Cachorro": return "🐶";
    case "Gato": return "🐱";
    case "Pássaro": return "🐦";
    default: return "🐾";
  }
}

export default function Perfil() {
  const { user } = useAuth();
  const { pets, adicionarPet, removerPet } = usePets();

  const [modal, setModal] = useState(false);
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("Cachorro");
  const [raca, setRaca] = useState("");
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState("");

  const nomeUsuario = user?.displayName || "Tutor";
  const desde = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    : null;

  function confirmarLogout() {
    Alert.alert("Sair da conta", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: () => sair() },
    ]);
  }

  function fechar() {
    setModal(false);
    setNome("");
    setEspecie("Cachorro");
    setRaca("");
    setFoto(null);
    setErro("");
  }

  async function escolherFoto(origem) {
    const opcoes = { mediaTypes: ["images"], allowsEditing: true, aspect: [1, 1], quality: 0.2, base64: true };
    let r;
    
    if (origem === "camera") {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) return Alert.alert("Permissão necessária", "Permita o acesso à câmera para tirar a foto.");
      r = await ImagePicker.launchCameraAsync(opcoes);
    } else {
      r = await ImagePicker.launchImageLibraryAsync(opcoes);
    }
    
    if (!r.canceled) {
      const a = r.assets[0];
      setFoto(a.base64 ? `data:image/jpeg;base64,${a.base64}` : a.uri);
    }
  }

  function menuFoto() {
    Alert.alert("Foto do pet", "De onde vem a foto?", [
      { text: "Tirar foto", onPress: () => escolherFoto("camera") },
      { text: "Escolher da galeria", onPress: () => escolherFoto("galeria") },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  async function salvar() {
    if (!nome.trim()) return setErro("Dê um nome ao seu pet.");
    await adicionarPet({ nome: nome.trim(), especie, raca: raca.trim(), foto });
    fechar();
  }

  function confirmarRemocao(pet) {
    Alert.alert("Remover pet", `Remover o perfil de ${pet.nome}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: () => removerPet(pet.id) },
    ]);
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 30 }}>
        
        <View style={s.cardUsuario}>
          <View style={s.avatar}>
            <Text style={s.avatarTexto}>{nomeUsuario.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={s.nome}>{nomeUsuario}</Text>
          <Text style={s.email}>{user?.email}</Text>
          {desde && <Text style={s.desde}>Tutor desde {desde}</Text>}
        </View>

        <View style={s.tituloLinha}>
          <Text style={s.secao}>Meus pets</Text>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Text style={s.adicionar}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {pets.length === 0 ? (
          <View style={s.vazio}>
            <Text style={{ fontSize: 44 }}>🐾</Text>
            <Text style={s.vazioTexto}>Cadastre seu primeiro pet para poder agendar banho, tosa e consultas.</Text>
            <Botao titulo="Adicionar pet" onPress={() => setModal(true)} style={{ marginTop: 12, alignSelf: "stretch" }} />
          </View>
        ) : (
          pets.map((p) => (
            <View key={p.id} style={s.cardPet}>
              {p.foto ? (
                <Image source={{ uri: p.foto }} style={s.petFoto} />
              ) : (
                <View style={[s.petFoto, s.petSemFoto]}>
                  <Text style={{ fontSize: 30 }}>{emojiEspecie(p.especie)}</Text>
                </View>
              )}
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={s.petNome}>{p.nome}</Text>
                <Text style={s.petInfo}>{[p.especie, p.raca].filter(Boolean).join(" • ")}</Text>
              </View>
              <TouchableOpacity onPress={() => confirmarRemocao(p)} hitSlop={10}>
                <Text style={{ fontSize: 20 }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Botao titulo="Sair da conta" variante="perigo" onPress={confirmarLogout} style={{ marginTop: 28 }} />
      </ScrollView>

      <Modal visible={modal} animationType="slide" transparent onRequestClose={fechar}>
        <KeyboardAvoidingView style={s.fundoModal} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View style={s.modal}>
            <Text style={s.modalTitulo}>Novo pet</Text>

            <TouchableOpacity onPress={menuFoto} style={s.fotoBtn}>
              {foto ? (
                <Image source={{ uri: foto }} style={s.fotoPreview} />
              ) : (
                <View style={[s.fotoPreview, s.fotoVazia]}>
                  <Text style={{ fontSize: 30 }}>📷</Text>
                  <Text style={{ fontSize: 11, color: cores.textoSuave }}>Adicionar foto</Text>
                </View>
              )}
            </TouchableOpacity>

            <Campo rotulo="Nome" value={nome} onChangeText={setNome} placeholder="Ex.: Thor" erro={erro} />

            <Text style={s.rotulo}>Espécie</Text>
            <View style={{ flexDirection: "row", marginBottom: 14 }}>
              {ESPECIES.map((e) => (
                <Chip key={e} texto={e} ativo={especie === e} onPress={() => setEspecie(e)} />
              ))}
            </View>

            <Campo rotulo="Raça (opcional)" value={raca} onChangeText={setRaca} placeholder="Ex.: Labrador" />

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Botao titulo="Cancelar" variante="secundario" onPress={fechar} style={{ flex: 1 }} />
              <Botao titulo="Salvar" onPress={salvar} style={{ flex: 1 }} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Layout>
  );
}

const s = StyleSheet.create({
  cardUsuario: { 
    backgroundColor: "#fff", 
    borderRadius: 22, 
    alignItems: "center", 
    padding: 22, 
    ...sombra 
  },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: cores.primaria, alignItems: "center", justifyContent: "center" },
  avatarTexto: { color: "#fff", fontSize: 38, fontWeight: "900" },
  nome: { fontSize: 22, fontWeight: "900", color: cores.texto, marginTop: 12 },
  email: { color: cores.textoSuave, marginTop: 2 },
  desde: { color: cores.secundaria, fontWeight: "700", marginTop: 8, textTransform: "capitalize" },
  tituloLinha: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 26, marginBottom: 12 },
  secao: { fontSize: 18, fontWeight: "900", color: cores.texto },
  adicionar: { color: cores.primaria, fontWeight: "800", fontSize: 15 },
  vazio: { backgroundColor: "#fff", borderRadius: 18, padding: 20, alignItems: "center", borderWidth: 1, borderColor: cores.borda },
  vazioTexto: { textAlign: "center", color: cores.textoSuave, marginTop: 8 },
  cardPet: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 18, padding: 12, marginBottom: 10, ...sombra },
  petFoto: { width: 64, height: 64, borderRadius: 32 },
  petSemFoto: { backgroundColor: "#FFF1EC", alignItems: "center", justifyContent: "center" },
  petNome: { fontSize: 17, fontWeight: "800", color: cores.texto },
  petInfo: { color: cores.textoSuave, marginTop: 2 },
  fundoModal: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
  modal: { backgroundColor: cores.fundo, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingBottom: 30 },
  modalTitulo: { fontSize: 20, fontWeight: "900", color: cores.texto, textAlign: "center", marginBottom: 14 },
  fotoBtn: { alignSelf: "center", marginBottom: 18 },
  fotoPreview: { width: 96, height: 96, borderRadius: 48 },
  fotoVazia: { backgroundColor: "#fff", borderWidth: 2, borderStyle: "dashed", borderColor: cores.borda, alignItems: "center", justifyContent: "center" },
  rotulo: { fontSize: 13, color: cores.textoSuave, marginBottom: 6, fontWeight: "600" },
});