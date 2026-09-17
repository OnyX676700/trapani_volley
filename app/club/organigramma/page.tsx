//org/club/organigramma/page.tsx
"use client";

import Image from "next/image";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";
import Header from "@/app/components/Header";

/* ── Dati: Organigramma, organizzato per livelli gerarchici (piramide) ── */
type Membro = { nome: string; ruolo: string; image?: string };

/*
 * Gerarchia calcata su quella reale di Imoco Volley Conegliano
 * (imocovolley.it/organigramma): Presidente → Vice Presidente → Team
 * Manager → ruoli di comunicazione/social → dirigenti e collaboratori
 * alla base della piramide.
 */
const LIVELLI: Membro[][] = [
  // Livello 1 — vertice
  [{ nome: "Rocco Poma", ruolo: "Presidente", image: "/img/staff/Poma.jpg" }],
  // Livello 2
  [{ nome: "Mimmo Grimaldi", ruolo: "Vicepresidente", image: "/img/staff/Grimaldi.jpg" }],
  // Livello 3
  [{ nome: "Daniela Del Giudice", ruolo: "Team Manager", image: "/img/staff/DelGiudice.jpg" }],
  // Livello 4 — comunicazione/social, come da posizione in Imoco
  [{ nome: "Francesco Oddo", ruolo: "Grafico & Social Media Manager", image: "/img/staff/FrancescoOddo.jpg" }],
  // Livello 5 — base della piramide: dirigenti e collaboratori
  [
    { nome: "Rino Fontana", ruolo: "Dirigente", image: "/img/staff/Rino.jpg" },
    { nome: "Maurizio Virgilio", ruolo: "Dirigente", image: "/img/staff/Virgilio.jpg" },
    { nome: "Santo Vassallo", ruolo: "Dirigente", image: "/img/staff/Vassallo.jpg" },
    { nome: "Ignazio Vario", ruolo: "Collaboratore", image: "/img/staff/IVario.jpg" },
  ],
];

/* Iniziali per il placeholder quando manca la foto */
function iniziali(nome: string) {
  return nome
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Card({ nome, ruolo, image }: Membro) {
  return (
    <div
      style={{
        width: 300,
        background: "#6f1d2b",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(0,0,0,0.2)",
        flexShrink: 0,
      }}
    >
      {/* Intestazione ruolo, come le card Imoco */}
      <div style={{ padding: "24px 16px 18px", textAlign: "center" }}>
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#ffffff",
            display: "inline-block",
            paddingBottom: 10,
            borderBottom: "4px solid #d4af37",
          }}
        >
          {ruolo}
        </span>
      </div>

      {/* Foto */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 4",
          background: "#f0eeed",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={nome}
            fill
            sizes="300px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display',serif",
              fontSize: "3rem",
              fontWeight: 700,
              color: "#8a2236",
              background: "linear-gradient(135deg, #f7f5f4 0%, #ece7e6 100%)",
            }}
          >
            {iniziali(nome)}
          </div>
        )}
      </div>

      {/* Nome */}
      <div
        style={{
          padding: "20px 14px",
          textAlign: "center",
          background: "#111111",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.3,
          }}
        >
          {nome}
        </div>
      </div>
    </div>
  );
}

export default function OrganigrammaPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />

      <section style={{ padding: "140px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Intestazione */}
        <div style={{ marginBottom: 64, textAlign: "center" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a2236",
              display: "block",
              marginBottom: 12,
            }}
          >
            Società
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.5rem,5vw,3.5rem)",
              fontWeight: 700,
              color: "#6f1d2b",
              lineHeight: 1.15,
            }}
          >
            Organigramma
          </h1>
        </div>

        {/* Piramide: un livello sopra l'altro, ogni livello centrato e via via più largo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
          {LIVELLI.map((livello, i) => (
            <div key={i} style={{ position: "relative", width: "100%" }}>
              {/* linea verticale di collegamento tra i livelli */}
              {i > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -48,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 2,
                    height: 48,
                    background: "#d4af37",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 32,
                }}
              >
                {livello.map((membro) => (
                  <Card key={membro.nome} {...membro} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}