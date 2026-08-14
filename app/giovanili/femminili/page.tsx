"use client";

// Import dei componenti con alias @ (oppure "../../components/...")
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";

const GIOVANILI_FEMMINILI = [
  {
    id: "u12-f",
    categoria: "Under 12 Femminile",
    text: "Attività promozionale e primo approccio alla pallavolo agonistica per le ragazze più giovani.",
  },
  {
    id: "u13-f",
    categoria: "Under 13 Femminile",
    text: "Sviluppo delle competenze tecniche fondamentali e spirito di squadra.",
  },
  {
    id: "u14-f",
    categoria: "Under 14 Femminile",
    text: "Crescita tattica e partecipazione ai primi campionati giovanili regionali.",
  },
  {
    id: "u15-f",
    categoria: "Under 15 Femminile",
    text: "Consolidamento del gioco di squadra e preparazione atletica specifica.",
  },
  {
    id: "u17-f",
    categoria: "Under 17 Femminile",
    text: "Settore giovanile avanzato volto alla preparazione per le categorie superiori.",
  },
];

export default function GiovaniliFemminiliPage() {
  return (
    <>
      <GlobalStyles />
      <Header />

      <main style={{ minHeight: "80vh" }}>
        <section id="giovanili-femminile" style={{ padding: "100px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            
            {/* Titolo e Sottotitolo */}
            <div style={{ marginBottom: 40, textAlign: "center" }}>
              <p style={{ color: "#6f1d2b", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600, fontSize: "0.85rem", marginBottom: 8 }}>
                Settore Femminile
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#141414" }}>
                Giovanili Femminili 
              </h2>
            </div>

            {/* Griglia delle schede */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
              {GIOVANILI_FEMMINILI.map(({ id, categoria, text }) => (
                <div key={id} style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, padding: "32px 28px" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#6f1d2b", marginBottom: 12 }}>
                    {categoria}
                  </h3>
                  <p style={{ fontSize: "0.98rem", color: "rgba(20,20,20,0.7)", lineHeight: 1.7 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}