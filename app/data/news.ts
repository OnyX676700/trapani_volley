// app/data/news.ts
// Fonte unica per le notizie: usata sia dalla home (carosello) sia da /news (elenco completo).

export type NewsItem = {
  slug: string;
  featured?: boolean;
  badge?: string;
  date: string;
  title: string;
  text: string;
  img: string;
};

export const NEWS: NewsItem[] = [
  {
    slug: "nuove-maglie-ufficiali",
    featured: true,
    badge: "In evidenza",
    date: "Venerdì 14 Agosto 2026",
    title: "Nuove maglie ufficiali!",
    text: "Il Rosone di Sant’Agostino: un simbolo di Trapani",
    img: "/img/maglia.jpg",
  },
  {
    slug: "allenamento-speciale",
    date: "Venerdì 9 Maggio 2025",
    title: "Allenamento speciale",
    text: "Sessione intensa in preparazione delle prossime sfide di campionato.",
    img: "/img/fumogeno.jpg",
  },
  {
    slug: "destinazione-raggiunta",
    date: "Martedì 6 Maggio 2025",
    title: "Destinazione raggiunta!",
    text: "La squadra festeggia con medaglie al collo e spumante in campo.",
    img: "/img/trofeo.jpg",
  },
];