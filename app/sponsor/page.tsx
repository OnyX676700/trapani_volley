"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";

const SPONSORS = ["Sponsor Uno", "Sponsor Due", "Sponsor Tre", "Sponsor Quattro"];

export default function SponsorPage() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <section style={{ padding: "160px 24px 100px", background: "#0d0d0d", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Insieme a noi</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 48 }}>Sponsor & Partner</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {SPONSORS.map((name) => (
              <div key={name} style={{ padding: "24px 36px", background: "#181818", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, fontSize: "1rem", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                {name}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24, fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>Spazio riservato agli sponsor — sostituisci con i loghi reali.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}