import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight,} from "lucide-react";
import { getTitulos } from "../../services/apiService";

export default function TitlesSection() {
  const [totalTitulos, setTotalTitulos] = useState<number>(0);

  useEffect(() => {
    getTitulos()
      .then((dados) => {
        // Cada item do back-end tem um campo "vezes" (quantas vezes aquele
        // título foi ganho). Somamos todos pra chegar no total geral —
        // é a mesma conta que o TitulosData.ts local fazia com "reduce".
        const total = dados.reduce((soma, t) => soma + t.vezes, 0);
        setTotalTitulos(total);
      })
      .catch((err) => console.error("Erro ao carregar títulos:", err));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-5">
        <Link to="/titulos" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
          
          <h2 className="font-display text-xl">TÍTULOS</h2>
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
        <Link
          to="/titulos"
          className="border border-white/10 rounded-lg p-5 md:p-6 hover:border-white/30 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-white/40">Títulos da carreira</span>
            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
          </div>
          <div className="font-display text-2xl mb-1">{totalTitulos}</div>
          <div className="text-xs text-white/40 font-mono">títulos conquistados na carreira</div>
        </Link>
      </div>
    </section>
  );
}
