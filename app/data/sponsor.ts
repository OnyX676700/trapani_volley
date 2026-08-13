// app/data/sponsor.ts
// Fonte unica per gli sponsor: usata sia dalla home (striscia scorrevole) sia da /sponsor (pagina completa).

export type Sponsor = {
  name: string;
  file: string;
};

export const SPONSOR: Sponsor[] = [
  { name: "Ottica Fodale", file: "/img/sponsor/OtticaFodale.jpg" },
  { name: "Centro di Revisione", file: "/img/sponsor/CentroRevisione.jpg" },
  { name: "DIVIA", file: "/img/sponsor/DIVIA.jpg" },
  { name: "Quelli della Notte", file: "/img/sponsor/QuelliDellaNotte.jpg" },
  { name: "Pain Center", file: "/img/sponsor/PainCenter.jpg" },
  { name: "Alexa Medical", file: "/img/sponsor/AlexaMedical.jpg" },
  { name: "Amici Colori", file: "/img/sponsor/AmicoColori.jpg" },
  { name: "Arte Nuova", file: "/img/sponsor/ArteNuova.jpg" },
  { name: "Canino Rubino", file: "/img/sponsor/CaninoRubino.jpg" },
  { name: "Casale", file: "/img/sponsor/Casale.jpg" },
  { name: "Elettricittà", file: "/img/sponsor/Elettricitta.jpg" },
  { name: "Infase", file: "/img/sponsor/Infase.jpg" },
  { name: "PlaGaFer", file: "/img/sponsor/PlaGaFer.jpg" },
  { name: "Pollina", file: "/img/sponsor/Pollina.jpg" },
  { name: "Unipol", file: "/img/sponsor/Unipol.jpg" },
];