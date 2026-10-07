import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { cores } from "../constants/tema";

export function Botao({
  titulo,
  onPress,
  carregando,
  variante = "primario",
  icone,
  style,
  textoStyle,
}) {
  const secundario = variante === "secundario";
  const perigo = variante === "perigo";

  const corTexto = perigo
    ? cores.erro
    : secundario
    ? cores.primaria
    : "#fff";

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
        <ActivityIndicator color={corTexto} />
      ) : (
        <View style={s.conteudoBotao}>
          {icone && (
            typeof icone === "string" ? (
              <Feather name={icone} size={18} color={corTexto} style={s.iconeBotao} />
            ) : (
              icone
            )
          )}
          <Text style={[s.botaoTexto, { color: corTexto }, textoStyle]}>
            {titulo}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function Campo({ rotulo, erro, icone, style, inputStyle, ...props }) {
  return (
    <View style={[{ marginBottom: 14 }, style]}>
      {rotulo ? <Text style={s.rotulo}>{rotulo}</Text> : null}
      <View style={[s.inputContainer, erro && { borderColor: cores.erro }]}>
        {icone && (
          typeof icone === "string" ? (
            <Feather
              name={icone}
              size={18}
              color={cores.textoSuave}
              style={s.iconeInput}
            />
          ) : (
            icone
          )
        )}
        <TextInput
          placeholderTextColor="#B5A79C"
          style={[s.input, inputStyle]}
          {...props}
        />
      </View>
      {erro ? <Text style={s.erro}>{erro}</Text> : null}
    </View>
  );
}

export function Chip({ texto, ativo, icone, onPress, style }) {
  const corConteudo = ativo ? "#fff" : cores.texto;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[s.chip, ativo && s.chipAtivo, style]}
    >
      {icone && (
        typeof icone === "string" ? (
          <Feather name={icone} size={14} color={corConteudo} style={s.iconeChip} />
        ) : (
          icone
        )
      )}
      <Text style={[s.chipTexto, { color: corConteudo }]}>{texto}</Text>
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
  botaoSecundario: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: cores.primaria,
  },
  botaoPerigo: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: cores.erro,
  },
  conteudoBotao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconeBotao: {
    marginRight: 8,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: "700",
  },
  rotulo: {
    fontSize: 13,
    color: cores.textoSuave,
    marginBottom: 6,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  iconeInput: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: cores.texto,
  },
  erro: {
    color: cores.erro,
    fontSize: 12,
    marginTop: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: cores.borda,
    backgroundColor: "#fff",
    marginRight: 8,
    marginBottom: 8,
  },
  chipAtivo: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  iconeChip: {
    marginRight: 6,
  },
  chipTexto: {
    fontWeight: "600",
  },
});