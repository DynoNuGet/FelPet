import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNotif } from "../context/NotifContext";
import { TIPOS } from "../services/notificacoes";
import Layout from "../components/Layout";
import { cores, sombra } from "../constants/tema";

function formatarData(ms) {
  const d = new Date(ms);
  return `${d.toLocaleDateString("pt-BR")} às ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function Notif() {
  const { lista, naoLidas, marcarLida, marcarTodasLidas, limpar } = useNotif();

  return (
    <Layout>
    <View style={s.tela}>
      {lista.length > 0 && (
        <View style={s.acoes}>
          <Text style={s.contador}>{naoLidas > 0 ? `${naoLidas} não lida${naoLidas > 1 ? "s" : ""}` : "Tudo lido"}</Text>
          <View style={{ flexDirection: "row" }}>
            {naoLidas > 0 && (
              <TouchableOpacity onPress={marcarTodasLidas}>
                <Text style={s.acao}>Marcar como lidas</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={limpar}>
              <Text style={[s.acao, { color: cores.erro, marginLeft: 16 }]}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={lista}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={
          <View style={s.vazio}>
            <Text style={s.vazioTitulo}>Nenhuma notificação ainda</Text>
            <Text style={s.vazioTexto}>Agende um serviço ou faça um pedido e os avisos aparecerão aqui.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const tipo = TIPOS[item.tipo] ?? TIPOS.geral;
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => marcarLida(item.id)} style={[s.card, !item.lida && s.cardNova]}>
              <Text style={s.emoji}>{tipo.emoji}</Text>
              <View style={{ flex: 1 }}>
                <View style={s.topo}>
                  <Text style={s.tipo}>{tipo.rotulo}</Text>
                  {!item.lida && <View style={s.bolinha} />}
                </View>
                <Text style={s.titulo}>{item.titulo}</Text>
                <Text style={s.corpo}>{item.corpo}</Text>
                <Text style={s.data}>{formatarData(item.data)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
    </Layout>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  acoes: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 14 },
  contador: { color: cores.textoSuave, fontWeight: "600" },
  acao: { color: cores.secundaria, fontWeight: "700" },
  card: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 16, padding: 14, marginBottom: 12, ...sombra },
  cardNova: { borderLeftWidth: 4, borderLeftColor: cores.primaria },
  emoji: { fontSize: 30, marginRight: 12 },
  topo: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  tipo: { fontSize: 11, fontWeight: "800", color: cores.secundaria, textTransform: "uppercase" },
  bolinha: { width: 9, height: 9, borderRadius: 5, backgroundColor: cores.primaria },
  titulo: { fontSize: 15, fontWeight: "800", color: cores.texto, marginTop: 2 },
  corpo: { color: cores.textoSuave, marginTop: 2 },
  data: { fontSize: 12, color: "#B0A398", marginTop: 6 },
  vazio: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  vazioTitulo: { fontSize: 18, fontWeight: "800", color: cores.texto, marginTop: 10 },
  vazioTexto: { color: cores.textoSuave, textAlign: "center", marginTop: 6 },
});
