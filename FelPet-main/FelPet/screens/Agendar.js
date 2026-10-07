import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { Botao, Chip } from "../components/UI";
import { usePets } from "../context/PetsContext";
import { enviarNotificacao, prepararNotificacoes } from "../services/notificacoes";
import Layout from "../components/Layout";
import { cores, sombra, SERVICOS, HORARIOS, MODO_DEMO } from "../constants/tema";

function proximosDias(qtd = 7) {
  const dias = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < qtd; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    dias.push(d);
  }
  return dias;
}

const rotuloDia = (d) =>
  d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" });

function IconeServico({ tipo }) {
  switch (tipo) {
    case "banho":
      return <MaterialCommunityIcons name="shower" size={40} color={cores.texto} />;
    case "tosa":
      return <Feather name="scissors" size={40} color={cores.texto} />;
    case "consulta":
      return <FontAwesome5 name="stethoscope" size={36} color={cores.texto} />;
    default:
      return <Feather name="calendar" size={40} color={cores.texto} />;
  }
}

export default function Agendar({ route, navigation }) {
  const tipoServico = route.params?.tipo;
  const servico = SERVICOS[tipoServico] ?? SERVICOS.banho;
  const { pets } = usePets();
  const dias = useMemo(() => proximosDias(), []);
  const [petId, setPetId] = useState(pets[0]?.id ?? null);
  const [dia, setDia] = useState(dias[0]);
  const [hora, setHora] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const pet = pets.find((p) => p.id === petId);

  const horarios = HORARIOS.filter((h) => {
    const [hh, mm] = h.split(":").map(Number);
    const alvo = new Date(dia);
    alvo.setHours(hh, mm, 0, 0);
    return alvo > new Date();
  });

  async function confirmar() {
    if (!pet) return Alert.alert("Escolha um pet", "Cadastre um pet no seu Perfil para agendar.");
    if (!hora) return Alert.alert("Escolha um horário", "Selecione o horário desejado.");

    setSalvando(true);
    try {
      await prepararNotificacoes();
      const [hh, mm] = hora.split(":").map(Number);
      const alvo = new Date(dia);
      alvo.setHours(hh, mm, 0, 0);
      const quando = `${rotuloDia(dia)} às ${hora}`;

      await enviarNotificacao({
        tipo: "confirmacao",
        titulo: `${servico.titulo} agendado!`,
        corpo: `${pet.nome} tem ${servico.titulo.toLowerCase()} marcado para ${quando}.`,
      });

      const umaHoraAntes = new Date(alvo.getTime() - 60 * 60 * 1000);
      const lembrete = MODO_DEMO ? 15 : umaHoraAntes > new Date() ? umaHoraAntes : 5;
      await enviarNotificacao({
        tipo: "lembrete",
        titulo: `Lembrete: ${servico.titulo} do ${pet.nome}`,
        corpo: `Hoje às ${hora}. Estamos te esperando na FelPet!`,
        quando: lembrete,
      });

      Alert.alert("Agendamento confirmado", `${servico.titulo} de ${pet.nome}\n${quando}`, [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível concluir o agendamento.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout semNav>
      <ScrollView style={s.tela} contentContainerStyle={s.scrollContainer}>
        <View style={[s.cabecalho, { backgroundColor: servico.cor }]}>
          <IconeServico tipo={tipoServico} />
          <View style={s.cabecalhoTexto}>
            <Text style={s.titulo}>{servico.titulo}</Text>
            <Text style={s.desc}>{servico.descricao}</Text>
          </View>
        </View>

        <Text style={s.secao}>Para qual pet?</Text>
        {pets.length === 0 ? (
          <View style={s.vazio}>
            <Text style={s.vazioTexto}>Você ainda não cadastrou nenhum pet.</Text>
            <Botao
              titulo="Cadastrar pet no Perfil"
              variante="secundario"
              onPress={() => navigation.navigate("Perfil")}
            />
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pets.map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setPetId(p.id)}
                style={[s.pet, petId === p.id && s.petAtivo]}
              >
                {p.foto ? (
                  <Image source={{ uri: p.foto }} style={s.petFoto} />
                ) : (
                  <FontAwesome5
                    name={p.especie === "Gato" ? "cat" : "dog"}
                    size={30}
                    color={cores.texto}
                  />
                )}
                <Text style={s.petNome} numberOfLines={1}>
                  {p.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <Text style={s.secao}>Qual dia?</Text>
        <View style={s.linha}>
          {dias.map((d) => (
            <Chip
              key={d.toISOString()}
              texto={rotuloDia(d)}
              ativo={dia.getTime() === d.getTime()}
              onPress={() => {
                setDia(d);
                setHora(null);
              }}
            />
          ))}
        </View>

        <Text style={s.secao}>Qual horário?</Text>
        {horarios.length === 0 ? (
          <Text style={s.semHorario}>Sem horários livres neste dia. Escolha outro dia.</Text>
        ) : (
          <View style={s.linha}>
            {horarios.map((h) => (
              <Chip key={h} texto={h} ativo={hora === h} onPress={() => setHora(h)} />
            ))}
          </View>
        )}

        <Botao
          titulo="Confirmar agendamento"
          onPress={confirmar}
          carregando={salvando}
          style={s.botaoConfirmar}
        />
      </ScrollView>
    </Layout>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    ...sombra,
  },
  cabecalhoTexto: {
    marginLeft: 14,
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "900",
    color: cores.texto,
  },
  desc: {
    color: cores.textoSuave,
    marginTop: 2,
  },
  secao: {
    fontSize: 16,
    fontWeight: "800",
    color: cores.texto,
    marginTop: 24,
    marginBottom: 10,
  },
  linha: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  vazio: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  vazioTexto: {
    color: cores.textoSuave,
    marginBottom: 10,
  },
  pet: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 100,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: cores.borda,
    marginRight: 10,
  },
  petAtivo: {
    borderColor: cores.primaria,
    backgroundColor: "#FFF1EC",
  },
  petFoto: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  petNome: {
    marginTop: 6,
    fontWeight: "700",
    color: cores.texto,
    maxWidth: 80,
  },
  semHorario: {
    color: cores.textoSuave,
  },
  botaoConfirmar: {
    marginTop: 24,
  },
});