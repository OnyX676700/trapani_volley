//app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";
import NewsCarousel from "./components/NewsCarousel";
import SponsorMarquee from "./components/SponsorMarquee";
import TvSection from "./components/TvSection";

/* ── Tipo Atleta ── */
interface Athlete {
  name: string;
  image?: string; // Percorso immagine (es: "/img/roster/inglese.jpg"). Opzionale.
}

/* ── Dati: Roster femminile/maschile ── */
const ROSTER: { stagione: string; femminile: Athlete[]; maschile: Athlete[] } = {
  stagione: "2025/2026",
  femminile: [
    { name: "Inglese D.", image: "/img/rosterF/Inglese.jpg" },
    { name: "Grimaldi C.", image: "/img/rosterF/GrimaldiC.jpg" },
    { name: "La Vecchia A.", image: "/img/rosterF/LaVecchia.jpg" },
    { name: "Barraco F.", image: "/img/rosterF/Barraco.jpg" },
    { name: "Cusimano G.", image: "" },
    { name: "Grimaudo G.", image: "" },
    { name: "Montalto I.", image: "/img/rosterF/Montalto.jpg" },
    { name: "Oddo M.", image: "" },
    { name: "Lombardo S.", image: "/img/rosterF/LombardoS.jpg" },
    { name: "Goretti V.", image: "/img/rosterF/Goretti.jpg" },
    { name: "Frazzitta A.", image: "" },
    { name: "Morghese C.", image: "" },
    { name: "Dell'Utri D.", image: "" },
    { name: "Fabiano R.", image: "" }, 
  ],
  maschile: [],
};

/* ── Dati: Giovanili ── */
const GIOVANILI = [
  { id: "giovanili-F", categoria: "Under Femminile", text: "Aggiungere testo.." },
  { id: "giovanili-M", categoria: "Under Maschile", text: "Aggiungere testo.." },
];

const STANDINGS = [
  { pos: 1, team: "Trapani Volley", g: 14, v: 12, p: 2, punti: 34 },
  { pos: 2, team: "Farmacie Rotolo Libertas", g: 14, v: 10, p: 4, punti: 30 },
  { pos: 3, team: "Ericina Volley", g: 14, v: 9, p: 5, punti: 27 },
  { pos: 4, team: "ASD Virtus Favignana", g: 14, v: 7, p: 7, punti: 21 },
  { pos: 5, team: "Pallavolo Marsala", g: 14, v: 5, p: 9, punti: 15 },
  { pos: 6, team: "Volley Castelvetrano", g: 14, v: 2, p: 12, punti: 6 },
];

const PROSSIME_PARTITE = [
  { giornata: 15, casa: "Trapani Volley", trasferta: "Pallavolo Marsala", data: "Sabato 6 Giugno 2026", ora: "18:30", luogo: "Palestra Comunale, Trapani" },
  { giornata: 16, casa: "Volley Castelvetrano", trasferta: "Trapani Volley", data: "Sabato 13 Giugno 2026", ora: "17:00", luogo: "Palasport, Castelvetrano" },
];

const RISULTATI = [
  { giornata: 14, casa: "Trapani Volley", trasferta: "Farmacie Rotolo Libertas", setCasa: 3, setTrasferta: 0, set: ["25-13", "25-16", "25-12"], vittoria: true },
  { giornata: 12, casa: "Ericina Volley", trasferta: "Trapani Volley", setCasa: 0, setTrasferta: 3, set: ["19-25", "16-25", "25-27"], vittoria: true },
  { giornata: 13, casa: "ASD Virtus Favignana", trasferta: "Trapani Volley", setCasa: 0, setTrasferta: 3, set: ["15-25", "15-25", "13-25"], vittoria: true },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function AnimCard({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.6s,transform 0.6s",
        marginBottom: 48,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>
        {eyebrow}
      </span>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#6f1d2b", lineHeight: 1.15 }}>
        {title}
      </h2>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/img/home.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", animation: "tvHeroZoom 22s ease-in-out infinite alternate" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(148deg, rgba(79,18,24,0.88) 0%, rgba(111,29,43,0.75) 45%, rgba(20,6,9,0.55) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      <div style={{ position: "relative", zIndex: 3, padding: "0 24px", maxWidth: 680, animation: "tvFadeUp 0.9s ease both" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#ffffff", textShadow: "0 4px 20px rgb(0, 0, 0)", margin: "0 0 20px", opacity: 0.9 }}>
          #CuoreGranata
        </p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.05, letterSpacing: -1, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          Trapani Volley
        </h1>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#ffffff", textShadow: "0 4px 20px rgb(0, 0, 0)", margin: "0 0 32px", opacity: 0.85 }}>
          Il volley che unisce una città
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("storia")} style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 50, color: "#fff", padding: "13px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
            Scopri di più
          </button>
          <a href="/news" style={{ background: "#ff7676", border: "none", borderRadius: 50, color: "#fff", padding: "13px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", textDecoration: "none", boxShadow: "0 4px 20px rgba(255,118,118,0.35)" }}>
            Ultime notizie
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Storia ── */
function Storia() {
  const [ref, visible] = useInView();
  return (
    <section id="storia" style={{ padding: "100px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", marginBottom: 80 }} className="tv-about-grid">
          <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>
              Chi siamo
            </span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#6f1d2b", marginBottom: 20, lineHeight: 1.15 }}>
              La nostra storia
            </h2>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#8a2236", marginBottom: 16 }}>
              Una nuova realtà, una grande ambizione
            </h3>
            <p style={{ fontSize: "1.05rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.85 }}>
              Fondata nel <strong style={{ color: "#111" }}>2025</strong>, Trapani Volley nasce con un obiettivo preciso: diventare la{" "}
              <strong style={{ color: "#111" }}>scuola di pallavolo di riferimento della città di Trapani</strong>, costruendo nel tempo
              una realtà sportiva solida, organizzata e capace di coinvolgere atleti, famiglie e territorio.
            </p>
          </div>

          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.18)", aspectRatio: "4/3" }}>
            <Image src="/img/storia.jpg" alt="Presidente Trapani Volley con la coppa" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 44 }}>
          <AnimCard>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              Trapani Volley è oggi <strong style={{ color: "#111" }}>l&apos;unica società pallavolistica a rappresentare i colori granata</strong>,
              portando con orgoglio il nome della città nei campionati ufficiali <strong style={{ color: "#111" }}>FIPAV e PGS</strong>.
            </p>
          </AnimCard>

          <AnimCard delay={0.05}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#6f1d2b", marginBottom: 16 }}>
              Una crescita straordinaria
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 20 }}>
              Il percorso della società è stato fin da subito caratterizzato da una crescita importante. In soli otto mesi di attività,
              Trapani Volley ha raggiunto <strong style={{ color: "#111" }}>oltre 160 atleti tesserati</strong>, dando vita a un settore
              giovanile articolato e a un progetto che parte dai più piccoli, con i corsi di <strong style={{ color: "#111" }}>Minivolley</strong>,
              e arriva alle prime squadre.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La società partecipa complessivamente a <strong style={{ color: "#111" }}>sette campionati FIPAV</strong>, oltre ai
              campionati PGS, con una struttura composta da:
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Serie D Femminile",
                "Serie D Maschile",
                "numerose formazioni giovanili",
                "corsi di Minivolley",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.02rem", color: "rgba(20,20,20,0.8)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff7676", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginTop: 20 }}>
              Un percorso pensato per accompagnare ogni atleta nella propria crescita, sportiva e personale.
            </p>
          </AnimCard>

          <AnimCard delay={0.1}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#6f1d2b", marginBottom: 16 }}>
              Il successo in campo
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La prima stagione ha già regalato risultati importanti, confermando la qualità del lavoro svolto.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La <strong style={{ color: "#111" }}>Prima Squadra Femminile</strong> ha conquistato la{" "}
              <strong style={{ color: "#111" }}>promozione in Serie D</strong>, vincendo il campionato da imbattuta dopo{" "}
              <strong style={{ color: "#111" }}>15 gare</strong>: un traguardo storico per una società nata da appena pochi mesi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              Importante anche il percorso della <strong style={{ color: "#111" }}>Prima Squadra Maschile</strong>, capace di
              raggiungere il <strong style={{ color: "#111" }}>3º posto alle Finali Regionali PGS di Messina</strong>.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              Risultati che rappresentano soltanto l&apos;inizio di un progetto costruito con ambizione, passione e programmazione.
            </p>
          </AnimCard>

          <AnimCard delay={0.15}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#6f1d2b", marginBottom: 16 }}>
              Una società radicata nella città
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La crescita di Trapani Volley è sostenuta da uno <strong style={{ color: "#111" }}>staff qualificato</strong>, formato da
              allenatori federali, dirigenti e professionisti della comunicazione, e da una presenza capillare sul territorio.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La società gestisce infatti <strong style={{ color: "#111" }}>alcune palestre scolastiche</strong>, distribuite in
              diversi quartieri della città, creando una rete di spazi che permette di svolgere quotidianamente tutte le attività
              sportive e di portare la pallavolo sempre più vicino alle famiglie trapanesi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              Per Trapani Volley, infatti, fare sport significa anche creare comunità, offrire ai giovani un ambiente sano in cui
              crescere e contribuire alla valorizzazione del territorio.
            </p>
          </AnimCard>

          <AnimCard delay={0.2}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#6f1d2b", marginBottom: 16 }}>
              Una squadra anche fuori dal campo
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La nostra crescita non si misura soltanto attraverso i risultati sportivi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              In pochi mesi, Trapani Volley ha costruito una <strong style={{ color: "#111" }}>community digitale in costante
              espansione</strong>, raggiungendo circa <strong style={{ color: "#111" }}>4 milioni di visualizzazioni complessive
              nei primi otto mesi di attività</strong>. Una presenza online che racconta quotidianamente la vita della società, le
              partite, gli atleti e i valori del progetto, creando un punto di incontro tra squadra, tifosi, famiglie e territorio.
            </p>
          </AnimCard>

          <AnimCard delay={0.25}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#6f1d2b", marginBottom: 16 }}>
              Il futuro è granata
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              Trapani Volley è una società giovane, ma con una visione chiara:{" "}
              <strong style={{ color: "#111" }}>crescere, formare e rappresentare Trapani attraverso la pallavolo</strong>.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              Ogni atleta, ogni allenatore, ogni dirigente, ogni famiglia e ogni partner fa parte di un progetto che guarda al
              futuro con entusiasmo e ambizione.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 28 }}>
              Perché la nostra storia è appena iniziata.
            </p>
            <p style={{
              fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#8a2236",
              lineHeight: 1.5, borderLeft: "3px solid #ff7676", paddingLeft: 20,
            }}>
              Trapani Volley. Una città. Un colore. Una squadra. Un futuro da costruire insieme.
            </p>
          </AnimCard>
        </div>
      </div>
    </section>
  );
}

/* ── Roster M/F ── */
/* ── Funzione di supporto per verificare URL/Percorsi validi ── */
function isValidImageUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === "") return false;
  // Deve essere un percorso locale relativo che inizia con / (es. /img/foto.jpg)
  // oppure un link web valido (es. http:// o https://)
  return trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

/* ── Roster M/F ── */
function Roster() {
  const [tab, setTab] = useState<"femminile" | "maschile">("femminile");
  const list = ROSTER[tab];

  return (
    <section id="roster" style={{ padding: "100px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Rosa {ROSTER.stagione}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#6f1d2b" }}>Roster</h2>
          </div>
          <div style={{ display: "flex", gap: 8, background: "#f0ecea", padding: 6, borderRadius: 50, border: "1px solid rgba(0,0,0,0.08)" }}>
            {(["femminile", "maschile"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? "#ff7676" : "transparent", color: tab === t ? "#fff" : "rgba(0,0,0,0.55)",
                border: "none", borderRadius: 50, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "'DM Sans',sans-serif",
              }}>
                {t === "femminile" ? "Femminile" : "Maschile"}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "0.9rem" }}>Rosa {tab} in aggiornamento — disponibile a breve.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16 }}>
            {list.map((atleta, i) => {
              const initials = atleta.name.replace(".", "").split(" ").map((p) => p[0]).join("").toUpperCase();
              const hasValidImage = isValidImageUrl(atleta.image);

              return (
                <AnimCard key={atleta.name} delay={(i % 8) * 0.05}>
                  <div style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "24px 16px", textAlign: "center" }}>
                    <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", margin: "0 auto 14px", overflow: "hidden", background: "linear-gradient(135deg,#6f1d2b,#4f1218)", border: "2px solid rgba(138, 34, 54, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {hasValidImage ? (
                        <Image src={atleta.image!} alt={atleta.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.1rem", color: "#ff9d9d" }}>
                          {initials}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#111" }}>{atleta.name}</div>
                  </div>
                </AnimCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function setWinnerIsHome(setScore: string) {
  const [a, b] = setScore.split("-").map((n) => parseInt(n.trim(), 10));
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return a > b;
}

/* ── Calendario: Stagione 2026/2027 ── */
function Calendario() {
  return (
    <section id="calendario" style={{ padding: "100px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow="Calendario" title="Stagione 2026/2027" />

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#6f1d2b", marginBottom: 20 }}>Classifica</h3>
        <AnimCard style={{ marginBottom: 60 }}>
          <div style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, overflow: "hidden", maxWidth: 900 }}>
            <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px", padding: "14px 20px", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", borderBottom: "1px solid rgba(0,0,0,0.08)" }} className="tv-classifica-header">
              <span>#</span><span>Squadra</span><span style={{ textAlign: "center" }}>G</span><span style={{ textAlign: "center" }}>V</span><span style={{ textAlign: "center" }}>P</span><span style={{ textAlign: "center" }}>Punti</span>
            </div>
            {STANDINGS.map(({ pos, team, g, v, p, punti }) => {
              const isTrapani = team.toLowerCase().includes("trapani volley");
              return (
                <div key={team} style={{ display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px", padding: "14px 20px", alignItems: "center", background: isTrapani ? "rgba(111,29,43,0.1)" : "transparent", borderBottom: "1px solid rgba(0,0,0,0.06)", borderLeft: isTrapani ? "3px solid #ff7676" : "3px solid transparent" }} className="tv-classifica-row">
                  <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, color: isTrapani ? "#ff7676" : "rgba(0,0,0,0.5)" }}>{pos}</span>
                  <span style={{ fontWeight: isTrapani ? 700 : 500, color: isTrapani ? "#111" : "rgba(0,0,0,0.7)", fontSize: "0.92rem" }}>{team}</span>
                  <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(0,0,0,0.55)" }}>{g}</span>
                  <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(0,0,0,0.55)" }}>{v}</span>
                  <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(0,0,0,0.55)" }}>{p}</span>
                  <span style={{ textAlign: "center", fontWeight: 700, color: isTrapani ? "#ff7676" : "#111" }}>{punti}</span>
                </div>
              );
            })}
          </div>
        </AnimCard>

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#6f1d2b", marginBottom: 20 }}>Risultati</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 60 }}>
          {RISULTATI.map(({ giornata, casa, trasferta, setCasa, setTrasferta, set, vittoria }, i) => {
            const trapaniInCasa = casa.toLowerCase().includes("trapani volley");
            return (
              <AnimCard key={giornata} delay={i * 0.08}>
                <div style={{ background: "#f7f5f4", border: `1px solid ${vittoria ? "rgba(111,29,43,0.3)" : "rgba(0,0,0,0.08)"}`, borderRadius: 16, padding: "24px 28px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center", position: "relative", overflow: "hidden" }} className="tv-risultato-card">
                  {vittoria && <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#ff7676" }} />}
                  <div style={{ textAlign: "center", minWidth: 70 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 4 }}>Giornata</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: "#111" }}>{giornata}</div>
                  </div>
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 1fr", alignItems: "center", gap: 16, marginBottom: 6 }} className="tv-risultato-teams">
                      <span style={{ fontSize: "1rem", fontWeight: trapaniInCasa ? 700 : 500, color: trapaniInCasa ? "#111" : "rgba(0,0,0,0.65)", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{casa}</span>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.3rem", color: "#ff7676", whiteSpace: "nowrap", textAlign: "center" }}>{setCasa} — {setTrasferta}</span>
                      <span style={{ fontSize: "1rem", fontWeight: !trapaniInCasa ? 700 : 500, color: !trapaniInCasa ? "#111" : "rgba(0,0,0,0.65)", textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{trasferta}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                      {set.map((s, idx) => {
                        const homeWon = setWinnerIsHome(s);
                        const trapaniWonSet = homeWon === null ? null : (trapaniInCasa ? homeWon : !homeWon);
                        return (
                          <span key={idx} style={{ fontSize: 11, color: trapaniWonSet ? "#8a2236" : "rgba(0,0,0,0.5)", background: trapaniWonSet ? "rgba(255,118,118,0.16)" : "rgba(0,0,0,0.04)", border: trapaniWonSet ? "1px solid rgba(255,118,118,0.4)" : "1px solid transparent", fontWeight: trapaniWonSet ? 700 : 400, padding: "2px 8px", borderRadius: 6 }}>
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "6px 14px", borderRadius: 50, background: vittoria ? "rgba(111,29,43,0.15)" : "rgba(0,0,0,0.05)", color: vittoria ? "#8a2236" : "rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
                    {vittoria ? "Vittoria" : "Sconfitta"}
                  </div>
                </div>
              </AnimCard>
            );
          })}
        </div>

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#6f1d2b", marginBottom: 20 }}>Prossime partite</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {PROSSIME_PARTITE.map(({ giornata, casa, trasferta, data, ora, luogo }, i) => (
            <AnimCard key={giornata} delay={i * 0.08}>
              <div style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>Giornata {giornata}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#8a2236", background: "rgba(255,118,118,0.16)", padding: "3px 10px", borderRadius: 50 }}>{data}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14, fontSize: "0.95rem", flexWrap: "wrap", textAlign: "center" }}>
                  <span style={{ fontWeight: casa.toLowerCase().includes("trapani volley") ? 700 : 500, color: casa.toLowerCase().includes("trapani volley") ? "#111" : "rgba(0,0,0,0.65)" }}>{casa}</span>
                  <span style={{ color: "rgba(0,0,0,0.35)" }}>vs</span>
                  <span style={{ fontWeight: trasferta.toLowerCase().includes("trapani volley") ? 700 : 500, color: trasferta.toLowerCase().includes("trapani volley") ? "#111" : "rgba(0,0,0,0.65)" }}>{trasferta}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(0,0,0,0.5)", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12 }}>
                  <span>{ora}</span>
                  <span>{luogo}</span>
                </div>
              </div>
            </AnimCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Giovanili ── */
function Giovanili() {
  return (
    <section id="giovanili" style={{ padding: "100px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow="Il nostro futuro" title="Settore Giovanile" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {GIOVANILI.map(({ id, categoria, text }, i) => (
            <AnimCard key={id} delay={i * 0.1}>
              <div style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, padding: "32px 28px" }}>
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
      <Storia />
      <Roster />
      <Calendario />
      <Giovanili />
      <Footer />
    </main>
  );
}