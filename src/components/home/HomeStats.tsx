interface HomeStatsProps {
  games: number;
  goals: number;
  assists: number;
}

export default function HomeStats({ games, goals, assists }: HomeStatsProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10">
      <p className="font-mono text-xs tracking-[0.2em] mb-4" style={{ color: "#EDEAE3" }}>
        2004 — 2026 · CADA PARTIDA, NUMERADA
      </p>
      <h1 className="font-display text-3xl sm:text-4xl md:text-6xl leading-[1] sm:leading-[0.95] max-w-3xl">
        A carreira do Messi,
        <br />
        jogo a jogo.
      </h1>
      <p className="text-white/50 max-w-xl mt-5 text-[15px] leading-relaxed">
        Da estreia contra o Espanyol até a partida mais recente: todo gol,
        toda assistência e toda final, na ordem exata em que aconteceram.
      </p>

      <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-px bg-white/10 mt-8 sm:mt-10 max-w-2xl rounded-lg overflow-hidden">
        {[
          { label: "Partidas", val: games },
          { label: "Gols", val: goals },
          { label: "Assistências", val: assists },
        ].map((s) => (
          <div key={s.label} className="bg-[#0A0C10] px-4 sm:px-6 py-4 sm:py-5">
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl text-[#EDEAE3]">
              {s.val.toLocaleString("pt-BR")}
            </div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
