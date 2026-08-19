// Descreve o formato de uma temporada: qual código (tipo "11–12"), quantos
// jogos, gols e assistências, e qual "era" (fase da carreira) ela representa.
export interface Temporada {
  code: string;
  time: string;
  jogos: number;
  gols: number;
  assist: number;
  era: string;
}

// Números combinando clube + seleção Argentina na mesma janela de tempo
// (decisão que você confirmou) — conferidos batendo com o total real da
// carreira (919 gols, 1.164 jogos).
export const temporadas: Temporada[] = [
  { code: "04–05", time: "barcelona", jogos: 9, gols: 1, assist: 0, era: "Estreia" },
  { code: "05–06", time: "barcelona", jogos: 35, gols: 10, assist: 6, era: "" },
  { code: "06–07", time: "barcelona", jogos: 41, gols: 19, assist: 5, era: "" },
  { code: "07–08", time: "barcelona", jogos: 55, gols: 21, assist: 16, era: "" },
  { code: "08–09", time: "barcelona", jogos: 60, gols: 41, assist: 19, era: "Tríplice Coroa" },
  { code: "09–10", time: "barcelona", jogos: 63, gols: 48, assist: 12, era: "" },
  { code: "10–11", time: "barcelona", jogos: 63, gols: 57, assist: 26, era: "Prime" },
  { code: "11–12", time: "barcelona", jogos: 73, gols: 82, assist: 37, era: "Recorde" },
  { code: "12–13", time: "barcelona", jogos: 62, gols: 69, assist: 18, era: "" },
  { code: "13–14", time: "barcelona", jogos: 53, gols: 48, assist: 15, era: "" },
  { code: "14–15", time: "barcelona", jogos: 70, gols: 62, assist: 32, era: "Tríplice Coroa" },
  { code: "15–16", time: "barcelona", jogos: 60, gols: 50, assist: 27, era: "" },
  { code: "16–17", time: "barcelona", jogos: 57, gols: 57, assist: 18, era: "" },
  { code: "17–18", time: "barcelona", jogos: 64, gols: 52, assist: 21, era: "" },
  { code: "18–19", time: "barcelona", jogos: 56, gols: 54, assist: 19, era: "" },
  { code: "19–20", time: "barcelona", jogos: 41, gols: 29, assist: 23, era: "" },
  { code: "20–21", time: "barcelona", jogos: 67, gols: 48, assist: 21, era: "" },
  { code: "21–22", time: "psg", jogos: 45, gols: 21, assist: 16, era: "" },
  { code: "22–23", time: "psg", jogos: 54, gols: 38, assist: 25, era: "PSG" },
  { code: "2023", time: "miami", jogos: 19, gols: 14, assist: 5, era: "" },
  { code: "2024", time: "miami", jogos: 36, gols: 29, assist: 18, era: "" },
  { code: "2025", time: "miami", jogos: 54, gols: 46, assist: 28, era: "" },
  { code: "2026", time: "miami", jogos: 27, gols: 23, assist: 12, era: "" },
];

const destaqueCodes = ["04–05", "08–09", "10–11", "11–12", "14–15", "22–23"];
export const temporadasEmDestaque: Temporada[] = destaqueCodes
  .map((code) => temporadas.find((temporada) => temporada.code === code))
  .filter((temporada): temporada is Temporada => Boolean(temporada));