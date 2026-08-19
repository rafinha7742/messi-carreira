import { Link } from "react-router-dom"
import type { Mundial } from "../../data/MundiaisData";

interface WorldCupsSectionProps {
  mundiais: Mundial[];
}

export default function WorldCupsSection({ mundiais }: WorldCupsSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-5">
        
        <h2 className="font-display text-xl">COPAS DO MUNDO 2006–2026</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {mundiais.map((m) => (
          <Link
            key={m.ano}
            to={`/mundial/${m.ano}`}
            state={{ from: "home" }}
            className="border border-white/10 rounded-lg p-4 cursor-pointer transition-colors hover:border-white/30 group"
            style={{
              borderColor: m.resultado.includes("Campeão") ? "#F5A62366" : undefined,
              backgroundColor: m.resultado.includes("Campeão") ? "#F5A62314" : "transparent",
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="font-display text-2xl">{m.ano}</div>
            </div>
            <div className="text-sm text-white/70">{m.resultado}</div>
            {m.nota && <div className="text-xs text-white/40 mt-1 font-mono">{m.nota}</div>}
          </Link>
        ))}
      </div>
    </section>
  );
}
