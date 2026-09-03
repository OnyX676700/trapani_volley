//org/club/organigramma/page.tsx
"use client";

import Image from "next/image";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";
import Header from "@/app/components/Header";

/* ── Dati: Organigramma ── */
const ORGANIGRAMMA = [
  { nome: "Rocco Poma", ruolo: "Presidente", image: "/img/staff/Poma.jpg" },
  { nome: "Mimmo Grimaldi", ruolo: "Vicepresidente", image: "/img/staff/Grimaldi.jpg" },
  { nome: "Daniela Del Giudice", ruolo: "Team Manager", image: "/img/staff/DelGiudice.jpg" },
  { nome: "Rino Fontana", ruolo: "Dirigente", image: "" },
  { nome: "Maurizio Virgilio", ruolo: "Dirigente", image: "/img/staff/Virgilio.jpg" },
  { nome: "Ignazio Vario", ruolo: "Collaboratore", image: "/img/staff/IVario.jpg" },
  { nome: "Santo Vassallo", ruolo: "Dirigente", image: "/img/staff/Vassallo.jpg" },
  { nome: "Francesco Oddo", ruolo: "Grafico & Social Media Manager", image: "" },
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

export default function OrganigrammaPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />

      <section style={{ padding: "140px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Intestazione */}
        <div style={{ marginBottom: 56, textAlign: "center" }}>
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

        {/* Griglia membri */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 32,
          }}
        >
          {ORGANIGRAMMA.map(({ ruolo, nome, image }) => (
            <div
              key={nome}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Foto (formato ritratto, come Imoco) */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#f0eeed",
                  marginBottom: 18,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
                }}
              >
                {image ? (
                  <Image
                    src={image}
                    alt={nome}
                    fill
                    sizes="(max-width: 768px) 45vw, 220px"
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
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      color: "#8a2236",
                      background:
                        "linear-gradient(135deg, #f7f5f4 0%, #ece7e6 100%)",
                    }}
                  >
                    {iniziali(nome)}
                  </div>
                )}
              </div>

              {/* Ruolo */}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#8a2236",
                  marginBottom: 6,
                }}
              >
                {ruolo}
              </span>

              {/* Nome */}
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#111111",
                  lineHeight: 1.3,
                }}
              >
                {nome}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}