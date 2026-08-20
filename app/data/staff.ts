// app/data/staff.ts

/* ── Tipo Membro dello Staff ── */
export interface StaffMember {
  nome: string;
  ruolo: string; // ruoli multipli separati da ", "
  file: string;  // percorso immagine
  bio?: string;
}

/* ── Slug univoco per l'URL della pagina staff ── */
export function slugifyStaff(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ── Dati: Staff tecnico ── */
export const STAFF_TECNICO: StaffMember[] = [
  {
    nome: "Piervito Vulpetti",
    ruolo: "Direttore Tecnico, Coach",
    file: "/img/staff/Vulpetti.jpg",
    bio: "Piervito Vulpetti vanta una lunga esperienza nel mondo della pallavolo, maturata in diverse realtà del territorio trapanese sia nel settore senior sia in quello giovanile.\n\nHa iniziato il proprio percorso alla Pro Valderice, proseguendo successivamente con Vado TP e Sicania, dove ha conquistato la promozione in Seconda Divisione.\n\nDal 2008 al 2010 ha guidato l'Ericina Volley, allenando la Prima Divisione e la Serie D femminile. Nel 2011 è approdato all'Erice Entello, società nella quale è rimasto fino al 2025, diventando negli anni un importante punto di riferimento tecnico e umano.\n\nNel corso della sua esperienza all'Entello ha ottenuto diversi importanti risultati, tra cui titoli provinciali giovanili, la promozione in Serie C con la squadra maschile e la vittoria della Prima Divisione femminile. Ha inoltre collaborato a stretto contatto con tecnici come Giuseppe Oddo, per il settore maschile, e Cristina La Commare, per il settore femminile.\n\nSignificativo anche il suo impegno nella promozione e nella crescita del settore giovanile, testimoniato dai titoli provinciali PGS conquistati con la PGS Etoile e con l'Erice Entello.\n\nUn percorso caratterizzato da esperienza, passione e attenzione alla formazione dei giovani, che ha portato Piervito Vulpetti a diventare una figura di riferimento nel panorama pallavolistico del territorio.",
  },
  {
    nome: "Giuseppe Oddo",
    ruolo: "Coach",
    file: "/img/staff/Oddo.jpg",
    bio: "Primo allenatore – Serie D Femminile | Stagione 2026/2027\n\nGiuseppe Oddo, classe 1971, vanta una lunga esperienza nel mondo della pallavolo, prima come atleta e successivamente come allenatore.\n\nDopo una carriera da giocatore di circa vent'anni tra Serie D e Serie C con Pro Valderice e Pallavolo Trapani, ha intrapreso il percorso tecnico maturando importanti esperienze sia nel settore senior sia in quello giovanile.\n\nNel corso della sua carriera da allenatore ha ricoperto il ruolo di secondo allenatore in Serie D e Serie C maschile, ha guidato la selezione provinciale come primo e secondo allenatore e ha conquistato una storica promozione in Serie C con l'Erice Entello.\n\nParticolarmente significativo il suo percorso nel settore giovanile, dove ha ottenuto 10 titoli provinciali nelle categorie Under 15, Under 17 e Under 19, distinguendosi per competenza, serietà e capacità di valorizzare i giovani atleti.\n\nNella stagione 2025/2026 ha guidato la prima squadra della Trapani Volley, conquistando la promozione in Serie D, risultato che ha contribuito a consolidare il progetto tecnico della società.\n\nPer la stagione 2026/2027, Giuseppe Oddo sarà il primo allenatore della Serie D Femminile della Trapani Volley, mettendo la propria esperienza e passione al servizio della squadra e del progetto granata.",
  },
  {
    nome: "Giovanni Schifano",
    ruolo: "Coach",
    file: "/img/staff/Gianno.jpg",
  },
  {
    nome: "Gioacchino Di Bella",
    ruolo: "Assistant Coach",
    file: "/img/staff/DiBella.jpg",
  },
  {
    nome: "Paolo Mangiapane",
    ruolo: "Preparatore atletico",
    file: "/img/staff/Mangiapane.jpg",
    bio: "Percorso costruito sul campo, tra risultati e formazione continua. Doppia laurea in Scienze Motorie: triennale a Perugia e magistrale in Scienze e Tecniche dello Sport (2025). Tripla certificazione ELAV: Sport Performance, Esperto Fitness e Rieducatore Funzionale. Esperienza multi-sport ad alto livello. Un percorso trasversalite: preparazione atletica in calcio, volley e basket, spesso in contemporanea, con squadre di categoria e settori giovanili strutturati. Calcio: allenatore in scuola calcio a Roma; dal settembre 2020, dopo il rientro a Trapani, collaborazioni con squadre di calcio del territorio; dal 2023/24 esperienza nello staff dell'Under 15 nazionale del Trapani Calcio (Serie C). Volley: da dicembre 2022 primo incarico come preparatore all'Ericina Volley (B2); dal 2023/24 anche alla Fenice Volley (Serie C), con promozione e Coppa Sicilia nella stessa stagione; dal 2024/25 in staff al Marsala Volley (Serie B1 e A2), con salvezza raggiunta e riconferma. Basket: dall'estate 2023 con i Trapani Shark, come preparatore della prima squadra e responsabile dell'intero settore giovanile (Under 13–Under 17); stagione 23/24 con vittoria di Supercoppa e campionato di A2."
  },
];