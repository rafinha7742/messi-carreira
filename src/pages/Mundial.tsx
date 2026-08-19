import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPartidas, getMundiais, type Partida, type Mundial as MundialType } from "../services/apiService";

export default function Mundial() {
  const { ano } = useParams();
  const location = useLocation();
  const from = location.state?.from as "home" | "temporadas" | undefined;
  const backTo = from === "home" ? "/" : "/temporadas";
  const backText = from === "home" ? "voltar pra home" : "voltar para temporadas";

  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [mundiais, setMundiais] = useState<MundialType[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [partidasData, mundiaisData] = await Promise.all([
          getPartidas(),
          getMundiais(),
        ]);
        setPartidas(partidasData);
        setMundiais(mundiaisData);
      } catch (err) {
        console.error("Erro ao carregar dados da Copa:", err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const year = Number(ano);
  const mundial = mundiais.find((m) => m.ano === year);
  const partidasMundial = partidas
    .filter((partida) => partida.comp === `World Cup ${year}` || partida.comp === "World Cup")
    .filter((partida) => {
      const matchYear = Number(partida.data.split("-")[2]);
      return matchYear === year;
    });

  // Enquanto os dados ainda não chegaram do back-end, mostramos um aviso
  // simples em vez da tela de "não encontrada" (senão ela pisca na tela
  // por uma fração de segundo antes dos dados carregarem).
  if (carregando) {
    return (
      <div className="px-6 py-10 max-w-6xl mx-auto text-white/60">
        Carregando dados da Copa...
      </div>
    );
  }

  if (!mundial || !ano) {
    return (
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition mb-6">
          <ArrowLeft size={18} /> voltar para home
        </Link>
        <h1 className="font-display text-3xl">Copa do Mundo não encontrada</h1>
        <p className="mt-4 text-white/60">Verifique se o ano da Copa existe na lista.</p>
      </div>
    );
  }

  const matchesByDate = [...partidasMundial].sort((a, b) => {
    const [dA, mA, yA] = a.data.split("-").map(Number);
    const [dB, mB, yB] = b.data.split("-").map(Number);
    return new Date(yA, mA - 1, dA).getTime() - new Date(yB, mB - 1, dB).getTime();
  });

  const totalGoals = matchesByDate.reduce((total, partida) => total + partida.gols, 0);
  const totalAssists = matchesByDate.reduce((total, partida) => total + partida.assist, 0);

  return (
    <div className="relative min-h-screen text-[#EDEAE3] font-sans" style={{ backgroundColor: "#0A0C10" }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to={backTo} state={{ from }} className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 mb-6">
          <ArrowLeft size={16} /> {backText}
        </Link>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div className="flex-1">
            <div className="text-white/70 mb-3">Mundial {year}</div>
            <h1 className="font-display text-3xl md:text-4xl mb-4">Copa do Mundo {year}</h1>
            <p className="text-white/70 max-w-2xl">{mundial.resultado}</p>
            {mundial.nota ? <p className="mt-2 text-sm text-white/50">{mundial.nota}</p> : null}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#12151B] p-6 text-sm text-white/80">
            <div className="font-medium text-white">Resumo da Copa</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-white/50 text-xs uppercase">partidas</div>
                <div className="mt-1 text-2xl font-semibold">{matchesByDate.length}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase">gols</div>
                <div className="mt-1 text-2xl font-semibold" style={{ color: totalGoals > 0 ? "#F5A623" : "#EDEAE3" }}>
                  {totalGoals}
                </div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase">assistências</div>
                <div className="mt-1 text-2xl font-semibold" style={{ color: totalAssists > 0 ? "#F5A623" : "#EDEAE3" }}>
                  {totalAssists}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-1 xl:items-start">
          <section className="space-y-4">
            <h2 className="font-display text-2xl">Partidas</h2>

            {matchesByDate.length === 0 ? (
              <p className="text-white/60">Nenhuma partida encontrada para essa Copa.</p>
            ) : (
              <div className="space-y-4">
                {matchesByDate.map((partida) => (
                  <article key={partida.idx} className="rounded-2xl border border-white/10 bg-[#12151B] p-5 hover:border-white/20 transition-colors">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-white/70 text-sm">{partida.data}</div>
                        <div className="mt-2 text-lg font-semibold text-white">{partida.casa} {partida.placar} {partida.fora}</div>
                        <div className="mt-1 text-sm text-white/60">{partida.comp}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-sm text-white/70">
                        <div className="rounded-2xl bg-white/5 p-3">
                          <div className="text-[10px] uppercase text-white/50">gols</div>
                          <div className="mt-1 font-semibold" style={{ color: partida.gols > 0 ? "#F5A623" : "#EDEAE3" }}>{partida.gols}</div>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-3">
                          <div className="text-[10px] uppercase text-white/50">assist</div>
                          <div className="mt-1 font-semibold" style={{ color: partida.assist > 0 ? "#F5A623" : "#EDEAE3" }}>{partida.assist}</div>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-3">
                          <div className="text-[10px] uppercase text-white/50">cartões</div>
                          <div className="mt-1 font-semibold text-white">{partida.cartoes}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
