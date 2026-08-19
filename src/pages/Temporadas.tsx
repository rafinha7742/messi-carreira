import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTemporadas, type Temporada } from "../services/apiService";
import { temas } from "../data/themes";

const filtros = [
  { key: "todos", label: "Todos os times" },
  { key: "barcelona", label: "FC Barcelona" },
  { key: "psg", label: "PSG" },
  { key: "miami", label: "Inter Miami" },
];

export default function Temporadas() {
  const [filtro, setFiltro] = useState<string>("todos");
  const [temporadas, setTemporadas] = useState<Temporada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarTemporadas = async () => {
      try {
        setLoading(true);
        setError(null);
        const dados = await getTemporadas();
        setTemporadas(dados);
      } catch (err) {
        console.error("Erro ao carregar temporadas:", err);
        setError("Erro ao carregar temporadas. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    carregarTemporadas();
  }, []);

  // Se o filtro for "todos", mostra a lista inteira. Senão, filtra só
  // as temporadas daquele time.
  const lista: Temporada[] =
    filtro === "todos"
      ? temporadas
      : temporadas.filter((t) => t.time === filtro);

  // Acha o maior número de gols entre TODAS as temporadas, pra destacar
  // qual foi o recorde na lista.
  const recorde = temporadas.length > 0 ? Math.max(...temporadas.map((t) => t.gols)) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0C10] text-[#EDEAE3] flex items-center justify-center">
        <p className="text-white/50">Carregando temporadas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0C10] text-[#EDEAE3] flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="page-legacy-font min-h-screen text-[#EDEAE3] font-sans"
      style={{
        backgroundColor: "#0A0C10",
        backgroundImage: `linear-gradient(rgba(10, 12, 16, 0.9), rgba(10, 12, 16, 0.9))`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to="/" className="flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6 w-fit">
          <ChevronLeft size={16} /> voltar pra home
        </Link>

        <p className="font-display text-xs tracking-[0.2em] text-white/40 mb-2" style={{ color: "#F5A623" }}>
          {temporadas.length} TEMPORADAS · 2004 — 2026
        </p>
        <h1 className="font-display text-3xl md:text-4xl mb-8">Todas as temporadas</h1>

        {/* filtro por time */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filtros.map((f) => {
            const corBotao =
              f.key === "todos" ? temas["carreira completa"].primario : temas[f.key]?.primario ?? "#F5A623";
            const ativo = filtro === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={ativo}
                onClick={() => setFiltro(f.key)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={{
                  borderColor: ativo ? corBotao : "rgba(255,255,255,0.15)",
                  backgroundColor: ativo ? corBotao : "transparent",
                  color: ativo ? "#0A0C10" : "rgba(255,255,255,0.6)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* lista de temporadas */}
        <div
          className="space-y-2 min-h-[36rem] max-h-[70vh] overflow-y-auto pr-1 transition-all duration-200 scrollbar-subtle"
          style={{
            scrollbarColor: "rgba(255,255,255,0.15) rgba(10,12,16,0)",
            scrollbarWidth: "thin",
          }}
        >
          {lista.map((t) => {
            const tema = temas[t.time];
            const ehRecorde = t.gols === recorde;
            return (
                           <Link
                key={`${t.time}-${t.code}`}
                to={`/temporada/${t.code.replace(/–/g, "-")}`}
                state={{ from: "temporadas" }}
                className="w-full text-left border rounded-lg p-4 flex items-center justify-between transition-colors group"
                style={{
                  borderColor: ehRecorde ? `${tema.primario}66` : `${tema.primario}22`,
                  backgroundColor: ehRecorde ? `${tema.primario}14` : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!ehRecorde) e.currentTarget.style.backgroundColor = `${tema.primario}0D`;
                  e.currentTarget.style.borderColor = `${tema.primario}66`;
                }}
                onMouseLeave={(e) => {
                  if (!ehRecorde) e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = ehRecorde ? `${tema.primario}66` : `${tema.primario}22`;
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: tema.primario }} />
                  <div>
                    <div className="font-display text-xl">{t.code}</div>
                    <div className="text-xs text-white/40 font-display">{tema.nome}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-display text-sm">
                      {t.jogos} jogos · {t.gols} gols · {t.assist} assist.
                    </div>
                    {ehRecorde && (
                      <div className="text-xs font-display mt-0.5" style={{ color: tema.primario }}>
                        recorde de gols numa temporada
                      </div>
                    )}
                  </div>
                  <ChevronRight size={18} style={{ color: `${tema.primario}55` }} className="group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
