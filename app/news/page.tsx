"use client";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";

const NEWS = [
  { featured: true, badge: "In evidenza", date: "Domenica 11 Maggio 2025", title: "Destinazione raggiunta! 🏆", text: "La squadra festeggia con medaglie al collo e spumante in campo.", img: "/img/spumante.jpg" },
  { featured: false, date: "Venerdì 9 Maggio 2025", title: "Allenamento speciale", text: "Sessione intensa in preparazione delle prossime sfide di campionato.", img: "/img/fumogeno.jpg" },
  { featured: false, date: "Martedì 6 Maggio 2025", title: "Nuove maglie ufficiali", text: "Presentate le nuove divise per la stagione in corso.", img: "/img/trofeo.jpg" },
];

export default function NewsPage() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <section style={{ padding: "160px 24px 100px", background: "#111", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Aggiornamenti</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 48 }}>Ultime notizie</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {NEWS.map(({ featured, badge, date, title, text, img }) => (
              <article key={title} style={{ background: featured ? "linear-gradient(135deg,#1a0e10 0%,#181818 100%)" : "#181818", border: `1px solid ${featured ? "rgba(111,29,43,0.35)" : "rgba(255,255,255,0.07)"}`, borderRadius: 20, overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: featured ? "16/10" : "16/9" }}>
                  <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />
                  {badge && <span style={{ position: "absolute", top: 16, left: 16, background: "#6f1d2b", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 12px", borderRadius: 50 }}>{badge}</span>}
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginBottom: 10 }}>{date}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: featured ? "1.45rem" : "1.15rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.75 }}>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}