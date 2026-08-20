import { useState, useEffect } from "react";
import { getFinais, type Final } from "../services/apiService";
import { temas } from "../data/themes";
import argentinaLogo from "../assets/times/argentina.png";
import barcelonaLogo from "../assets/times/barcelona.png";
import psgLogo from "../assets/times/psg.png";
import interMiamiLogo from "../assets/times/intermiami.png";


import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Finais() {
  const [finais, setFinais] = useState<Final[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarFinais = async () => {
      try {
        setLoading(true);
        setError(null);
        const dados = await getFinais();
        setFinais(dados);
      } catch (err) {
        console.error("Erro ao carregar finais:", err);
        setError("Erro ao carregar finais. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    carregarFinais();
  }, []);

  const getStatusColor = (resultado: string) => {
    switch (resultado) {
      case "Vitória":
        return "#4ADE80";
      case "Derrota":
        return "#EF4444";
      case "Empate":
        return "#F59E0B";
      default:
        return "#6CACE4";
    }
  };

  const getTimeTema = (timeNome: string) => {
    const key = timeNome.toLowerCase();

    if (key.includes("barcelona")) return temas.barcelona;
    if (key.includes("psg") || key.includes("paris")) return temas.psg;
    if (key.includes("miami")) return temas.miami;
    if (key.includes("argentina")) return temas.argentina;

    return temas["carreira completa"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0C10] text-[#EDEAE3] flex items-center justify-center">
        <p className="text-white/50">Carregando finais...</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Link to="/" className="flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6 w-fit">
          <ChevronLeft size={16} /> voltar pra home
        </Link>

        <p className="font-display text-xs tracking-[0.2em] text-white/40 mb-2" style={{ color: "#F5A623" }}>
          {finais.length} FINAIS
        </p>
        <h1 className="font-display text-3xl md:text-4xl mb-8">Todas as finais</h1>

        
        <div className="space-y-2">
          {finais.map((f) => {
            const tema = getTimeTema(f.time);
            const statusColor = getStatusColor(f.resultado);
            return (
              <div
                key={f.id}
                className="w-full min-w-0 border rounded-lg p-4 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between group transition-colors"
                style={{
                  borderColor: `${statusColor}22`,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${statusColor}0D`;
                  e.currentTarget.style.borderColor = `${statusColor}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = `${statusColor}22`;
                }}
              >
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <span className="w-1.5 h-8 shrink-0 rounded-full" style={{ backgroundColor: tema.primario }} />
                  <div className="flex min-w-0 items-center gap-3">
                    {f.time.toLowerCase().includes("argentina") && (
                      <img src={argentinaLogo} alt="Argentina" className="w-10 h-13 object-contain rounded-full" />
                    )}
                    {f.time.toLowerCase().includes("barcelona") && (
                      <img src={barcelonaLogo} alt="Barcelona" className="w-10 h-12 object-contain rounded-full" />
                    )}
                    {f.time.toLowerCase().includes("psg") && (
                      <img src={psgLogo} alt="PSG" className="w-10 h-10 object-contain rounded-full" />
                    )}
                    {f.time.toLowerCase().includes("miami") && (
                      <img src={interMiamiLogo} alt="Inter Miami" className="w-10 h-10 object-contain rounded-full" />
                    )}
                    <div className="min-w-0">
                      <div className="font-display text-base sm:text-lg break-words">
                      {f.competicao}
                      {f.jogo !== "Único" && (
                      <span className="text-white/40 text-sm font-mono ml-2">({f.jogo.toLowerCase()})</span>
                      )}
                      </div>
                      <div className="text-xs text-white/40 font-display break-words">
                        {f.time} vs {f.adversario}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 pl-4 sm:items-center sm:justify-end sm:gap-8 sm:pl-0">
                  <div className="text-left sm:text-right">
                    <div className="font-display text-sm">{f.placar}</div>
                    <div className="text-xs text-white/40 font-display mt-0.5">{f.data}</div>
                    <div
                      className="text-xs font-display mt-1"
                      style={{ color: getStatusColor(f.resultado) }}
                    >
                      {f.resultado}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-sm">
                      {f.gols} gols · {f.assist} assist
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
