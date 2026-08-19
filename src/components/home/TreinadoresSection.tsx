import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getTreinadores } from "../../services/apiService";

export default function TreinadoresSection() {
  const [totalTreinadores, setTotalTreinadores] = useState<number>(0);

  useEffect(() => {
    getTreinadores()
      .then((dados) => setTotalTreinadores(dados.length))
      .catch((err) => console.error("Erro ao carregar treinadores:", err));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-5">
        <Link to="/treinadores" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
          <h2 className="font-display text-xl">TREINADORES</h2>
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
        <Link
          to="/treinadores"
          className="border border-white/10 rounded-lg p-5 md:p-6 hover:border-white/30 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-white/40">Treinadores na carreira</span>
            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
          </div>
          <div className="font-display text-2xl mb-1">{totalTreinadores}</div>
          <div className="text-xs text-white/40 font-mono">técnicos que já comandaram Messi na carreira</div>
        </Link>
      </div>
    </section>
  );
}
