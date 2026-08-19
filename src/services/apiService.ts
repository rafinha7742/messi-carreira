const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

export interface Partida {
  idx: number;
  data: string;
  comp: string;
  casa: string;
  placar: string;
  fora: string;
  gols: number;
  assist: number;
  cartoes: number;
}

export interface Mundial {
  ano: number;
  resultado: string;
  nota: string;
}

export interface Temporada {
  code: string;
  time: string;
  jogos: number;
  gols: number;
  assist: number;
  era: string;
}

export interface Titulo {
  id: number;
  time: string;
  cor: string;
  nome: string;
  vezes: number;
  anos: string;
}

export interface Final {
  id: number;
  competicao: string;
  adversario: string;
  resultado: "Vitória" | "Derrota" | "Empate";
  gols: number;
  assist: number;
  data: string;
  time: string;
  placar: string;
  jogo: "Único" | "Ida" | "Volta";
}

export interface Treinador {
  id: number;
  nome: string;
  time: string;
  cor: string;
  periodo: string;
  jogos: number;
  gols: number;
  assist: number;
  titulos: number;
}

// Helper para tratamento de erros
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    throw new Error("Não foi possível conectar à API. Verifique se o backend está rodando.", {
      cause: error,
    });
  }
}

// Partidas
export async function getPartidas(): Promise<Partida[]> {
  return fetchAPI<Partida[]>("/api/partidas");
}

// Mundiais
export async function getMundiais(): Promise<Mundial[]> {
  return fetchAPI<Mundial[]>("/api/mundiais");
}

// Temporadas
export async function getTemporadas(): Promise<Temporada[]> {
  return fetchAPI<Temporada[]>("/api/temporadas");
}

// Títulos
export async function getTitulos(): Promise<Titulo[]> {
  return fetchAPI<Titulo[]>("/api/titulos");
}

// Finais
export async function getFinais(): Promise<Final[]> {
  return fetchAPI<Final[]>("/api/finais");
}

// Treinadores
export async function getTreinadores(): Promise<Treinador[]> {
  return fetchAPI<Treinador[]>("/api/treinadores");
}
