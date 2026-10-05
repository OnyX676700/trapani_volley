// app/data/sponsor.ts
export type Livello = "diamante" | "platino" | "oro" | "argento" | "bronzo";

export interface Sponsor {
  name: string;
  file: string;
  url?: string;
  livello: Livello;
}

// Main sponsor e collaborazioni non hanno un livello
export type SponsorSenzaLivello = Omit<Sponsor, "livello">;

/* ── Main sponsor, uno per squadra ── */
export const MAIN_SPONSOR: { femminile: SponsorSenzaLivello; maschile: SponsorSenzaLivello } = {
  femminile: { name: "Ottica Fodale", file: "/img/sponsor/OtticaFodale.jpg" },
  maschile: { name: "Cantieri Elewatt", file: "/img/sponsor/CantieriElewatt.jpg" },
};

/* ── Collaborazioni (scambio merce) ── */
export const COLLABORAZIONI: SponsorSenzaLivello[] = [
  { name: "Isla Poke", file: "/img/sponsor/IslaPoke.jpg" },
  { name: "TDS", file: "/img/sponsor/TDS.jpg" },
];

/* ── Sponsor 2026/2027 ── */
export const SPONSOR: Sponsor[] = [
  // Diamante
  { name: "Centro Rev. Auto Romeo V.za", file: "/img/sponsor/CentroRevisione.jpg", livello: "diamante" },
  { name: "Dinos Gym Health e Fitness Club / Radio Azzurra West Sicily di Schifano", file: "/img/sponsor/DinosGym.jpg", livello: "diamante" },

  // Oro
  { name: "Studio Immobiliare Punto Casa", file: "/img/sponsor/PuntoCasa.jpg", livello: "oro" },
  { name: "Frali Srl / Il Gattopardo", file: "/img/sponsor/Gattopardo.jpg", livello: "oro" },
  { name: "Corsini Franchising Srl", file: "/img/sponsor/Corsini.jpg", livello: "oro" },

  // Argento
  { name: "Amico Colori", file: "/img/sponsor/AmicoColori.jpg", livello: "argento" },
  { name: "Erice Servizi / Caffè Drepan", file: "/img/sponsor/DrepanCaffe.jpg", livello: "argento" },
  { name: "Strazzera Sas", file: "/img/sponsor/Unipol.jpg", livello: "argento" },
  { name: "Caito Maria Pia / Frontevilla", file: "/img/sponsor/FronteVilla.jpg", livello: "argento" },
  { name: "Boca Pizzeria", file: "/img/sponsor/Boca.jpg", livello: "argento" },
  { name: "Tuttessenze / La Vie en Rose", file: "/img/sponsor/Tuttessenze.jpg", livello: "argento" },
  { name: "Reale Mutua Assicurazioni", file: "/img/sponsor/RealeMutua.jpg", livello: "argento" },
  { name: "Isotto Coppe", file: "/img/sponsor/IsottoSport.jpg", livello: "argento" },
  { name: "Elettricità", file: "/img/sponsor/Elettricitta.jpg", livello: "argento" },
  { name: "Di Via Srl", file: "/img/sponsor/DIVIA.jpg", livello: "argento" },
  { name: "Automondo", file: "/img/sponsor/Automondo.jpg", livello: "argento" },
  { name: "Lucri Prospetti", file: "/img/sponsor/LucriProspetti.jpg", livello: "argento" },
  { name: "Simone Manno", file: "/img/sponsor/SimoneManno.jpg", livello: "argento" },

  // Bronzo
  { name: "Elite Island", file: "/img/sponsor/EliteIsland.jpg", livello: "bronzo" },
  { name: "Pollina Auto", file: "/img/sponsor/Pollina.jpg", livello: "bronzo" },
  { name: "Aries", file: "/img/sponsor/Aries.jpg", livello: "bronzo" },
  { name: "Caffè Alberti", file: "/img/sponsor/CaffeAlberti.jpg", livello: "bronzo" },
  { name: "Benito Manno", file: "/img/sponsor/BenitoManno.jpg", livello: "bronzo" },
];