// app/data/sponsor.ts
export type Livello = "diamante" | "platino" | "oro" | "argento" | "bronzo";

export interface Sponsor {
  name: string;
  file: string;
  url?: string;
  livello: Livello;
}

export const SPONSOR: Sponsor[] = [
  { name: "Studio Immobiliare Punto Casa", file: "/img/sponsor/PuntoCasa.jpg", livello: "oro" },
  { name: "Elite Island", file: "/img/sponsor/EliteIsland.jpg", livello: "bronzo" },
  { name: "Centro Rev. Auto Romeo V.za", file: "/img/sponsor/CentroRevisione.jpg", livello: "diamante" },
  { name: "Dinos Gym Health e Fitness Club / Radio Azzurra West Sicily di Schifano", file: "/img/sponsor/DinosGym.jpg", livello: "platino" },
  { name: "Caito Maria Pia / Frontevilla", file: "/img/sponsor/FronteVilla.jpg", livello: "argento" },
  { name: "Boca Pizzeria", file: "/img/sponsor/Boca.jpg", livello: "argento" },
  { name: "Tuttessenze / La Vie en Rose", file: "/img/sponsor/Tuttessenze.jpg", livello: "argento" },
  { name: "Ottica Fodale", file: "/img/sponsor/OtticaFodale.jpg", livello: "oro" },
  { name: "Amico Colori", file: "/img/sponsor/AmicoColori.jpg", livello: "argento" },
  { name: "Canino e Rubino", file: "/img/sponsor/CaninoRubino.jpg", livello: "argento" },
  { name: "Strazzera", file: "/img/sponsor/Unipol.jpg", livello: "argento" },
  { name: "Pollina", file: "/img/sponsor/Pollina.jpg", livello: "argento" },
  { name: "Drepan Caffè", file: "/img/sponsor/DrepanCaffe.jpg", livello: "argento" },
];