// app/data/calendario.ts

export type Squadra = "femminile" | "maschile";

export interface RigaClassifica {
  pos: number;
  team: string;
  g: number;      // giocate
  v: number;      // vinte
  p: number;      // perse
  punti: number;
}

export interface Risultato {
  giornata: number;
  casa: string;
  trasferta: string;
  setCasa: number;
  setTrasferta: number;
  set: string[];  // es. ["25-13", "25-16", "25-12"]
}

export interface ProssimaPartita {
  giornata: number;
  casa: string;
  trasferta: string;
  data: string;   // es. "Sabato 6 Giugno 2026"
  ora: string;    // es. "18:30"
  luogo: string;
}

export interface CalendarioSquadra {
  classifica: RigaClassifica[];
  risultati: Risultato[];
  prossime: ProssimaPartita[];
}

export const CALENDARIO: Record<Squadra, CalendarioSquadra> = {
  femminile: {
    classifica: [
      { pos: 1, team: "Trapani Volley", g: 14, v: 12, p: 2, punti: 34 },
      { pos: 2, team: "Farmacie Rotolo Libertas", g: 14, v: 10, p: 4, punti: 30 },
      { pos: 3, team: "Ericina Volley", g: 14, v: 9, p: 5, punti: 27 },
      { pos: 4, team: "ASD Virtus Favignana", g: 14, v: 7, p: 7, punti: 21 },
      { pos: 5, team: "Pallavolo Marsala", g: 14, v: 5, p: 9, punti: 15 },
      { pos: 6, team: "Volley Castelvetrano", g: 14, v: 2, p: 12, punti: 6 },
    ],
    risultati: [
      { giornata: 14, casa: "Trapani Volley", trasferta: "Farmacie Rotolo Libertas", setCasa: 3, setTrasferta: 0, set: ["25-13", "25-16", "25-12"] },
      { giornata: 13, casa: "ASD Virtus Favignana", trasferta: "Trapani Volley", setCasa: 0, setTrasferta: 3, set: ["15-25", "15-25", "13-25"] },
      { giornata: 12, casa: "Ericina Volley", trasferta: "Trapani Volley", setCasa: 0, setTrasferta: 3, set: ["19-25", "16-25", "25-27"] },
    ],
    prossime: [
      { giornata: 15, casa: "Trapani Volley", trasferta: "Pallavolo Marsala", data: "Sabato 6 Giugno 2026", ora: "18:30", luogo: "Palestra Comunale, Trapani" },
      { giornata: 16, casa: "Volley Castelvetrano", trasferta: "Trapani Volley", data: "Sabato 13 Giugno 2026", ora: "17:00", luogo: "Palasport, Castelvetrano" },
    ],
  },

  // Da compilare con i dati del campionato maschile
  maschile: {
    classifica: [],
    risultati: [],
    prossime: [],
  },
};

/**
 * Punto unico da cui le pagine leggono i dati.
 * Oggi legge i dati statici qui sopra; se in futuro i dati arrivano da un'API
 * basta cambiare solo questa funzione (vedi anche app/api/calendario/route.ts).
 */
export function getCalendario(squadra: Squadra): CalendarioSquadra {
  return CALENDARIO[squadra];
}