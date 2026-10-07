import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Botao } from "../components/UI";
import { enviarNotificacao, prepararNotificacoes } from "../services/notificacoes";
import Layout from "../components/Layout";
import { cores, sombra, PRODUTOS } from "../constants/tema";

const preco = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function IconeProduto({ produto, size = 40, color = cores.primaria }) {
  const nomeLower = produto?.nome?.toLowerCase() || "";
  const idLower = String(produto?.id || "").toLowerCase();

  if (nomeLower.includes("ração") || nomeLower.includes("petisco") || idLower.includes("racao")) {
    return <FontAwesome5 name="bone" size={size} color={color} />;
  }
  if (nomeLower.includes("brinquedo") || nomeLower.includes("bola") || idLower.includes("brinquedo")) {
    return <MaterialCommunityIcons name="toy-brick" size={size} color={color} />;
  }
  if (nomeLower.includes("shampoo") || nomeLower.includes("sabão") || nomeLower.includes("higiene")) {
    return <MaterialCommunityIcons name="soap" size={size} color={color} />;
  }
  if (nomeLower.includes("remédio") || nomeLower.includes("vacina") || nomeLower.includes("vitamina")) {
    return <MaterialCommunityIcons name="medical-bag" size={size} color={color} />;
  }
  if (nomeLower.includes("coleira") || nomeLower.includes("guia")) {
    return <MaterialCommunityIcons name="dog-side" size={size} color={color} />;
  }

  return <Feather name="box" size={size} color={color} />;
}

export default function Produtos({ navigation }) {
  const [carrinho, setCarrinho] = useState({});

  const alterar = (id, delta) =>
    setCarrinho((c) => {
      const qtd = Math.max(0, (c[id] ?? 0) + delta);
      const novo = { ...c, [id]: qtd };
      if (qtd === 0) delete novo[id];
      return novo;
    });

  const itens = PRODUTOS.filter((p) => carrinho[p.id]);
  const total = itens.reduce((soma, p) => soma + p.preco * carrinho[p.id], 0);
  const qtdTotal = itens.reduce((soma, p) => soma + carrinho[p.id], 0);

  async function finalizar() {
    await prepararNotificacoes();
    await enviarNotificacao({
      tipo: "pedido",
      titulo: "Pedido recebido!",
      corpo: `${qtdTotal} ${qtdTotal === 1 ? "item" : "itens"} • ${preco(total)}. Avisaremos quando estiver pronto para retirada.`,
    });
    Alert.alert("Pedido realizado", `Total: ${preco(total)}`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <Layout semNav>
      <View style={s.tela}>
        <FlatList
          data={PRODUTOS}
          keyExtractor={(p) => p.id}
          numColumns={2}
          columnWrapperStyle={s.columnWrapper}
          contentContainerStyle={s.contentContainer}
          renderItem={({ item }) => {
            const qtd = carrinho[item.id] ?? 0;
            return (
              <View style={s.card}>
                <View style={s.iconeContainer}>
                  <IconeProduto produto={item} />
                </View>

                <Text style={s.nome} numberOfLines={2}>
                  {item.nome}
                </Text>
                <Text style={s.preco}>{preco(item.preco)}</Text>

                {qtd === 0 ? (
                  <TouchableOpacity style={s.add} onPress={() => alterar(item.id, 1)}>
                    <Text style={s.addTexto}>Adicionar</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={s.qtdLinha}>
                    <TouchableOpacity style={s.qtdBtn} onPress={() => alterar(item.id, -1)}>
                      <Feather name="minus" size={16} color={cores.primaria} />
                    </TouchableOpacity>
                    <Text style={s.qtd}>{qtd}</Text>
                    <TouchableOpacity style={s.qtdBtn} onPress={() => alterar(item.id, 1)}>
                      <Feather name="plus" size={16} color={cores.primaria} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />

        {qtdTotal > 0 && (
          <View style={s.rodape}>
            <View style={s.rodapeInfo}>
              <Text style={s.qtdItensText}>
                {qtdTotal} {qtdTotal === 1 ? "item" : "itens"}
              </Text>
              <Text style={s.total}>{preco(total)}</Text>
            </View>
            <Botao
              titulo="Finalizar pedido"
              onPress={finalizar}
              style={s.botaoFinalizar}
            />
          </View>
        )}
      </View>
    </Layout>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  columnWrapper: {
    gap: 12,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    ...sombra,
  },
  iconeContainer: {
    marginBottom: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  nome: {
    fontWeight: "700",
    color: cores.texto,
    textAlign: "center",
    minHeight: 38,
  },
  preco: {
    color: cores.secundaria,
    fontWeight: "800",
    marginVertical: 6,
  },
  add: {
    backgroundColor: cores.primaria,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  addTexto: {
    color: "#fff",
    fontWeight: "700",
  },
  qtdLinha: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtdBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFE9E1",
    alignItems: "center",
    justifyContent: "center",
  },
  qtd: {
    marginHorizontal: 14,
    fontSize: 16,
    fontWeight: "800",
  },
  rodape: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: cores.borda,
  },
  rodapeInfo: {
    flex: 1,
  },
  qtdItensText: {
    color: cores.textoSuave,
  },
  total: {
    fontSize: 20,
    fontWeight: "900",
    color: cores.texto,
  },
  botaoFinalizar: {
    paddingHorizontal: 22,
  },
});