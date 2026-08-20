// app/data/roster.ts

/* ── Tipo Atleta (Stile Serie A / Imoco) ── */
export interface CareerStint {
  period: string;    // es. "2025–2026"
  team: string;      // es. "Trapani Volley"
  category?: string; // es. "Promozione in Serie D"
}

export interface Athlete {
  number?: string | number;
  name: string;    // Nome
  surname: string; // Cognome
  role: string;    // Ruolo (es. Schiacciatrice, Libero, Palleggiatrice)
  image?: string;

  // ── Dati per la pagina di dettaglio ──
  nationality?: string;     // es. "Italia"
  nationalityCode?: string; // es. "ita"
  birthplace?: string;      // es. "Erice (TP)"
  birthday?: string;        // es. "20/08/1999"
  height?: string | number; // in cm, es. 178
  bio?: string;
  palmares?: string[];
  carriera?: CareerStint[];
}

/* ── Slug univoco per l'URL della pagina giocatrice ── */
export function slugify(athlete: Pick<Athlete, "name" | "surname">): string {
  return `${athlete.name}-${athlete.surname}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ── Ordine di visualizzazione dei ruoli (usato nella pagina roster) ── */
export const ROLE_ORDER = ["Palleggiatrice", "Schiacciatrice", "Centrale", "Opposto", "Libero"];

/* ── Dati: Roster femminile/maschile ── */
export const ROSTER: { stagione: string; femminile: Athlete[]; maschile: Athlete[] } = {
  stagione: "2026/2027",
  femminile: [
    {
      number: "12",
      name: "Daniela",
      surname: "Inglese",
      role: "Palleggiatrice",
      image: "/img/rosterF/Inglese.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "16/07/1986",
      height: 167,
      palmares: ["2025 CAMPIONATO REGIONALE", "2024 COPPA SICILIA"],
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2024–2025", team: "Entello Volley", category: "Serie C — Playoff B2" },
        { period: "2023–2024", team: "Fenice Volley", category: "Serie C — Promozione in B2" },
        { period: "2022–2023", team: "Inattiva" },
        { period: "2019–2022", team: "Polisportiva Ericina", category: "Serie C — Playoff B2 (2021)" },
        { period: "2018–2019", team: "Polisportiva Ericina", category: "Serie D" },
        { period: "2017–2018", team: "Inattiva" },
        { period: "2016–2017", team: "Elimos Trapani", category: "Serie C" },
        { period: "2015–2016", team: "Sicania Volley", category: "Serie C" },
        { period: "2014–2015", team: "Sicania Volley", category: "Serie D" },
        { period: "2013–2014", team: "Pallavolo Marsala", category: "Serie B1 — Playoff A2" },
        { period: "2012–2013", team: "Sicania Volley", category: "Serie C" },
        { period: "2011–2012", team: "AST Latina", category: "Serie B1" },
        { period: "2010–2011", team: "Rota Volley Mercato San Severino", category: "Serie B1 — Playoff A2" },
        { period: "2009–2010", team: "Engeco Volley Lamezia", category: "Serie B1" },
        { period: "2007–2009", team: "Sicania Volley", category: "Serie B2" },
        { period: "2006–2007", team: "Sicania Volley", category: "Serie B1" },
        { period: "2003–2006", team: "Sicania Volley", category: "Serie B2 — Promozione in B1 (2006)" },
        { period: "2002–2003", team: "Sicania Volley", category: "Serie C — Promozione in B2" },
        { period: "1999–2002", team: "Polisportiva Ericina", category: "Giovanili e Serie C" },
      ],
    },
    {
      number: "3",
      name: "Chiara",
      surname: "Grimaldi",
      role: "Libero",
      image: "/img/rosterF/GrimaldiC.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "23/03/2006",
      height: 170,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2024–2025", team: "Serie C", category: "Libero" },
        { period: "2023–2024", team: "Serie C", category: "Libero — Promozione in Serie B2" },
        { period: "2021–2022", team: "Rappresentativa provinciale", category: "Convocata per due anni consecutivi" },
        { period: "2023", team: "U.S. Volley Palermo", category: "Under 18 — Libero" },
        { period: "2020", team: "U.S. Volley Palermo", category: "Under 14 — Schiacciatrice" },
        { period: "2021", team: "Erice Entello", category: "Titolo regionale Under 17" },
        { period: "2017–2023", team: "Erice Entello", category: "Titoli provinciali Under 13, Under 14, Under 17 e Under 19" },
        { period: "2017–2023", team: "Erice Entello", category: "Settore giovanile — Schiacciatrice" },
        { period: "2016–2017", team: "A.S. Volley A. Rosmini", category: "Titolo provinciale Under 12" },
        { period: "2013–2017", team: "A.S. Volley A. Rosmini", category: "Settore giovanile — Schiacciatrice" },
      ],
    },
    {
      number: "23",
      name: "Arianna",
      surname: "La Vecchia",
      role: "Schiacciatrice",
      image: "/img/rosterF/LaVecchia.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "11/08/1995",
      height: 169,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2024–2025", team: "Fortis Trapani", category: "Prima Divisione" },
        { period: "2020–2023", team: "Erice Entello", category: "Serie C" },
        { period: "2017–2019", team: "Ericina Volley", category: "Serie D — Promozione in Serie C" },
        { period: "2015–2017", team: "Progetto Volley Marsala", category: "Serie D — Promozione in Serie C" },
        { period: "2014–2015", team: "Sicania Volley", category: "Serie C" },
        { period: "2013–2014", team: "Erice Entello", category: "Serie D" },
        { period: "2002–2013", team: "Erice Entello", category: "Settore giovanile e Prima Divisione" },
      ],
    },
    {
      number: "17",
      name: "Federica",
      surname: "Barraco",
      role: "Libero",
      image: "/img/rosterF/Barraco.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "04/05/1996",
      height: 167,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2024–2025", team: "Real Indipendent", category: "Prima Divisione" },
        { period: "2023–2024", team: "Polisportiva Ericina", category: "Prima Divisione" },
        { period: "2018–2022", team: "Real Indipendent", category: "Campionato PGS — Ex dirigente" },
        { period: "2002–2009", team: "Polisportiva Valderice", category: "Settore giovanile" },
      ],
    },
    {
      number: "7",
      name: "Giulia",
      surname: "Cusimano",
      role: "Opposto",
      image: "",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "26/06/2003",
      height: 175,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Prima Divisione — Promozione in Serie D" },
        { period: "2024–2025", team: "Entello", category: "Serie C" },
        { period: "2020–2021", team: "Ericina", category: "Serie C" },
        { period: "2019–2020", team: "Ericina", category: "Serie C" },
        { period: "2018–2019", team: "Marsala", category: "Serie C — Giovanili con Castelvetrano" },
        { period: "2017–2018", team: "Marsala", category: "Serie D — Coastcup Beach Volley, campione provinciale U14 con Progetto Volley Marsala-Entello" },
        { period: "2016–2017", team: "Marsala Volley", category: "Serie D — Partecipazione alla rappresentativa territoriale (Trofeo dei Territori)" },
        { period: "2014–2016", team: "Marsala Volley", category: "Settore giovanile (A2 con allenamenti insieme) — Titoli provinciali Under 12, Under 13, Under 14" },
      ],
    },
    {
      number: "8",
      name: "Greta",
      surname: "Grimaudo",
      role: "Schiacciatrice",
      image: "",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "18/03/1999",
      height: 167,
      carriera: [
        { period: "2023–2025", team: "Capacense di Capaci", category: "Serie D" },
        { period: "2023", team: "Volley Volla di Napoli", category: "Serie C" },
        { period: "2016–2017", team: "Ericentello e Progetto Volley" },
        { period: "2015–2016", team: "Sikania", category: "Serie C" },
        { period: "2007", team: "Centro Antonio Rosmini di Erice Casa Santa", category: "Inizio del percorso pallavolistico" },
      ],
    },
    {
      number: "1",
      name: "Ilenia",
      surname: "Montalto",
      role: "Centrale",
      image: "/img/rosterF/Montalto.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "27/08/1996",
      height: 176,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2024–2025", team: "Fortis", category: "Prima Divisione" },
        { period: "2015–2024", team: "Inattiva", category: "Trasferimento fuori sede per studio e lavoro" },
        { period: "2014–2015", team: "Erice Entello", category: "Serie D" },
        { period: "2013–2014", team: "Erice Entello", category: "Prima Divisione — Promozione in Serie D" },
        { period: "2012–2013", team: "Progetto Volley Marsala", category: "Serie C e Settore giovanile — Campione regionale e Nazionali di Gorizia" },
        { period: "2011–2012", team: "Polisportiva Ericina", category: "Serie C" },
        { period: "2010–2011", team: "Polisportiva Ericina", category: "Serie D — Promozione in Serie C" },
      ],
    },
    { number: "11", name: "Maria", surname: "Oddo", role: "Opposto", image: "" },
    {
      number: "14",
      name: "Sabrina",
      surname: "Lombardo",
      role: "Schiacciatrice",
      image: "/img/rosterF/LombardoS.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "20/08/1999",
      height: 163,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2024–2025", team: "Fortis", category: "Prima Divisione" },
        { period: "2014–2024", team: "Inattiva" },
        { period: "2005–2014", team: "Rosmini", category: "Settore giovanile" },
      ],
    },
    {
      number: "5",
      name: "Valentina",
      surname: "Goretti",
      role: "Centrale",
      image: "/img/rosterF/Goretti.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "01/11/1987",
      height: 168,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2024–2025", team: "Real Independent Volley", category: "Allenatrice Minivolley, Under 12/13 e Prima Divisione" },
        { period: "2022–2023", team: "Polisportiva Ericina", category: "Prima Divisione" },
        { period: "2017–2019", team: "Real Independent Volley", category: "Campionato PGS — Socia" },
        { period: "2010", team: "Entello", category: "Serie C" },
        { period: "2005–2006", team: "Polisportiva Ericina", category: "Serie C" },
        { period: "2003–2004", team: "Polisportiva Ericina", category: "Serie D" },
        { period: "1999–2002", team: "Polisportiva Ericina", category: "Serie C" },
        { period: "1995–1998", team: "Polisportiva Ericina", category: "Settore giovanile" },
      ],
    },
    { number: "13", name: "Alessandra", surname: "Frazzitta", role: "Centrale", image: "" },
    { number: "78", name: "Claudia", surname: "Morghese", role: "Palleggiatrice", image: "" },
    { number: "13", name: "Deborah", surname: "Dell'Utri", role: "In attesa di ruolo", image: "" },
    { number: "4", name: "Rossella", surname: "Fabiano", role: "Centrale", image: "" },
    {
      number: "10",
      name: "Michela",
      surname: "Mazzola",
      role: "Schiacciatrice",
      image: "/img/rosterF/Mazzola.jpg",
      nationality: "Italia",
      nationalityCode: "ita",
      birthplace: "Erice (TP)",
      birthday: "03/03/2003",
      height: 170,
      carriera: [
        { period: "2025–2026", team: "Trapani Volley", category: "Promozione in Serie D" },
        { period: "2023–2025", team: "Erice Entello", category: "Serie C e Serie D" },
        { period: "2022–2023", team: "Progetto Volley Marsala", category: "Serie C/D — In prestito" },
        { period: "2020–2022", team: "Erice Entello", category: "Serie C e Serie D" },
        { period: "2019–2020", team: "Erice Entello", category: "Under 18, Prima Divisione e Serie D" },
      ],
    },
  ],
  maschile: [],
};