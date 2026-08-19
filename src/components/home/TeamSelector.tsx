import { temas, imagensPorTime, type Tema } from "../../data/themes";

interface TeamSelectorProps {
  timeAtivo: string;
  setTimeAtivo: (value: string) => void;
  tema: Tema;
}

export default function TeamSelector({ timeAtivo, setTimeAtivo, tema }: TeamSelectorProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-6">
      <p className="text-xs text-white/40 font-mono mb-3">VER ESTATÍSTICAS POR TIME</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(temas).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setTimeAtivo(key)}
            className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
            style={{
              borderColor: timeAtivo === key ? t.primario : "rgba(255,255,255,0.15)",
              backgroundColor: timeAtivo === key ? t.primario : "transparent",
              color: timeAtivo === key ? t.texto : "rgba(255,255,255,0.6)",
            }}
          >
            {t.nome}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl p-6 border transition-all duration-500" style={{ borderColor: `${tema.primario}55`, backgroundColor: `${tema.primario}14` }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-xl" style={{ color: tema.primario }}>
              {tema.nome}
            </div>
          </div>
          <div
            className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center"
            style={
              timeAtivo === "argentina" || timeAtivo === "carreira completa" || timeAtivo === "barcelona" || timeAtivo === "psg" || timeAtivo === "miami"
                ? {}
                : { backgroundColor: `${tema.secundario}33`, border: `1px solid ${tema.secundario}` }
            }
          >
            <img
              src={imagensPorTime[timeAtivo]}
              alt={`Imagem de ${tema.nome}`}
              className={timeAtivo === "carreira completa" ? "w-full h-full object-cover" : "w-full h-full object-contain p-2"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
