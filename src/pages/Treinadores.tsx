import { useState } from "react";
import { Link } from "react-router-dom";
import { temas } from "../data/themes";
import { ChevronLeft, Trophy } from "lucide-react";

import alejandroImage from "../assets/times/alejandro.png";
import alfioImage from "../assets/times/alflo.png";
import bauzaImage from "../assets/times/edgardo.png";
import christopheImage from "../assets/times/galtler.png";
import ernestoImage from "../assets/times/ernesto.png";
import frankImage from "../assets/times/Frank.webp";
import geraldoImage from "../assets/times/geraldo.webp";
import guardiolaImage from "../assets/times/guardiola.webp";
import hoyosImage from "../assets/times/hoyos.png";
import javierImage from "../assets/times/Javier_Mascherano.webp";
import joseImage from "../assets/times/jose.png";
import koemanImage from "../assets/times/koeman.webp";
import luisImage from "../assets/times/luishenrique.webp";
import maradonaImage from "../assets/times/maradona.png";
import mauricioImage from "../assets/times/mauricio.png";
import quiqueImage from "../assets/times/Quique.png";
import sampaoliImage from "../assets/times/sampaoli.png";
import scaloniImage from "../assets/times/scaloni.png";
import sergioImage from "../assets/times/sergio.png";
import titoImage from "../assets/times/tito.webp";
import { treinadores, type Treinador } from "../data/TreinadoresData";

const fotosPorTreinador: Record<string, string> = {
  "Frank Rijkaard": frankImage,
  "Pep Guardiola": guardiolaImage,
  "Tito Vilanova": titoImage,
  "Gerardo Martino": geraldoImage,
  "Luis Enrique": luisImage,
  "Ernesto Valverde": ernestoImage,
  "Quique Setién": quiqueImage,
  "Ronald Koeman": koemanImage,
  "Mauricio Pochettino": mauricioImage,
  "Christophe Galtier": christopheImage,
  "Javier Mascherano": javierImage,
  "Guillermo Hoyos": hoyosImage,
  "José Pekerman": joseImage,
  "Alfio Basile": alfioImage,
  "Diego Maradona": maradonaImage,
  "Sergio Batista": sergioImage,
  "Alejandro Sabella": alejandroImage,
  "Edgardo Bauza": bauzaImage,
  "Jorge Sampaoli": sampaoliImage,
  "Lionel Scaloni": scaloniImage,
};



function agruparPorTime(lista: Treinador[]) {
  const mapa = new Map<string, { time: string; cor: string; treinadores: Treinador[] }>();
  lista.forEach((t) => {
    if (!mapa.has(t.time)) {
      mapa.set(t.time, { time: t.time, cor: t.cor, treinadores: [] });
    }
    mapa.get(t.time)!.treinadores.push(t);
  });
  return Array.from(mapa.values());
}

export default function Treinadores() {
  const [timeAtivo, setTimeAtivo] = useState<string>("todos");

  const grupos = agruparPorTime(treinadores);
  const times = ["todos", ...grupos.map((g) => g.time)];

  const grupoVisiveis =
    timeAtivo === "todos" ? grupos : grupos.filter((g) => g.time === timeAtivo);

  return (
    <div className="min-h-screen text-[#EDEAE3]" style={{ backgroundColor: "#0A0C10" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Archivo Black', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        body, div { font-family: 'Public Sans', sans-serif; }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Link to="/" className="flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6">
          <ChevronLeft size={16} /> voltar pra home
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <p className="font-mono text-xs tracking-[0.2em]" style={{ color: "#F5A623" }}>
            NÚMEROS SUJEITOS A ATUALIZAÇÃO
          </p>
        </div>
        <h1 className="font-display text-3xl md:text-4xl mb-3">Estatísticas por Treinador</h1>
        <p className="text-white/50 text-sm max-w-lg mb-8 leading-relaxed">
          O desempenho de Messi sob o comando de cada treinador que já dirigiu ele — clube e seleção.
        </p>

        
        <div className="flex flex-wrap gap-2 mb-8">
          {times.map((time) => {
            const corDoTime =
              time === "todos" ? temas["carreira completa"].primario : grupos.find((g) => g.time === time)?.cor ?? "#F5A623";
            return (
              <button
                key={time}
                onClick={() => setTimeAtivo(time)}
                className="px-4 py-2 rounded-full text-sm border transition-colors"
                style={
                  timeAtivo === time
                    ? { backgroundColor: corDoTime, borderColor: corDoTime, color: time === "todos" ? temas["carreira completa"].texto : "#050608" }
                    : { borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }
                }
              >
                {time === "todos" ? "Todos os times" : time}
              </button>
            );
          })}
        </div>

        
        <div className="space-y-10">
          {grupoVisiveis.map((grupo) => (
            <div key={grupo.time}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: grupo.cor }} />
                <h2 className="font-display text-xl">{grupo.time}</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {grupo.treinadores.map((t) => (
                  <div
                    key={`${t.time}-${t.nome}-${t.periodo}`}
                    className="rounded-2xl border border-white/10 bg-[#12151B] p-5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {fotosPorTreinador[t.nome] ? (
                        <img
                          src={fotosPorTreinador[t.nome]}
                          alt={t.nome}
                          className="w-14 h-14 rounded-full object-cover shrink-0 border border-white/10"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg shrink-0"
                          style={{ backgroundColor: `${t.cor}33`, color: t.cor }}
                        >
                          {t.nome
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                      <div>
                        <div className="font-display text-lg leading-tight">{t.nome}</div>
                        <div className="text-xs text-white/40 font-mono mt-0.5">{t.periodo}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 min-[380px]:grid-cols-4 gap-2 text-center">
                      <div className="rounded-xl bg-white/5 p-2.5">
                        <div className="text-[10px] uppercase text-white/40">jogos</div>
                        <div className="mt-1 font-semibold text-sm">{t.jogos}</div>
                      </div>
                      <div className="rounded-xl bg-white/5 p-2.5">
                        <div className="text-[10px] uppercase text-white/40">gols</div>
                        <div className="mt-1 font-semibold text-sm" style={{ color: "#F5A623" }}>
                          {t.gols}
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/5 p-2.5">
                        <div className="text-[10px] uppercase text-white/40">assist</div>
                        <div className="mt-1 font-semibold text-sm" style={{ color: "#F5A623" }}>
                          {t.assist}
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/5 p-2.5">
                        <div className="text-[10px] uppercase text-white/40 flex items-center justify-center gap-1">
                          <Trophy size={10} /> tít.
                        </div>
                        <div className="mt-1 font-semibold text-sm">{t.titulos}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
