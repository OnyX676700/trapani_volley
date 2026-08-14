"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";
import { AnimCard } from "@/app/lib/hooks";

const GIOVANILI_MASCHILI = [
  {
    id: "u17-m",
    categoria: "Under 17 Maschile",
    text: "Percorso di formazione tecnica, tattica e atletica dedicato al settore maschile Under 17.",
  },
];

export default function GiovaniliMaschiliPage() {
  return (
    <>
      <GlobalStyles />
      <Header />

      <main style={{ minHeight: "80vh" }}>
        <section id="giovanili-maschile" style={{ padding: "100px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            
            {/* Titolo e Sottotitolo */}
            <div style={{ marginBottom: 40, textAlign: "center" }}>
              <p style={{ color: "#6f1d2b", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600, fontSize: "0.85rem", marginBottom: 8 }}>
                Settore Maschile
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#141414" }}>
                Giovanili Maschili 
              </h2>
            </div>

            {/* Griglia delle schede */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
              {GIOVANILI_MASCHILI.map(({ id, categoria, text }, i) => (
                <AnimCard key={id} delay={i * 0.1}>
                  <div style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, padding: "32px 28px" }}>
                    {/* 👇 Corretto: fontWeight: 700 */}
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#6f1d2b", marginBottom: 12 }}>
                      {categoria}
                    </h3>
                    <p style={{ fontSize: "0.98rem", color: "rgba(20,20,20,0.7)", lineHeight: 1.7 }}>
                      {text}
                    </p>
                  </div>
                </AnimCard>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}