// ============================================================
// Dados reais de Messi por treinador — pesquisados em fontes como
// DataFactory, ESPN, Inter Miami CF (oficial) e Outlook India.
//
// CONFIANÇA DOS NÚMEROS (leia antes de publicar):
// 🟢 ALTA  — bate em 2+ fontes independentes
// 🟡 MÉDIA — só uma fonte, ou assistências estimadas
// 🔴 DESATUALIZADO — precisa de atualização manual (ver nota)
// ============================================================

export interface Treinador {
  nome: string;
  time: string;
  cor: string;
  periodo: string;
  jogos: number;
  gols: number;
  assist: number;
  titulos: number;
}

export const treinadores: Treinador[] = [
  // ---------- FC BARCELONA ----------
  // Fonte principal: DataFactory (jogos/gols consistentes entre si)
  {
    nome: "Frank Rijkaard",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2004–2008",
    jogos: 110,
    gols: 42,
    assist: 20, // 🟢 alta
    titulos: 3, // 2x La Liga + 1x Champions League
  },
  {
    nome: "Pep Guardiola",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2008–2012",
    jogos: 219,
    gols: 211,
    assist: 84, // 🟢 alta
    titulos: 14,
  },
  {
    nome: "Tito Vilanova",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2012–2013",
    jogos: 50,
    gols: 60, // 🟢 alta — melhor média de gols/jogo da carreira (1.20)
    assist: 20, // 🟡 média — estimativa, não achei fonte direta
    titulos: 1, // La Liga 2012–13
  },
  {
    nome: "Gerardo Martino",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2013–2014",
    jogos: 46,
    gols: 41,
    assist: 22, // 🟡 média — estimativa
    titulos: 1, // Supercopa da Espanha 2013
  },
  {
    nome: "Luis Enrique",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2014–2017",
    jogos: 158,
    gols: 153,
    assist: 65, // 🟡 média — fontes variam entre 65 e 67
    titulos: 9,
  },
  {
    nome: "Ernesto Valverde",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2017–2020",
    jogos: 124,
    gols: 112,
    assist: 50, // 🟡 média — estimativa
    titulos: 4, // 2x La Liga + Copa del Rey + Supercopa
  },
  {
    nome: "Quique Setién",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2020",
    jogos: 24,
    gols: 15,
    assist: 10, // 🟡 média — estimativa (Messi criou mais do que finalizou nesse período)
    titulos: 0,
  },
  {
    nome: "Ronald Koeman",
    time: "FC Barcelona",
    cor: "#A50044",
    periodo: "2020–2021",
    jogos: 47,
    gols: 38, // 🟢 alta — última temporada no Barça
    assist: 14, // 🟢 alta
    titulos: 1, // Copa del Rey 2021
  },

  // ---------- PARIS SAINT-GERMAIN ----------
  // Fonte: mykhel.com / dados oficiais Ligue 1 — totais batem exatamente
  // (34+41=75 jogos, 11+21=32 gols, 15+20=35 assist.)
  {
    nome: "Mauricio Pochettino",
    time: "Paris Saint-Germain",
    cor: "#004170",
    periodo: "2021–2022",
    jogos: 34,
    gols: 11,
    assist: 15, // 🟡 média — dividido a partir do total da temporada
    titulos: 1, // Ligue 1 2021–22
  },
  {
    nome: "Christophe Galtier",
    time: "Paris Saint-Germain",
    cor: "#004170",
    periodo: "2022–2023",
    jogos: 41,
    gols: 21,
    assist: 20, // 🟢 alta
    titulos: 1, // Ligue 1 2022–23
  },

  // ---------- INTER MIAMI CF ----------
  // Fonte: Inter Miami CF oficial + ESPN — totais também batem
  // (55+49=104 jogos, 47+43=90 gols, 23+28=51 assist., até ago/2025)
  {
    nome: "Gerardo Martino",
    time: "Inter Miami CF",
    cor: "#F7B5CD",
    periodo: "2023–2024",
    jogos: 55,
    gols: 47,
    assist: 23, // 🟡 média — dividido a partir do total acumulado
    titulos: 2, // Leagues Cup 2023 + Supporters' Shield 2024
  },
  {
    nome: "Javier Mascherano",
    time: "Inter Miami CF",
    cor: "#F7B5CD",
    periodo: "2025–2026", // saiu em 14/04/2026, "por motivos pessoais"
    jogos: 49, // 🟡 média — é a temporada 2025 completa (ESPN); faltam somar
    gols: 43, // uns 6-8 jogos de 2026 antes dele sair (jan-abril/2026)
    assist: 28,
    titulos: 1, // MLS Cup 2025
  },
  {
    nome: "Guillermo Hoyos",
    time: "Inter Miami CF",
    cor: "#F7B5CD",
    periodo: "2026–presente", // interino, assumiu em 14/04/2026
    jogos: 20, // 🔴 estimativa grosseira — temporada em andamento,
    gols: 12, // conferir com fonte oficial antes de publicar. Ele é o
    assist: 10, // "padrinho de futebol" do Messi desde a La Masia.
    titulos: 0, // ainda sem título à frente do time
  },

  // ---------- SELEÇÃO ARGENTINA ----------
  // Fonte: DataFactory — dados de meados de 2023 (jogos/gols de cada
  // treinador desde a estreia de Messi na seleção, em 2005).
  // Lista completa dos técnicos que já comandaram Messi na Argentina,
  // em ordem cronológica.
  {
    nome: "José Pekerman",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2004–2006",
    jogos: 10,
    gols: 2,
    assist: 2, // 🟡 média — estimativa
    titulos: 0, // eliminado nas quartas da Copa do Mundo 2006
  },
  {
    nome: "Alfio Basile",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2006–2008",
    jogos: 24,
    gols: 8,
    assist: 6, // 🟡 média — estimativa
    titulos: 0,
  },
  {
    nome: "Diego Maradona",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2008–2010",
    jogos: 16,
    gols: 3,
    assist: 3, // 🟡 média — estimativa
    titulos: 0, // eliminado nas quartas da Copa do Mundo 2010 (4-0 p/ Alemanha)
  },
  {
    nome: "Sergio Batista",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2010–2011",
    jogos: 11,
    gols: 4,
    assist: 3, // 🟡 média — estimativa
    titulos: 0, // eliminado nas quartas da Copa América 2011 (em casa)
  },
  {
    nome: "Alejandro Sabella",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2011–2014",
    jogos: 32,
    gols: 25,
    assist: 12, // 🟡 média — estimativa
    titulos: 0, // vice Copa do Mundo 2014
  },
  {
    nome: "Gerardo Martino",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2014–2016",
    jogos: 20,
    gols: 13,
    assist: 8, // 🟡 média — estimativa
    titulos: 0, // vice Copa América 2015 e 2016
  },
  {
    nome: "Edgardo Bauza",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2016–2017",
    jogos: 4,
    gols: 3,
    assist: 1, // 🟡 média — estimativa
    titulos: 0,
  },
  {
    nome: "Jorge Sampaoli",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2017–2018",
    jogos: 11,
    gols: 7,
    assist: 4, // 🟡 média — estimativa
    titulos: 0, // eliminado nas oitavas da Copa do Mundo 2018
  },
  {
    
    nome: "Lionel Scaloni",
    time: "Seleção Argentina",
    cor: "#75AADB",
    periodo: "2018–presente",
    jogos: 205, // 🟡 média — base sólida (192 até mar/2025) + Copa 2026 (8 jogos);
    gols: 122, // faltam ~10-13 jogos de eliminatórias/amistosos entre mar/2025 e a Copa
    assist: 55, // 🟡 média — estimativa proporcional sobre o total
    titulos: 4, // Copa América 2021 + Finalissima 2022 + Copa do Mundo 2022 + Copa América 2024
    // Copa do Mundo 2026: Argentina foi VICE (perdeu a final 1-0 pra Espanha,
    // 19/07/2026) — não conta como título.
},
];
