"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";
import NewsCarousel from "./components/NewsCarousel";
import SponsorMarquee from "./components/SponsorMarquee";
import TvSection from "./components/TvSection";

/* ── Tipo Atleta (Stile Serie A / Imoco) ── */
interface Athlete {
  number?: string | number;
  name: string;        // Nome
  surname: string;     // Cognome
  role: string;        // Ruolo (es. Schiacciatrice, Libero, Palleggiatrice)
  image?: string;
}

/* ── Dati: Roster femminile/maschile ── */
const ROSTER: { stagione: string; femminile: Athlete[]; maschile: Athlete[] } = {
  stagione: "2026/2027",
  femminile: [
    { number: "1", name: "Daniela", surname: "Inglese", role: "Palleggiatrice", image: "/img/rosterF/Inglese.jpg" },
    { number: "2", name: "Chiara", surname: "Grimaldi", role: "Libero", image: "/img/rosterF/GrimaldiC.jpg" },
    { number: "3", name: "Arianna", surname: "La Vecchia", role: "Schiacciatrice", image: "/img/rosterF/LaVecchia.jpg" },
    { number: "4", name: "Federica", surname: "Barraco", role: "Schiacciatrice", image: "/img/rosterF/Barraco.jpg" },
    { number: "5", name: "Giulia", surname: "Cusimano", role: "Opposto", image: "" },
    { number: "6", name: "Greta", surname: "Grimaudo", role: "", image: "" },
    { number: "7", name: "Ilenia", surname: "Montalto", role: "Centrale", image: "/img/rosterF/Montalto.jpg" },
    { number: "8", name: "Maria", surname: "Oddo", role: "Opposto", image: "" },
    { number: "9", name: "Sabrina", surname: "Lombardo", role: "Schiacciatrice", image: "/img/rosterF/LombardoS.jpg" },
    { number: "10", name: "Valentina", surname: "Goretti", role: "Centrale", image: "/img/rosterF/Goretti.jpg" },
    { number: "11", name: "Alessandra", surname: "Frazzitta", role: "", image: "" },
    { number: "12", name: "Claudia", surname: "Morghese", role: "", image: "" },
    { number: "13", name: "Deborah", surname: "Dell'Utri", role: "Schiacciatrice", image: "" },
    { number: "14", name: "Rossella", surname: "Fabiano", role: "Palleggiatrice", image: "" },
  ],
  maschile: [],
};

/* ── Hero ── */
function Hero() {
  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/img/home.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", animation: "tvHeroZoom 22s ease-in-out infinite alternate" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(148deg, rgba(79,18,24,0.88) 0%, rgba(111,29,43,0.75) 45%, rgba(20,6,9,0.55) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      <div style={{ position: "relative", zIndex: 3, padding: "0 20px", maxWidth: 680, animation: "tvFadeUp 0.9s ease both" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#ffffff", textShadow: "0 4px 20px rgb(0, 0, 0)", margin: "0 0 16px", opacity: 0.9 }}>
          #CuoreGranata
        </p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,7vw,5.5rem)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.05, letterSpacing: -1, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          Trapani Volley
        </h1>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#ffffff", textShadow: "0 4px 20px rgb(0, 0, 0)", margin: "0 0 28px", opacity: 0.85 }}>
          Il volley che unisce una città
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/club/storia" style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 50, color: "#fff", padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", textDecoration: "none" }}>
            Scopri di più
          </a>
          <a href="/news" style={{ background: "#ff7676", border: "none", borderRadius: 50, color: "#fff", padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", textDecoration: "none", boxShadow: "0 4px 20px rgba(255,118,118,0.35)" }}>
            Ultime notizie
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Roster M/F ── */
function isValidImageUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === "") return false;
  return trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

function Roster() {
  const [tab, setTab] = useState<"femminile" | "maschile">("femminile");
  const scrollRef = useRef<HTMLDivElement>(null);
  const list = ROSTER[tab];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Scorrimento adattato alla larghezza delle card
      const scrollAmount = direction === "left" ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="roster" style={{ padding: "60px 16px", background: "#0f0608", color: "#ffffff", overflow: "hidden" }}>
      {/* CSS Iniettato locale per nascondere la scrollbar ed gestire le dimensioni responsive */}
      <style jsx>{`
        .roster-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .roster-card {
          flex: 0 0 220px;
          height: 340px;
        }
        @media (min-width: 640px) {
          .roster-card {
            flex: 0 0 260px;
            height: 380px;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header Sezione Responsive */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#ff7676", display: "block", marginBottom: 6 }}>
              Rosa {ROSTER.stagione}
            </span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 900, color: "#ffffff", margin: 0 }}>
              First Team
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", justifyContent: "space-between" }}>
            {/* Selettore Maschile/Femminile */}
            <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.08)", padding: 3, borderRadius: 50, border: "1px solid rgba(255,255,255,0.12)" }}>
              {(["femminile", "maschile"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    background: tab === t ? "#ff7676" : "transparent",
                    color: tab === t ? "#ffffff" : "rgba(255,255,255,0.6)",
                    border: "none",
                    borderRadius: 50,
                    padding: "6px 16px",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontFamily: "'DM Sans',sans-serif",
                    transition: "all 0.3s ease"
                  }}
                >
                  {t === "femminile" ? "Femminile" : "Maschile"}
                </button>
              ))}
            </div>

            {/* Freccette di scorrimento */}
            {list.length > 0 && (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => handleScroll("left")}
                  aria-label="Precedente"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    WebkitTapHighlightColor: "transparent"
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  aria-label="Successivo"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    WebkitTapHighlightColor: "transparent"
                  }}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contenitore Slider Orizzontale */}
        {list.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>
            Rosa {tab} in aggiornamento — disponibile a breve.
          </p>
        ) : (
          <div
            ref={scrollRef}
            className="roster-scroll-container"
            style={{
              display: "flex",
              gap: 16,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              paddingBottom: 16,
              marginRight: "-16px",
              paddingRight: "16px"
            }}
          >
            {list.map((atleta, i) => {
              const hasValidImage = isValidImageUrl(atleta.image);

              return (
                <div
                  key={`${atleta.surname}-${i}`}
                  className="roster-card"
                  style={{
                    scrollSnapAlign: "start",
                    position: "relative",
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "linear-gradient(180deg, #2a0b12 0%, #120407 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
                  }}
                >
                  {/* Foto dell'atleta */}
                  {hasValidImage ? (
                    <Image
                      src={atleta.image!}
                      alt={`${atleta.name} ${atleta.surname}`}
                      fill
                      sizes="(max-width: 640px) 220px, 260px"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#21090d" }}>
                      <span style={{ fontSize: 40, fontWeight: 900, color: "rgba(255,255,255,0.15)", fontFamily: "'Playfair Display',serif" }}>
                        {atleta.number || "TV"}
                      </span>
                    </div>
                  )}

                  {/* Sfumatura inferiore per il testo */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(15, 6, 8, 0.95) 0%, rgba(15, 6, 8, 0.35) 55%, transparent 100%)"
                    }}
                  />

                  {/* Numero di Maglia in alto a destra */}
                  {atleta.number && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 14,
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        color: "rgba(255,255,255,0.85)",
                        textShadow: "0 2px 8px rgba(0,0,0,0.6)"
                      }}
                    >
                      #{atleta.number}
                    </div>
                  )}

                  {/* Dettagli Atleta in Basso */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px" }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        color: "#ff7676",
                        display: "block",
                        marginBottom: 2
                      }}
                    >
                      {atleta.role || "Giocatrice"}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.15
                      }}
                    >
                      <span style={{ display: "block", fontWeight: 400, fontSize: "0.95rem", opacity: 0.85 }}>
                        {atleta.name}
                      </span>
                      {atleta.surname}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Main Page Export ── */
export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header /> 
      <Hero />
      <NewsCarousel />
      <SponsorMarquee />
      <TvSection />
      <Roster />
      <Footer />
    </main>
  );
}