//sponsor/page.tsx
"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";

const sponsor = [
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

function SponsorCarousel() {
  // duplichiamo la lista per ottenere il loop infinito senza scatti
  const loop = [...sponsor, ...sponsor];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        padding: "10px 0",
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        className="tv-sponsor-track"
        style={{ display: "flex", gap: 32, width: "max-content" }}
      >
        {loop.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            style={{
              position: "relative",
              width: 380,
              height: 210,
              flexShrink: 0,
              background: "#fff",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 22,
              boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
              transition: "transform 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px) scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <Image
              src={s.file}
              alt={s.name}
              fill
              style={{ objectFit: "contain", padding: 20 }}
              sizes="260px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SponsorPage() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <section style={{ padding: "160px 24px 100px", background: "#0d0d0d", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>
            Insieme a noi
          </span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 48 }}>
            Sponsor & Partner
          </h1>

          <SponsorCarousel />

        </div>
      </section>
      <Footer />
    </>
  );
}