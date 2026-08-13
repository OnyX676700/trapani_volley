// app/data/video.ts
// Video "La TV": interviste, backstage e highlights dal canale YouTube del club.
// Sostituisci youtubeId con l'ID reale del video (la parte dopo "v=" nell'URL di YouTube).

export type VideoItem = {
  youtubeId: string;
  title: string;
  tag: string;
};

export const VIDEO: VideoItem[] = [
  { youtubeId: "a3Uo-53pIc4", title: "Trapani Volley nella storia: è promozione in Serie D", tag: "Interviste" },
  { youtubeId: "-y90iT3XUzg", title: "Trapani Volley. È promozione in Serie D", tag: "Interviste" },
  { youtubeId: "9B3PccPgigo", title: "Trapani Volley e la finale per la promozione in Serie D", tag: "Highlights" },
  { youtubeId: "VgxXPbncO_k", title: "Focus sulla Trapani Volley: dalla prima squadra al settore giovanile", tag: "Backstage" },
];