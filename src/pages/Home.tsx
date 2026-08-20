import { useState, useEffect, useRef } from "react";
import { temas } from "../data/themes";
import { marcos } from "../data/homeData";
import { getPartidas, getMundiais, type Partida, type Mundial } from "../services/apiService";
import HomeHeader from "../components/home/HomeHeader";
import HomeStats from "../components/home/HomeStats";
import TeamSelector from "../components/home/TeamSelector";
import HomeTimeline from "../components/home/HomeTimeline";
import WorldCupsSection from "../components/home/WorldCupsSection";
import SeasonPreview from "../components/home/SeasonPreview";
import MatchesModal from "../components/home/MatchesModal";
import TitlesSection from "../components/home/TitlesSection";
import FinalsSection from "../components/home/FinalsSection";
import TreinadoresSection from "../components/home/TreinadoresSection";
import heroImage from "../assets/times/messi10.webp";

function useCountUp(target: number, duration: number = 1400): number {
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;

    const step = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const p = Math.min((t - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));

      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

export default function Home() {
  const games = useCountUp(1164);
  const goals = useCountUp(919);
  const assists = useCountUp(419);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [mundiais, setMundiais] = useState<Mundial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [partidasData, mundiaisData] = await Promise.all([
          getPartidas(),
          getMundiais(),
        ]);
        setPartidas(partidasData);
        setMundiais(mundiaisData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const [timeAtivo, setTimeAtivo] = useState<string>("carreira completa");
  const [marcoSelecionado, setMarcoSelecionado] = useState<number>(0);
  const [tabelaAberta, setTabelaAberta] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const tema = temas[timeAtivo];

  useEffect(() => {
    document.body.style.overflow = tabelaAberta ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [tabelaAberta]);

  const getMessiTeamAtIndex = (idx: number): string => {
    if (idx >= 1 && idx <= 929) return "FC Barcelona";
    if (idx >= 930 && idx <= 1028) return "Paris Saint-Germain";
    if (idx >= 1029) return "Inter Miami CF";
    return "Argentina";
  };

  const partidasFiltradasPorTime =
    timeAtivo === "carreira completa"
      ? partidas
      : partidas.filter((p) => {
          const messiTeam = getMessiTeamAtIndex(p.idx);
          if (tema.nome === "Argentina") {
            return p.casa === "Argentina" || p.fora === "Argentina";
          }
          return (p.casa === tema.nome || p.fora === tema.nome) && messiTeam === tema.nome;
        });

  const query = searchValue.trim().toLowerCase();
  const partidasFiltradas = query
    ? partidasFiltradasPorTime.filter((p) => {
        const texto = `${p.casa} ${p.fora} ${p.comp} ${p.placar}`.toLowerCase();
        return texto.includes(query);
      })
    : partidasFiltradasPorTime;

  return (
    <div className="min-h-screen bg-[#050608] text-[#EDEAE3] font-sans transition-colors duration-500">
      <HomeHeader
        tema={tema}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchFocus={() => setTabelaAberta(true)}
        isSearchActive={tabelaAberta || searchValue.length > 0}
      />
      {(loading || error) && (
        <div role={error ? "alert" : "status"} className={`px-4 py-2 text-center text-sm ${error ? "bg-red-950 text-red-200" : "bg-white/5 text-white/60"}`}>
          {error ?? "Carregando dados da carreira..."}
        </div>
      )}
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(5, 6, 8, 0.88), rgba(5, 6, 8, 0.88)), url(${heroImage})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "normal",  
        }}
      >
        <HomeStats games={games} goals={goals} assists={assists} />
        <TeamSelector timeAtivo={timeAtivo} setTimeAtivo={setTimeAtivo} tema={tema} />
        <HomeTimeline
          marcos={marcos}
          tema={tema}
          marcoSelecionado={marcoSelecionado}
          setMarcoSelecionado={setMarcoSelecionado}
          partidasFiltradasCount={partidasFiltradas.length}
          onOpenMatches={() => setTabelaAberta(true)}
        />
        <WorldCupsSection mundiais={mundiais} />
        <SeasonPreview />
        <TitlesSection />
        <FinalsSection />
        <TreinadoresSection />

        {tabelaAberta && (
          <MatchesModal
            partidas={partidasFiltradas}
            tema={tema}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onClose={() => setTabelaAberta(false)}
          />
        )}

        <footer className="border-t border-white/10 mt-10">
          <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-white/30 font-mono">
            Dados: MessiStats.com · protótipo de interface
          </div>
        </footer>
      </div>
    </div>
  );
}

