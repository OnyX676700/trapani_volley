// app/data/sponsor.ts
// Fonte unica per gli sponsor: usata sia dalla home (striscia scorrevole) sia da /sponsor (pagina completa).

export type Sponsor = {
  name: string;
  file: string;
  url?: string;
};

export const SPONSOR: Sponsor[] = [
  { name: "Ottica Fodale", file: "/img/sponsor/OtticaFodale.jpg", url: "https://www.otticafodale.com/" },
  { name: "Centro di Revisione", file: "/img/sponsor/CentroRevisione.jpg", url: "https://www.aiutorevisioni.it/" },
  { name: "DIVIA", file: "/img/sponsor/DIVIA.jpg", url: "https://share.google/BYlTysab5rgwt9c06" },
  { name: "Quelli della Notte", file: "/img/sponsor/QuelliDellaNotte.jpg", url: "https://www.quellidellanotte.it" },
  { name: "Pain Center", file: "/img/sponsor/PainCenter.jpg", url: "https://www.paincenterlab.it/" },
  { name: "Alexa Medical", file: "/img/sponsor/AlexaMedical.jpg", url: "https://alexamedicalortopedia.it/" },
  { name: "Amici Colori", file: "/img/sponsor/AmicoColori.jpg", url: "https://www.amicicolori.it" },
  { name: "Arte Nuova", file: "/img/sponsor/ArteNuova.jpg", url: "https://www.artenuova.it" },
  { name: "Canino Rubino", file: "/img/sponsor/CaninoRubino.jpg", url: "https://caninoerubino.it/" },
  { name: "Casale", file: "/img/sponsor/Casale.jpg", url: "https://www.casaleverderame.it/it/" },
  { name: "Elettricittà", file: "/img/sponsor/Elettricitta.jpg", url: "https://www.elettricittatrapani.it/" },
  { name: "Infase", file: "/img/sponsor/Infase.jpg", url: "https://www.infaseimpiantitrapani.it/" },
  { name: "PlaGaFer", file: "/img/sponsor/PlaGaFer.jpg", url: "https://www.plagaferferramenta.it/" },
  { name: "Pollina", file: "/img/sponsor/Pollina.jpg", url: "https://www.pollinauto.it/" },
  { name: "Unipol", file: "/img/sponsor/Unipol.jpg", url: "https://areastrazzera.com/" },
];