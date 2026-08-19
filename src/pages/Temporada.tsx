import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { getPartidas, getTemporadas, type Partida, type Temporada as TemporadaType } from "../services/apiService";
import { temas } from "../data/themes";


const normalizeSeasonCode = (code: string) => code.replace(/-/g, "–");

function parseDate(value: string) {
  const [day, month, year] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function seasonRangeFromCode(code: string) {
  const normalized = normalizeSeasonCode(code);
  const parts = normalized.split("–").map((part) => part.trim());

  if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    return {
      start: `${parts[0]}-01-01`,
      end: `${parts[0]}-12-31`,
    };
  }

  if (parts.length === 2 && /^\d{2}$/.test(parts[0]) && /^\d{2}$/.test(parts[1])) {
    const startYear = 2000 + Number(parts[0]);
    const endYear = 2000 + Number(parts[1]);
    return {
      start: `${startYear}-07-01`,
      end: `${endYear}-06-30`,
    };
  }

  return null;
}

function formatNumber(value: number) {
  return value.toLocaleString("pt-BR");
}

export default function Temporada() {
  const { seasonCode } = useParams();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const backTo = from === "home" ? "/" : "/temporadas";
  const backText = from === "home" ? "voltar pra home" : "voltar para temporadas";
  const code = seasonCode ? normalizeSeasonCode(seasonCode) : "";
  
  const [temporadas, setTemporadas] = useState<TemporadaType[]>([]);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        const [temporadasData, partidasData] = await Promise.all([
          getTemporadas(),
          getPartidas(),
        ]);
        setTemporadas(temporadasData);
        setPartidas(partidasData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const temporada = temporadas.find((t) => normalizeSeasonCode(t.code) === code);
  const dateRange = seasonRangeFromCode(code);
  const theme = temporada ? temas[temporada.time] : temas.barcelona;

  const jogos = partidas.filter((p) => {
    if (!dateRange) return false;
    const partidaDate = parseDate(p.data);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    return partidaDate >= startDate && partidaDate <= endDate;
  });
  const gols = jogos.reduce((sum, partida) => sum + partida.gols, 0);
  const assists = jogos.reduce((sum, partida) => sum + partida.assist, 0);

  if (loading) {
    return (
      <div className="page-legacy-font min-h-screen text-[#EDEAE3] font-sans" style={{ backgroundColor: "#0A0C10" }}>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="text-white/50">Carregando temporada...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-legacy-font min-h-screen text-[#EDEAE3] font-sans" style={{ backgroundColor: "#0A0C10" }}>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!temporada || !dateRange) {
    return (
      <div className="page-legacy-font min-h-screen text-[#EDEAE3] font-sans" style={{ backgroundColor: "#0A0C10" }}>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Link to="/temporadas" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6">
            <ChevronLeft size={16} /> voltar para temporadas
          </Link>
          <h1 className="font-display text-3xl mb-4">Temporada não encontrada</h1>
          <p className="text-white/40">Não há uma página disponível para essa temporada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-legacy-font min-h-screen text-[#EDEAE3] font-sans" style={{ backgroundColor: "#0A0C10" }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to={backTo} className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6">
          <ChevronLeft size={16} /> {backText}
        </Link>

        <p className="font-mono text-xs tracking-[0.2em] text-white/40 mb-2">
          {jogos.length} JOGOS · {formatNumber(gols)} GOLS · {formatNumber(assists)} ASSISTÊNCIAS
        </p>
        <h1 className="font-display text-3xl md:text-4xl mb-8">Temporada {temporada.code}</h1>
        <div className="rounded-2xl border border-white/10 bg-[#12151B] p-6 mb-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-white/40 uppercase tracking-[0.24em] mb-2">{temporada.era}</div>
              <div className="font-display text-2xl">{theme.nome}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase text-white/40">Resumo da temporada</div>
              <div className="font-mono text-sm mt-1">
                {temporada.jogos} jogos · {temporada.gols} gols · {temporada.assist} assist.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {jogos.map((partida: Partida) => (
            <div
              key={partida.idx}
              className="rounded-2xl border border-white/10 bg-[#12151B] p-4 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-display text-xl">{partida.data}</div>
                  <div className="text-white/40 text-sm">{partida.comp}</div>
                </div>
                <div className="font-mono text-sm text-white/40">{partida.casa} · {partida.placar} · {partida.fora}</div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/40">
                <span
                  className={partida.gols > 0 ? undefined : "text-white/40"}
                  style={{ color: partida.gols > 0 ? theme.primario : undefined }}
                >
                  {partida.gols} gols
                </span>
                <span
                  className={partida.assist > 0 ? undefined : "text-white/40"}
                  style={{ color: partida.assist > 0 ? theme.primario : undefined }}
                >
                  {partida.assist} assist.
                </span>
                <span>{partida.cartoes} cartões</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
