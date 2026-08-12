//app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";

/* ── Dati: Organigramma (dalle tue grafiche staff) ── */
const ORGANIGRAMMA = [
  { nome: "Rocco Poma", ruolo: "Presidente", file: "/img/staff/Pomq.jpg" },
  { nome: "Mimmo Grimaldi", ruolo: "Vicepresidente", file: "/img/staff/Grimaldi.jpg" },
  { nome: "Daniela Del Giudice", ruolo: "Team Manager", file: "/img/staff/DelGiudice.jpg" },
  { nome: "Salvatore Restuccia", ruolo: "Responsabile Sanitario", file: "/img/staff/Restuccia.jpg" },
  { nome: "Rino Fontana", ruolo: "Dirigente", file: "/img/staff/Fontana.jpg" },
  { nome: "Maurizio Virgilio", ruolo: "Dirigente", file: "/img/staff/Virgilio.jpg" },
  { nome: "Enza Vario", ruolo: "Collaboratrice", file: "/img/staff/Vario.jpg" },
  { nome: "Ignazio Vario", ruolo: "Collaboratore", file: "/img/staff/Vario.jpg" },
  { nome: "Santo Vassallo", ruolo: "Collaboratore", file: "/img/staff/Vassallo.jpg" },
  { nome: "Francesco Oddo", ruolo: "Grafico & Social Media Manager", file: "/img/staff/Oddo.jpg" },
];

/* ── Dati: Staff tecnico ── */
const STAFF_TECNICO = [
  { nome: "Piervito Vulpetti", ruolo: "Direttore Tecnico & Coach", file: "/img/staff/Vulpetti.jpg" },
  { nome: "Andrea Gianno", ruolo: "Coach", file: "/img/staff/Gianno.jpg" },
  { nome: "Giuseppe Oddo", ruolo: "Coach", file: "/img/staff/Oddo.jpg" },
  { nome: "Gioacchino Di Bella", ruolo: "Assistant Coach", file: "/img/staff/DiBella.jpg" },
];

/* ── Dati: Roster femminile (integra il maschile quando disponibile) ── */
const ROSTER = {
  stagione: "2026/2027",
  femminile: [
    "Inglese D.", "La Vecchia A.", "Mazzola M.", "Montalto I.", "Morello A.",
    "Alastra G.", "Grimaldi C.", "Di Maggio K.", "Lombardo R.", "Hernandez K.",
    "Oddo M.", "Salerno C.", "Goretti V.", "Barraco F.", "Lombardo S.",
  ] as string[],
  maschile: [] as string[], // ← da compilare quando avrai la rosa maschile
};

/* ── Dati: Giovanili (aggiungi le categorie mancanti) ── */
const GIOVANILI = [
  { id: "giovanili-u18", categoria: "Under 18", text: "Attività, allenamenti e calendario delle gare della formazione Under 18." },
  { id: "giovanili-u16", categoria: "Under 16", text: "Percorso dedicato alla crescita tecnica e fisica delle atlete Under 16." },
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
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold });
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
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s", marginBottom: 48 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>{eyebrow}</span>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>{title}</h2>
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
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#ff7676", marginBottom: 20, opacity: 0.9 }}>#CuoreGranata</span>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.05, letterSpacing: -1, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          Trapani Volley
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", marginBottom: 40, letterSpacing: 0.5, lineHeight: 1.7 }}>Passione, squadra, vittoria</p>
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
    <section id="storia" style={{ padding: "100px 24px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Intro + foto */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", marginBottom: 80 }} className="tv-about-grid">
          <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>
              Chi siamo
            </span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.15 }}>
              La nostra storia
            </h2>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#ff9d9d", marginBottom: 16 }}>
              Una nuova realtà, una grande ambizione
            </h3>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85 }}>
              Fondata nel <strong style={{ color: "#fff" }}>2025</strong>, Trapani Volley nasce con un obiettivo preciso: diventare la{" "}
              <strong style={{ color: "#fff" }}>scuola di pallavolo di riferimento della città di Trapani</strong>, costruendo nel tempo
              una realtà sportiva solida, organizzata e capace di coinvolgere atleti, famiglie e territorio.
            </p>
          </div>

          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.45)", aspectRatio: "4/3" }}>
            <Image src="/img/presidente-coppa.jpg" alt="Presidente Trapani Volley con la coppa" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Corpo articolo */}
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 44 }}>
          <AnimCard>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
              Trapani Volley è oggi <strong style={{ color: "#fff" }}>l&apos;unica società pallavolistica a rappresentare i colori granata</strong>,
              portando con orgoglio il nome della città nei campionati ufficiali <strong style={{ color: "#fff" }}>FIPAV e PGS</strong>.
            </p>
          </AnimCard>

          <AnimCard delay={0.05}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Una crescita straordinaria
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 20 }}>
              Il percorso della società è stato fin da subito caratterizzato da una crescita importante. In soli otto mesi di attività,
              Trapani Volley ha raggiunto <strong style={{ color: "#fff" }}>oltre 160 atleti tesserati</strong>, dando vita a un settore
              giovanile articolato e a un progetto che parte dai più piccoli, con i corsi di <strong style={{ color: "#fff" }}>Minivolley</strong>,
              e arriva alle prime squadre.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              La società partecipa complessivamente a <strong style={{ color: "#fff" }}>sette campionati FIPAV</strong>, oltre ai
              campionati PGS, con una struttura composta da:
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Serie D Femminile",
                "Serie D Maschile",
                "numerose formazioni giovanili",
                "corsi di Minivolley",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.02rem", color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff7676", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginTop: 20 }}>
              Un percorso pensato per accompagnare ogni atleta nella propria crescita, sportiva e personale.
            </p>
          </AnimCard>

          <AnimCard delay={0.1}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Il successo in campo
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              La prima stagione ha già regalato risultati importanti, confermando la qualità del lavoro svolto.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              La <strong style={{ color: "#fff" }}>Prima Squadra Femminile</strong> ha conquistato la{" "}
              <strong style={{ color: "#fff" }}>promozione in Serie D</strong>, vincendo il campionato da imbattuta dopo{" "}
              <strong style={{ color: "#fff" }}>15 gare</strong>: un traguardo storico per una società nata da appena pochi mesi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              Importante anche il percorso della <strong style={{ color: "#fff" }}>Prima Squadra Maschile</strong>, capace di
              raggiungere il <strong style={{ color: "#fff" }}>3º posto alle Finali Regionali PGS di Messina</strong>.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
              Risultati che rappresentano soltanto l&apos;inizio di un progetto costruito con ambizione, passione e programmazione.
            </p>
          </AnimCard>

          <AnimCard delay={0.15}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Una società radicata nella città
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              La crescita di Trapani Volley è sostenuta da uno <strong style={{ color: "#fff" }}>staff qualificato</strong>, formato da
              allenatori federali, dirigenti e professionisti della comunicazione, e da una presenza capillare sul territorio.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              La società gestisce infatti <strong style={{ color: "#fff" }}>alcune palestre scolastiche</strong>, distribuite in
              diversi quartieri della città, creando una rete di spazi che permette di svolgere quotidianamente tutte le attività
              sportive e di portare la pallavolo sempre più vicino alle famiglie trapanesi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
              Per Trapani Volley, infatti, fare sport significa anche creare comunità, offrire ai giovani un ambiente sano in cui
              crescere e contribuire alla valorizzazione del territorio.
            </p>
          </AnimCard>

          <AnimCard delay={0.2}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Una squadra anche fuori dal campo
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              La nostra crescita non si misura soltanto attraverso i risultati sportivi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
              In pochi mesi, Trapani Volley ha costruito una <strong style={{ color: "#fff" }}>community digitale in costante
              espansione</strong>, raggiungendo circa <strong style={{ color: "#fff" }}>4 milioni di visualizzazioni complessive
              nei primi otto mesi di attività</strong>. Una presenza online che racconta quotidianamente la vita della società, le
              partite, gli atleti e i valori del progetto, creando un punto di incontro tra squadra, tifosi, famiglie e territorio.
            </p>
          </AnimCard>

          <AnimCard delay={0.25}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Il futuro è granata
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              Trapani Volley è una società giovane, ma con una visione chiara:{" "}
              <strong style={{ color: "#fff" }}>crescere, formare e rappresentare Trapani attraverso la pallavolo</strong>.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
              Ogni atleta, ogni allenatore, ogni dirigente, ogni famiglia e ogni partner fa parte di un progetto che guarda al
              futuro con entusiasmo e ambizione.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 28 }}>
              Perché la nostra storia è appena iniziata.
            </p>
            <p style={{
              fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#ff9d9d",
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

/* ── Organigramma ── */
function Organigramma() {
  return (
    <section id="organigramma" style={{ padding: "100px 24px", background: "#111" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow="Chi guida il club" title="Organigramma" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
          {ORGANIGRAMMA.map(({ nome, ruolo }, i) => (
            <AnimCard key={nome} delay={(i % 8) * 0.05}>
              <div style={{ background: "#181818", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "26px 18px", textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 14px", background: "linear-gradient(135deg,#6f1d2b,#4f1218)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.05rem", color: "#ff9d9d", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {nome.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{nome}</div>
                <div style={{ fontSize: "0.78rem", color: "#ff9d9d", textTransform: "uppercase", letterSpacing: 0.5 }}>{ruolo}</div>
              </div>
            </AnimCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Staff tecnico ── */
function StaffTecnico() {
  return (
    <section id="staff-tecnico" style={{ padding: "100px 24px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow="In panchina" title="Staff tecnico" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
          {STAFF_TECNICO.map(({ nome, ruolo }, i) => (
            <AnimCard key={nome} delay={i * 0.08}>
              <div style={{ background: "#181818", border: "1px solid rgba(111,29,43,0.35)", borderRadius: 16, padding: "26px 18px", textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 14px", background: "linear-gradient(135deg,#6f1d2b,#4f1218)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.05rem", color: "#ff9d9d", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {nome.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{nome}</div>
                <div style={{ fontSize: "0.78rem", color: "#ff9d9d", textTransform: "uppercase", letterSpacing: 0.5 }}>{ruolo}</div>
              </div>
            </AnimCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Roster M/F ── */
function Roster() {
  const [tab, setTab] = useState<"femminile" | "maschile">("femminile");
  const list = ROSTER[tab];
  return (
    <section id="roster" style={{ padding: "100px 24px", background: "#111" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Rosa {ROSTER.stagione}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff" }}>Roster</h2>
          </div>
          <div style={{ display: "flex", gap: 8, background: "#181818", padding: 6, borderRadius: 50, border: "1px solid rgba(255,255,255,0.08)" }}>
            {(["femminile", "maschile"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? "#ff7676" : "transparent", color: tab === t ? "#fff" : "rgba(255,255,255,0.6)",
                border: "none", borderRadius: 50, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "'DM Sans',sans-serif",
              }}>
                {t === "femminile" ? "Femminile" : "Maschile"}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>Rosa {tab} in aggiornamento — disponibile a breve.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16 }}>
            {list.map((name, i) => (
              <AnimCard key={name} delay={(i % 8) * 0.05}>
                <div style={{ background: "#181818", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 16px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 14px", background: "linear-gradient(135deg,#6f1d2b,#4f1218)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.1rem", color: "#ff9d9d", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {name.replace(".", "").split(" ").map((p) => p[0]).join("").toUpperCase()}
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#fff" }}>{name}</div>
                </div>
              </AnimCard>
            ))}
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

/* ── Calendario: Stagione 2026/2027 (classifica + risultati + prossime) ── */
function Calendario() {
  return (
    <section id="calendario" style={{ padding: "100px 24px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow="Calendario" title="Stagione 2026/2027" />

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#fff", marginBottom: 20 }}>Classifica</h3>
        <AnimCard style={{ marginBottom: 60 }}>
          <div style={{ background: "#181818", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", maxWidth: 900 }}>
            <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px", padding: "14px 20px", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.07)" }} className="tv-classifica-header">
              <span>#</span><span>Squadra</span><span style={{ textAlign: "center" }}>G</span><span style={{ textAlign: "center" }}>V</span><span style={{ textAlign: "center" }}>P</span><span style={{ textAlign: "center" }}>Punti</span>
            </div>
            {STANDINGS.map(({ pos, team, g, v, p, punti }) => {
              const isTrapani = team.toLowerCase().includes("trapani volley");
              return (
                <div key={team} style={{ display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px", padding: "14px 20px", alignItems: "center", background: isTrapani ? "rgba(111,29,43,0.18)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.05)", borderLeft: isTrapani ? "3px solid #ff7676" : "3px solid transparent" }} className="tv-classifica-row">
                  <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, color: isTrapani ? "#ff7676" : "rgba(255,255,255,0.6)" }}>{pos}</span>
                  <span style={{ fontWeight: isTrapani ? 700 : 500, color: isTrapani ? "#fff" : "rgba(255,255,255,0.75)", fontSize: "0.92rem" }}>{team}</span>
                  <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>{g}</span>
                  <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>{v}</span>
                  <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>{p}</span>
                  <span style={{ textAlign: "center", fontWeight: 700, color: isTrapani ? "#ff7676" : "#fff" }}>{punti}</span>
                </div>
              );
            })}
          </div>
        </AnimCard>

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#fff", marginBottom: 20 }}>Risultati</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 60 }}>
          {RISULTATI.map(({ giornata, casa, trasferta, setCasa, setTrasferta, set, vittoria }, i) => {
            const trapaniInCasa = casa.toLowerCase().includes("trapani volley");
            return (
              <AnimCard key={giornata} delay={i * 0.08}>
                <div style={{ background: "#181818", border: `1px solid ${vittoria ? "rgba(111,29,43,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 16, padding: "24px 28px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center", position: "relative", overflow: "hidden" }} className="tv-risultato-card">
                  {vittoria && <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#ff7676" }} />}
                  <div style={{ textAlign: "center", minWidth: 70 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Giornata</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: "#fff" }}>{giornata}</div>
                  </div>
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 1fr", alignItems: "center", gap: 16, marginBottom: 6 }} className="tv-risultato-teams">
                      <span style={{ fontSize: "1rem", fontWeight: trapaniInCasa ? 700 : 500, color: trapaniInCasa ? "#fff" : "rgba(255,255,255,0.7)", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{casa}</span>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.3rem", color: "#ff7676", whiteSpace: "nowrap", textAlign: "center" }}>{setCasa} — {setTrasferta}</span>
                      <span style={{ fontSize: "1rem", fontWeight: !trapaniInCasa ? 700 : 500, color: !trapaniInCasa ? "#fff" : "rgba(255,255,255,0.7)", textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{trasferta}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                      {set.map((s, idx) => {
                        const homeWon = setWinnerIsHome(s);
                        const trapaniWonSet = homeWon === null ? null : (trapaniInCasa ? homeWon : !homeWon);
                        return (
                          <span key={idx} style={{ fontSize: 11, color: trapaniWonSet ? "#ff9d9d" : "rgba(255,255,255,0.5)", background: trapaniWonSet ? "rgba(255,118,118,0.14)" : "rgba(255,255,255,0.05)", border: trapaniWonSet ? "1px solid rgba(255,118,118,0.35)" : "1px solid transparent", fontWeight: trapaniWonSet ? 700 : 400, padding: "2px 8px", borderRadius: 6 }}>
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "6px 14px", borderRadius: 50, background: vittoria ? "rgba(111,29,43,0.25)" : "rgba(255,255,255,0.08)", color: vittoria ? "#ff7676" : "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                    {vittoria ? "Vittoria" : "Sconfitta"}
                  </div>
                </div>
              </AnimCard>
            );
          })}
        </div>

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#fff", marginBottom: 20 }}>Prossime partite</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {PROSSIME_PARTITE.map(({ giornata, casa, trasferta, data, ora, luogo }, i) => (
            <AnimCard key={giornata} delay={i * 0.08}>
              <div style={{ background: "#181818", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Giornata {giornata}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#ff7676", background: "rgba(255,118,118,0.12)", padding: "3px 10px", borderRadius: 50 }}>{data}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14, fontSize: "0.95rem", flexWrap: "wrap", textAlign: "center" }}>
                  <span style={{ fontWeight: casa.toLowerCase().includes("trapani volley") ? 700 : 500, color: casa.toLowerCase().includes("trapani volley") ? "#fff" : "rgba(255,255,255,0.7)" }}>{casa}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>vs</span>
                  <span style={{ fontWeight: trasferta.toLowerCase().includes("trapani volley") ? 700 : 500, color: trasferta.toLowerCase().includes("trapani volley") ? "#fff" : "rgba(255,255,255,0.7)" }}>{trasferta}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
                  <span>🕒 {ora}</span>
                  <span>📍 {luogo}</span>
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
    <section id="giovanili" style={{ padding: "100px 24px", background: "#4f1218", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/img/fumogeno.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(180deg, #4f1218 0%, rgba(79,18,24,0.75) 50%, #4f1218 100%)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#ff7676", opacity: 0.8, display: "block", marginBottom: 12 }}>Settore giovanile</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 48 }}>Giovanili</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {GIOVANILI.map(({ id, categoria, text }, i) => (
            <AnimCard key={id} delay={i * 0.1}>
              <div id={id} style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "40px 28px", scrollMarginTop: 100 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>{categoria}</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>{text}</p>
              </div>
            </AnimCard>
          ))}
        </div>
        <p style={{ marginTop: 24, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          Aggiungi qui tutte le altre categorie giovanili del club (es. Under 14, minivolley, ecc.).
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Hero />
      <Storia />
      <Organigramma />
      <StaffTecnico />
      <Roster />
      <Calendario />
      <Giovanili />
      <Footer />
    </>
  );
}