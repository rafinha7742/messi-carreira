import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getTitulos, type Titulo } from "../services/apiService";
import copaImg from "../assets/times/copa.png";
import copaAmerica from "../assets/times/america.png";
import finalissimaImg from "../assets/times/finalissima.png";
import champions from "../assets/times/champions.webp";
import coparei from "../assets/times/rei.png";
import mundial from "../assets/times/mundial.webp";
import uefa from "../assets/times/uefa.png";
import laliga from "../assets/times/laliga.png";
import supercopa from "../assets/times/espanha.png";
import frances from "../assets/times/ligueone.png";
import copafranca from "../assets/times/superfranca.png";
import leaguesCup from "../assets/times/mls.png";







interface GrupoTitulo {
  time: string;
  cor: string;
  titulos: { nome: string; vezes: number; anos: string }[];
}

export default function TitulosPreview() {
  const [aberto, setAberto] = useState<string[]>([]);
  const [grupos, setGrupos] = useState<GrupoTitulo[]>([]);
  const [totalTitulos, setTotalTitulos] = useState<number>(0);

  useEffect(() => {
    getTitulos()
      .then((dados: Titulo[]) => {
        
        const total = dados.reduce((soma, t) => soma + t.vezes, 0);
        setTotalTitulos(total);

        
        
        const mapaGrupos = new Map<string, GrupoTitulo>();

        dados.forEach((t) => {
          if (!mapaGrupos.has(t.time)) {
            mapaGrupos.set(t.time, { time: t.time, cor: t.cor, titulos: [] });
          }
          mapaGrupos.get(t.time)!.titulos.push({
            nome: t.nome,
            vezes: t.vezes,
            anos: t.anos,
          });
        });

        setGrupos(Array.from(mapaGrupos.values()));
      })
      .catch((err) => console.error("Erro ao carregar títulos:", err));
  }, []);

  return (
    <div
      className="min-h-screen text-[#EDEAE3]"
      style={{
        backgroundColor: "#0A0C10",
        backgroundImage: "linear-gradient(rgba(10, 12, 16, 0.9), rgba(10, 12, 16, 0.9))",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Archivo Black', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        body, div { font-family: 'Public Sans', sans-serif; }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Link to="/" className="flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6">
          <ChevronLeft size={16} /> voltar pra home
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <p className="font-mono text-xs tracking-[0.2em]" style={{ color: "#F5A623" }}>
            TODOS OS TITULOS DA CARREIRA 
          </p>
        </div>
        <h1 className="font-display text-3xl md:text-4xl mb-3">Títulos</h1>
        <p className="text-white/50 text-sm max-w-lg mb-8 leading-relaxed">
          O jogador com mais títulos da história do futebol — clube e seleção somados.
        </p>

        
        <div
          className="rounded-xl p-6 mb-10 border"
          style={{
            borderColor: "#F5A62355",
            background:
              grupos.length > 0
                ? `linear-gradient(120deg, ${grupos.map((g) => `${g.cor}1A`).join(", ")})`
                : "#F5A62314",
          }}
        >
          <div className="font-mono text-5xl font-bold" style={{ color: "#F5A623" }}>
            {totalTitulos}
          </div>
          <div className="text-sm text-white/50 mt-1">títulos conquistados na carreira</div>
        </div>

        
        <div className="space-y-3">
          {grupos.map((g) => {
            const totalGrupo = g.titulos.reduce((s, t) => s + t.vezes, 0);
            const estaAberto = aberto.includes(g.time);
            return (
              <div
                key={g.time}
                className="rounded-lg overflow-hidden transition-colors"
                style={{
                  border: `1px solid ${g.cor}33`,
                  backgroundColor: estaAberto ? `${g.cor}0D` : "transparent",
                }}
              >
                <button
                  onClick={() =>
                    setAberto((prev) =>
                      prev.includes(g.time)
                        ? prev.filter((time) => time !== g.time)
                        : [...prev, g.time]
                    )
                  }
                  className="w-full flex items-center justify-between p-4 transition-colors group"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${g.cor}1A`)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: g.cor }} />
                    <div className="text-left">
                      <div className="font-display text-lg">{g.time}</div>
                      <div className="text-xs text-white/40 font-mono">{totalGrupo} títulos</div>
                    </div>
                  </div>
                  <span
                    className="transition-transform"
                    style={{
                      color: estaAberto ? g.cor : "rgba(255,255,255,0.3)",
                      transform: estaAberto ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    ›
                  </span>
                </button>

                {estaAberto && (
                  <div className="border-t border-white/10 divide-y divide-white/5">
                    {g.titulos.map((t) => (
                      <div key={t.nome} className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                         
                          {g.time === "Seleção Argentina" && t.nome === "Copa do Mundo" && (
                            <img src={copaImg} alt="Copa do Mundo" className="w-10 h-16 object-contain" />
                          )}
                          {g.time === "Seleção Argentina" && t.nome === "Copa América" && (
                            <img src={copaAmerica} alt="Copa América" className="w-10 h-12 object-contain" />
                          )}
                          {g.time === "Seleção Argentina" && t.nome === "Finalíssima" && (
                            <img src={finalissimaImg} alt="Finalíssima" className="w-10 h-12 object-contain" />
                          )}
                          {g.time === "FC Barcelona" && t.nome === "Mundial de Clubes" && (
                            <img src={mundial} alt="Mundial de Clubes" className="w-14 h-12 object-contain" />
                          )}
                          {g.time === "FC Barcelona" && t.nome === "UEFA Champions League" && (
                            <img src={champions} alt="UEFA Champions League" className="w-15 h-12 object-contain" />
                          )}
                          {g.time === "FC Barcelona" && t.nome === "Copa del Rey" && (
                            <img src={coparei} alt="Copa del Rey" className="w-14 h-12 object-contain" />
                          )}
                          {g.time === "FC Barcelona" && t.nome === "Supercopa da UEFA" && (
                            <img src={uefa} alt="Supercopa da UEFA" className="w-14 h-12 object-contain" />
                          )}
                          {g.time === "FC Barcelona" && t.nome === "La Liga" && (
                            <img src={laliga} alt="La Liga" className="w-14 h-12 object-contain" />
                          )}
                          {g.time === "FC Barcelona" && t.nome === "Supercopa da Espanha" && (
                            <img src={supercopa} alt="Supercopa da Espanha" className="w-14 h-12 object-contain" />
                          )}
                          {g.time === "Paris Saint-Germain" && t.nome === "Ligue 1" && (
                            <img src={frances} alt="Ligue 1" className="w-14 h-12 object-contain" />
                          )}
                          {g.time === "Paris Saint-Germain" && t.nome === "Supercopa da França" && (
                            <img src={copafranca} alt="Supercopa da França" className="w-14 h-12 object-contain" />
                          )}
                          {g.time === "Inter Miami CF" && t.nome === "Leagues Cup" && (
                            <img src={leaguesCup} alt="Leagues Cup" className="w-14 h-12 object-contain" />
                          )}
                          <div>
                            <div className="text-sm font-medium">{t.nome}</div>
                            <div className="text-xs text-white/40 font-mono mt-0.5">{t.anos}</div>
                          </div>
                        </div>
                        <div className="font-mono text-lg shrink-0" style={{ color: g.cor }}>
                          {t.vezes}×
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
