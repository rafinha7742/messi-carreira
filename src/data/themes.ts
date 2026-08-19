import escudoArgentina from "../assets/times/argentina.png";
import escudoBarcelona from "../assets/times/barcelona.png";
import escudoPSG from "../assets/times/psg.png";
import escudoInterMiami from "../assets/times/intermiami.png";
import lionelMessi from "../assets/times/lionelmessi.png";

export interface Tema {
  nome: string;
  primario: string;
  secundario: string;
  texto: string;
}

export const temas: Record<string, Tema> = {
  "carreira completa": { nome: "Carreira Completa", primario: "#EDEAE3", secundario: "#0A0C10", texto: "#0A0C10" },
  argentina: { nome: "Argentina", primario: "#6CACE4", secundario: "#F5A623", texto: "#0A0C10" },
  barcelona: { nome: "FC Barcelona", primario: "#A50044", secundario: "#004D98", texto: "#0A0C10" },
  psg: { nome: "Paris Saint-Germain", primario: "#004170", secundario: "#DA291C", texto: "#0A0C10" },
  miami: { nome: "Inter Miami CF", primario: "#F7B5CD", secundario: "#231F20", texto: "#0A0C10" },
};

export const imagensPorTime: Record<string, string> = {
  argentina: escudoArgentina,
  "carreira completa": lionelMessi,
  barcelona: escudoBarcelona,
  psg: escudoPSG,
  miami: escudoInterMiami,
};
