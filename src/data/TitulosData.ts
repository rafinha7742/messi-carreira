export interface Titulo {
  nome: string;
  vezes: number;
  anos: string;
}

export interface GrupoTitulo {
  time: string;
  cor: string;
  titulos: Titulo[];
}

// Dados de exemplo pra ilustrar o layout — vamos conferir e completar os
// números exatos (e a contagem oficial mais recente) antes de ir pro código real.
export const grupos: GrupoTitulo[] = [
  {
    time: "FC Barcelona",
    cor: "#A50044",
    titulos: [
      { nome: "La Liga", vezes: 10, anos: "2004-05, 05-06, 08-09, 09-10, 10-11, 12-13, 14-15, 15-16, 17-18, 18-19" },
      { nome: "Copa del Rey", vezes: 7, anos: "2008-09, 11-12, 14-15, 15-16, 16-17, 17-18, 20-21" },
      { nome: "UEFA Champions League", vezes: 4, anos: "2005-06, 08-09, 10-11, 14-15" },
      { nome: "Supercopa da Espanha", vezes: 8, anos: "2005, 06, 09, 10, 11, 13, 16, 18" },
      { nome: "Supercopa da UEFA", vezes: 3, anos: "2009, 2011, 2015" },
      { nome: "Mundial de Clubes", vezes: 3, anos: "2009, 2011, 2015" },
    ],
  },
  {
    time: "Paris Saint-Germain",
    cor: "#004170",
    titulos: [
      { nome: "Ligue 1", vezes: 2, anos: "2021-22, 2022-23" },
      { nome: "Supercopa da França", vezes: 1, anos: "2022" },
    ],
  },
  {
    time: "Inter Miami CF",
    cor: "#F7B5CD",
    titulos: [
      { nome: "Leagues Cup", vezes: 1, anos: "2023" },
    ],
  },
  {
    time: "Seleção Argentina",
    cor: "#6CACE4",
    titulos: [
      { nome: "Copa do Mundo", vezes: 1, anos: "2022" },
      { nome: "Copa América", vezes: 2, anos: "2021, 2024" },
      { nome: "Finalíssima", vezes: 1, anos: "2022" },
    ],
  },
];

export const totalTitulos = grupos.reduce(
  (soma, g) => soma + g.titulos.reduce((s, t) => s + t.vezes, 0),
  0
);