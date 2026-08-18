// app/data/roster.ts

/* ── Tipo Atleta (Stile Serie A / Imoco) ── */
export interface Athlete {
  number?: string | number;
  name: string;    // Nome
  surname: string; // Cognome
  role: string;    // Ruolo (es. Schiacciatrice, Libero, Palleggiatrice)
  image?: string;
}

/* ── Ordine di visualizzazione dei ruoli (usato nella pagina roster) ── */
export const ROLE_ORDER = ["Palleggiatrice", "Schiacciatrice", "Centrale", "Opposto", "Libero"];

/* ── Dati: Roster femminile/maschile ──
   Modifica QUI il ruolo (o qualsiasi altro dato) di una giocatrice:
   si aggiornerà automaticamente sia in home che nella pagina Roster. */
export const ROSTER: { stagione: string; femminile: Athlete[]; maschile: Athlete[] } = {
  stagione: "2026/2027",
  femminile: [
    { number: "12", name: "Daniela", surname: "Inglese", role: "Palleggiatrice", image: "/img/rosterF/Inglese.jpg" },
    { number: "19", name: "Chiara", surname: "Grimaldi", role: "Libero", image: "/img/rosterF/GrimaldiC.jpg" },
    { number: "23", name: "Arianna", surname: "La Vecchia", role: "Schiacciatrice", image: "/img/rosterF/LaVecchia.jpg" },
    { number: "7", name: "Federica", surname: "Barraco", role: "Libero", image: "/img/rosterF/Barraco.jpg" },
    { number: "16", name: "Giulia", surname: "Cusimano", role: "Opposto", image: "" },
    { number: "6", name: "Greta", surname: "Grimaudo", role: "Schiacciatrice", image: "" },
    { number: "1", name: "Ilenia", surname: "Montalto", role: "Centrale", image: "/img/rosterF/Montalto.jpg" },
    { number: "11", name: "Maria", surname: "Oddo", role: "Opposto", image: "" },
    { number: "14", name: "Sabrina", surname: "Lombardo", role: "Schiacciatrice", image: "/img/rosterF/LombardoS.jpg" },
    { number: "5", name: "Valentina", surname: "Goretti", role: "Centrale", image: "/img/rosterF/Goretti.jpg" },
    { number: "11", name: "Alessandra", surname: "Frazzitta", role: "Centrale", image: "" },
    { number: "12", name: "Claudia", surname: "Morghese", role: "Palleggiatrice", image: "" },
    { number: "13", name: "Deborah", surname: "Dell'Utri", role: "In attesa di ruolo", image: "" },
    { number: "14", name: "Rossella", surname: "Fabiano", role: "Centrale", image: "" },
    { number: "10", name: "Michela", surname: "Mazzola", role: "Schiacciatrice", image: "/img/rosterF/Mazzola.jpg" },
  ],
  maschile: [],
};