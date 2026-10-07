import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import { cores } from "../constants/tema";

export function Botao({ titulo, onPress, carregando, variante = "primario", style }) {
  const secundario = variante === "secundario";
  const perigo = variante === "perigo";
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={carregando}
      onPress={onPress}
      style={[
        s.botao,
        secundario && s.botaoSecundario,
        perigo && s.botaoPerigo,
        carregando && { opacity: 0.7 },
        style,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={secundario || perigo ? cores.primaria : "#fff"} />
      ) : (
        <Text style={[s.botaoTexto, (secundario || perigo) && { color: perigo ? cores.erro : cores.primaria }]}>
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function Campo({ rotulo, erro, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      {rotulo ? <Text style={s.rotulo}>{rotulo}</Text> : null}
      <TextInput
        placeholderTextColor="#B5A79C"
        style={[s.input, erro && { borderColor: cores.erro }]}
        {...props}
      />
      {erro ? <Text style={s.erro}>{erro}</Text> : null}
    </View>
  );
}

export function Chip({ texto, ativo, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[s.chip, ativo && s.chipAtivo]}>
      <Text style={[s.chipTexto, ativo && { color: "#fff" }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoSecundario: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: cores.primaria },
  botaoPerigo: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: cores.erro },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "700" },
  rotulo: { fontSize: 13, color: cores.textoSuave, marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: cores.texto,
  },
  erro: { color: cores.erro, fontSize: 12, marginTop: 4 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: cores.borda,
    backgroundColor: "#fff",
    marginRight: 8,
    marginBottom: 8,
  },
  chipAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  chipTexto: { color: cores.texto, fontWeight: "600" },
});
