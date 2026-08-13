"use client";

import Image from "next/image";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";
import Header from "@/app/components/Header";

/* ── Dati: Staff tecnico ── */
const STAFF_TECNICO = [
  { nome: "Piervito Vulpetti", ruolo: "Direttore Tecnico, Coach", file: "/img/staff/Vulpetti.jpg" },
  { nome: "Andrea Gianno", ruolo: "Coach", file: "/img/staff/Gianno.jpg" },
  { nome: "Giuseppe Oddo", ruolo: "Coach", file: "/img/staff/Oddo.jpg" },
  { nome: "Gioacchino Di Bella", ruolo: "Assistant Coach", file: "/img/staff/DiBella.jpg" },
];

/* ── Staff tecnico ── */
export default function StaffTecnicoPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />

      <section style={{ padding: "140px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>
            Guida Tecnica
          </span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 700, color: "#6f1d2b", lineHeight: 1.15 }}>
            Staff Tecnico
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {STAFF_TECNICO.map(({ ruolo, nome, file }) => (
            <div
              key={nome}
              style={{
                background: "#f7f5f4",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 20,
                padding: "28px",
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}
            >
              {/* Foto dello Staff */}
              <div style={{ position: "relative", width: 80, height: 80, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#e0e0e0" }}>
                <Image src={file} alt={nome} fill style={{ objectFit: "cover" }} />
              </div>

              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#111111", marginBottom: 8 }}>
                  {nome}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ruolo.split(", ").map((r) => (
                    <span
                      key={r}
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#8a2236",
                        background: "rgba(255,118,118,0.12)",
                        padding: "4px 10px",
                        borderRadius: 6,
                      }}
                    >
                      {r}
                    </span>
                  ))}
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