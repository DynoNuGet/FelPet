export const cores = {
  primaria: "#FF7A59",
  primariaEscura: "#E8623F",
  secundaria: "#2A9D8F",
  fundo: "#FFF8F3",
  card: "#FFFFFF",
  texto: "#2B2B2B",
  textoSuave: "#7A7A7A",
  borda: "#EFE3DA",
  erro: "#D64545",
  sucesso: "#2A9D8F",
};

export const sombra = {
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 2,
};

// Serviços da Home (usados também pela tela de agendamento)
export const SERVICOS = {
  banho: { titulo: "Banho", emoji: "🛁", descricao: "Banho completo com secagem e perfume", cor: "#DFF3F1" },
  tosa: { titulo: "Tosa", emoji: "✂️", descricao: "Tosa higiênica ou na tesoura", cor: "#FFE9E1" },
  consulta: { titulo: "Consulta", emoji: "🩺", descricao: "Consulta veterinária de rotina", cor: "#E8ECFF" },
};

export const HORARIOS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const PRODUTOS = [
  { id: "p1", nome: "Ração Premium 10kg", preco: 189.9, emoji: "🥣" },
  { id: "p2", nome: "Petisco Dental", preco: 24.9, emoji: "🦴" },
  { id: "p3", nome: "Shampoo Neutro", preco: 32.5, emoji: "🧴" },
  { id: "p4", nome: "Bolinha de Borracha", preco: 14.9, emoji: "🎾" },
  { id: "p5", nome: "Coleira Ajustável", preco: 39.9, emoji: "🐕" },
  { id: "p6", nome: "Arranhador para Gatos", preco: 79.9, emoji: "🐈" },
];

// Ative para testar: o lembrete dispara em ~15 segundos em vez de 1h antes.
export const MODO_DEMO = true;
