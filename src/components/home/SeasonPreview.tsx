import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function SeasonPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-5">
        <Link to="/temporadas" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
          <h2 className="font-display text-xl">TEMPORADAS</h2>
          <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
        <Link
          to="/temporadas"
          className="border border-white/10 rounded-lg p-5 hover:border-white/30 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-white/40">Todas as temporadas</span>
            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
          </div>
          <div className="font-display text-2xl mb-1">Visão completa</div>
          <div className="text-xs text-white/40 font-mono">
            Acesse todos os anos em um único lugar
          </div>
        </Link>
      </div>
    </section>
  );
}
