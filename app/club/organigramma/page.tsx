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
  { nome: "Enza Vario", ruolo: "Collaboratrice", image: "/img/staff/Vario.jpg" },
  { nome: "Ignazio Vario", ruolo: "Collaboratore", image: "/img/staff/IVario.jpg" },
  { nome: "Santo Vassallo", ruolo: "Collaboratore", image: "/img/staff/Vassallo.jpg" },
  { nome: "Francesco Oddo", ruolo: "Grafico & Social Media Manager", image: "" },

  
  
  
  
  
  
];

export default function OrganigrammaPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />

      <section style={{ padding: "140px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>
            Società
          </span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 700, color: "#6f1d2b", lineHeight: 1.15 }}>
            Organigramma
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {ORGANIGRAMMA.map(({ ruolo, nome, image }) => (
            <div
              key={nome} /* Usa 'nome' come key per evitare duplicati */
              style={{
                background: "#f7f5f4",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 20,
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Foto Membro */}
              <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#e0e0e0" }}>
                <Image src={image} alt={nome} fill style={{ objectFit: "cover" }} />
              </div>

              <div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#ff7676", display: "block", marginBottom: 4 }}>
                  {ruolo}
                </span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#111111" }}>
                  {nome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}