import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0C10] px-6 text-[#EDEAE3] grid place-items-center">
      <div className="max-w-lg text-center">
        <p className="font-mono text-sm tracking-[0.2em] text-[#F5A623]">ERRO 404</p>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">Página não encontrada</h1>
        <p className="mt-4 text-white/55">O endereço acessado não existe ou foi alterado.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm hover:border-white/40 hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar para a home
        </Link>
      </div>
    </main>
  );
}
