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
    file: "/img/staff/Schifano.jpg",
    bio: "Head Coach – Serie D Maschile | Stagione 2026/2027\n\nGiovanni Schifano vanta un percorso sportivo eclettico, che lo ha visto crescere prima nella pallacanestro e nel calcio a 5, prima di approdare definitivamente al mondo della pallavolo.\n\nMuove i primi passi nello sport a 10 anni con la pallacanestro, tra le file di AICS e Rosmini, esperienza che porta avanti fino ai 17 anni. Si dedica poi per qualche stagione al calcio a 5 con la PGS Don Bosco.\n\nNella stagione 2008/2009 arriva l'incontro con la pallavolo, tra i banchi di scuola e i primi campionati PGS. Nel 2018 inizia la sua avventura in Serie D con l'Entello, un percorso da atleta che culmina nella storica promozione in Serie C nella stagione 2021/2022.\n\nNel 2023, al termine dell'ultima stagione da giocatore in Serie C, è costretto ad appendere le scarpette al chiodo per motivi lavorativi. La voglia di restare in campo lo spinge però a intraprendere il percorso da allenatore, coronato anche dal conseguimento della qualifica di Allenatore di Secondo Grado.\n\nI primi passi in panchina arrivano alla Polisportiva Ericina, alla guida di una squadra di Prima Divisione Femminile. Sono proprio le atlete allenate all'Ericina a volerlo con sé anche alla Trapani Volley, dove entra a far parte dello staff tecnico.\n\nPer la stagione 2026/2027, Giovanni Schifano sarà Head Coach della Serie D Maschile della Trapani Volley, coronando un percorso fatto di passione, dedizione e crescita costante.",
  },
    {
    nome: "Gioacchino Di Bella",
    ruolo: "Assistant Coach",
    file: "/img/staff/DiBella.jpg",
    bio: "Gioacchino Di Bella vanta una lunga esperienza nel mondo della pallavolo, iniziata negli anni '80 con la C.C.P. Clambra, dove ha completato il percorso nel settore giovanile fino ad arrivare al debutto in Prima Squadra.\n\nNel corso della sua carriera da giocatore ha vestito le maglie di Volley Paceco, Polisportiva Valderice, Pallavolo Trapani, Fortitudo Buseto ed Entello Volley, disputando diversi campionati di Serie C e Serie D.\n\nIl suo percorso sportivo gli ha permesso di maturare una solida conoscenza tecnica e tattica della pallavolo, oltre a una significativa esperienza sul campo e una profonda cultura sportiva.\n\nPer la stagione 2026/2027 entra a far parte dello staff tecnico del Trapani Volley, ricoprendo il ruolo di Assistant Coach della Prima Squadra Femminile, mettendo a disposizione esperienza, competenza e passione al servizio del gruppo.",
  },
    {
    nome: "Alessio Gatto",
    ruolo: "Assistant Coach",
    file: "/img/staff/AlessioGatto.jpg",
    bio: "La Trapani Volley annuncia con entusiasmo la riconferma di Coach Alessio Gatto!\n\nUn volto ormai parte della nostra famiglia, pronto a proseguire il suo percorso con professionalità, entusiasmo e passione per la pallavolo.\n\nUn legame che si rinnova e che siamo felici di portare avanti anche in questa nuova stagione."
  },
  {
    nome: "Paolo Mangiapane",
    ruolo: "Preparatore atletico",
    file: "/img/staff/PaoloMangiapane.jpg",
    bio: "Percorso costruito sul campo, tra risultati e formazione continua. Doppia laurea in Scienze Motorie: triennale a Perugia e magistrale in Scienze e Tecniche dello Sport (2025). Tripla certificazione ELAV: Sport Performance, Esperto Fitness e Rieducatore Funzionale. Esperienza multi-sport ad alto livello. Un percorso trasversalite: preparazione atletica in calcio, volley e basket, spesso in contemporanea, con squadre di categoria e settori giovanili strutturati. \n\nCalcio: allenatore in scuola calcio a Roma; dal settembre 2020, dopo il rientro a Trapani, collaborazioni con squadre di calcio del territorio; dal 2023/24 esperienza nello staff dell'Under 15 nazionale del Trapani Calcio (Serie C). \n\nVolley: da dicembre 2022 primo incarico come preparatore all'Ericina Volley (B2); dal 2023/24 anche alla Fenice Volley (Serie C), con promozione e Coppa Sicilia nella stessa stagione; dal 2024/25 in staff al Marsala Volley (Serie B1 e A2), con salvezza raggiunta e riconferma. \n\nBasket: dall'estate 2023 con i Trapani Shark, come preparatore della prima squadra e responsabile dell'intero settore giovanile (Under 13–Under 17); stagione 23/24 con vittoria di Supercoppa e campionato di A2."
  },
  {
    nome: "Enza Vario",
    ruolo: "Coach minivolley",
    file: "/img/staff/Vario.jpg",
    bio: "Enza Vario è una coach specializzata nel settore giovanile del volleyball. Ha maturato un'esperienza consolidata nel coaching di giovani atleti, con un approccio orientato alla crescita personale e allo sviluppo tecnico. La sua passione per il volleyball e la sua capacità di motivare i giovani atleti la rendono un elemento chiave dello staff tecnico del Trapani Volley."
  },
  {
    nome: "Lucia Rallo",
    ruolo: "Coach minivolley",
    file: "/img/staff/LuciaRallo.jpg",
  }
];