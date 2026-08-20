import { useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import type { Tema } from "../../data/themes";

interface HomeHeaderProps {
  tema: Tema;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  isSearchActive: boolean;
}

export default function HomeHeader({ tema, searchValue, onSearchChange, onSearchFocus, isSearchActive }: HomeHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="border-b border-white/10 sticky top-0 bg-[#0A0C10]/90 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg tracking-tight">CARREIRA</span>
          <span className="font-display text-lg tracking-tight" style={{ color: tema.primario }}>10</span>
        </div>
        <nav aria-label="Navegação principal" className="order-3 w-full sm:order-none sm:w-auto flex items-center gap-5 overflow-x-auto text-sm text-white/60 font-medium pb-1 sm:pb-0">
          <Link to="/temporadas" className="whitespace-nowrap hover:text-white transition-colors">
            Temporadas
          </Link>
          <Link to="/titulos" className="whitespace-nowrap hover:text-white transition-colors">
            Títulos
          </Link>
          <Link to="/finais" className="whitespace-nowrap hover:text-white transition-colors">
            Finais
          </Link>
          <Link to="/treinadores" className="whitespace-nowrap hover:text-white transition-colors">
            Treinadores
          </Link>
        </nav>
        <div
          role="search"
          onClick={() => {
            inputRef.current?.focus();
            onSearchFocus();
          }}
          className={`flex min-w-0 flex-1 sm:flex-none items-center gap-2 border rounded-full px-3 py-1.5 text-sm sm:w-40 md:w-full md:max-w-xs transition-colors duration-200 ${
            isSearchActive
              ? "border-white bg-white/10 text-white"
              : "border-white/15 bg-transparent text-white/40 hover:border-white/40 hover:text-white"
          }`}
        >
          <Search size={14} />
          <input
            ref={inputRef}
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            onFocus={onSearchFocus}
            placeholder="Buscar jogo, rival..."
            aria-label="Buscar partidas"
            style={{ outline: "none" }}
            className="bg-transparent outline-none text-sm text-inherit placeholder:text-inherit/60 w-full"
          />
        </div>
      </div>
    </header>
  );
}
