import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import type { Partida } from "../../services/apiService";
import type { Tema } from "../../data/themes";

interface MatchesModalProps {
  partidas: Partida[];
  tema: Tema;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
}

export default function MatchesModal({ partidas, tema, searchValue, onSearchChange, onClose }: MatchesModalProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    searchInputRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[60] flex items-end md:items-center justify-center p-0 md:p-4"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="matches-title" className="bg-[#12151B] w-full md:max-w-4xl rounded-t-2xl md:rounded-xl border border-white/10 max-h-[92dvh] md:max-h-[85vh] flex flex-col">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-white/10">
          <div className="min-w-0 flex-1">
            <div id="matches-title" className="font-display text-lg">Partidas — {tema.nome}</div>
            <div className="text-xs text-white/40 font-mono">
              {partidas.length} partidas · {tema.nome} · ordem cronológica
            </div>
          </div>
          <div
            role="search"
            className="flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white transition-colors hover:border-white/30 focus-within:border-white/40 focus-within:bg-white/10 sm:w-64"
          >
            <Search size={15} className="shrink-0 text-white/40" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar jogo, rival..."
              aria-label="Buscar partidas"
              style={{ outline: "none" }}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-sm text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white rounded"
            aria-label="Fechar"
          >
            Fechar
          </button>
        </div>

        <div className="overflow-auto flex-1" tabIndex={0}>
          <table className="w-full min-w-[680px] text-sm">
            <thead className="sticky top-0 bg-[#12151B] border-b border-white/10">
              <tr className="text-left text-white/40 font-mono text-xs">
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Data</th>
                <th className="px-3 py-2">Competição</th>
                <th className="px-3 py-2">Jogo</th>
                <th className="px-3 py-2 text-center">Gols</th>
                <th className="px-3 py-2 text-center">Assist.</th>
              </tr>
            </thead>
            <tbody>
              {partidas.map((p) => (
                <tr
                  key={p.idx}
                  className="border-b border-white/5 hover:bg-white/[0.03]"
                  style={p.gols > 0 || p.assist > 0 ? { backgroundColor: `${tema.primario}0A` } : {}}
                >
                  <td className="px-3 py-2 font-mono text-white/40">{p.idx}</td>
                  <td className="px-3 py-2 text-white/60 font-mono text-xs">{p.data}</td>
                  <td className="px-3 py-2 text-white/50 text-xs">{p.comp}</td>
                  <td className="px-3 py-2">
                    {p.casa} <span className="text-white/30">{p.placar}</span> {p.fora}
                  </td>
                  <td className="px-3 py-2 text-center font-mono" style={{ color: p.gols > 0 ? tema.primario : "rgba(255,255,255,0.25)" }}>
                    {p.gols}
                  </td>
                  <td className="px-3 py-2 text-center font-mono" style={{ color: p.assist > 0 ? tema.primario : "rgba(255,255,255,0.25)" }}>
                    {p.assist}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
