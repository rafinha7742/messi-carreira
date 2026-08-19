import { ChevronRight } from "lucide-react";
import type { Tema } from "../../data/themes";
import type { Marco } from "../../data/homeData";

interface HomeTimelineProps {
  marcos: Marco[];
  tema: Tema;
  marcoSelecionado: number;
  setMarcoSelecionado: (value: number) => void;
  partidasFiltradasCount: number;
  onOpenMatches: () => void;
}

export default function HomeTimeline({
  marcos,
  tema,
  marcoSelecionado,
  setMarcoSelecionado,
  partidasFiltradasCount,
  onOpenMatches,
}: HomeTimelineProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm tracking-wide text-white/70">LINHA DA CARREIRA</h2>
        <span className="font-mono text-xs text-white/30">#1 → #1164</span>
      </div>
      <div className="relative h-16 rounded-lg bg-[#12151B] border border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-white/[0.04] last:border-0" />
          ))}
        </div>

        {marcos.map((m, i) => (
          <button
            key={m.idx}
            onClick={() => setMarcoSelecionado(i)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ left: `${(m.idx / 1164) * 100}%` }}
            aria-label={m.titulo}
          >
            <span
              className="block rounded-full transition-all"
              style={{
                width: marcoSelecionado === i ? 10 : 8,
                height: marcoSelecionado === i ? 10 : 8,
                backgroundColor: marcoSelecionado === i ? tema.primario : "#A6192E",
                boxShadow: marcoSelecionado === i ? `0 0 0 5px ${tema.primario}33` : "none",
              }}
            />
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-white/10 p-4 bg-[#12151B]">
        <div className="flex items-center gap-2 font-mono text-xs" style={{ color: tema.primario }}>
          <span>#{marcos[marcoSelecionado].idx}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">{marcos.length} marcos catalogados até agora</span>
        </div>
        <div className="font-display text-lg mt-1">{marcos[marcoSelecionado].titulo}</div>
        <div className="text-white/50 text-sm mt-1">{marcos[marcoSelecionado].desc}</div>
      </div>
      <p className="text-white/30 text-xs mt-2 font-mono">toque nos pontos acima para ver cada marco</p>

      <button
        onClick={onOpenMatches}
        className="mt-5 w-full md:w-auto px-5 py-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer hover:bg-white/5"
        style={{ borderColor: tema.primario, color: tema.primario }}
      >
        Ver jogos — {tema.nome} ({partidasFiltradasCount} partidas)
        <ChevronRight size={14} />
      </button>
    </section>
  );
}
