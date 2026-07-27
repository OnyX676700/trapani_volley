"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "home", label: "Home" },
  { href: "about", label: "Chi siamo" },
  { href: "squadra", label: "Squadra" },
  { href: "campionati", label: "Campionati" },
  { href: "classifica", label: "Classifica" },
  { href: "risultati", label: "Risultati" },
  { href: "news", label: "News" },
  { href: "contatti", label: "Contatti" },
];

const ABOUT_CARDS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Squadra",
    text: "Atleti uniti da valori comuni: rispetto, determinazione e spirito di gruppo.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Eccellenza",
    text: "Ci alleniamo ogni giorno per portare la pallavolo di Trapani ai massimi livelli.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: "Giovani",
    text: "Formiamo i talenti di domani attraverso percorsi dedicati per Under 16 e Under 18.",
  },
];

// Rosa 2025/2026 — sostituisci/integra con ruolo e numero di maglia quando disponibili
const ROSTER = {
  stagione: "2025/2026",
  giocatrici: [
    "Inglese D.",
    "La Vecchia A.",
    "Mazzola M.",
    "Montalto I.",
    "Morello A.",
    "Alastra G.",
    "Grimaldi C.",
    "Di Maggio K.",
    "Lombardo R.",
    "Hernandez K.",
    "Oddo M.",
    "Salerno C.",
    "Goretti V.",
    "Barraco F.",
    "Lombardo S.",
  ],
};

const CHAMP_CARDS = [
  { num: "01", title: "Serie D", text: "Calendario completo, risultati e classifiche aggiornate in tempo reale." },
  { num: "02", title: "Coppa Regionale", text: "Partecipazioni e traguardi ottenuti nella competizione regionale." },
  { num: "03", title: "Giovanili", text: "Under 18 e Under 16: attività, allenamenti e calendario delle gare." },
];

// Dati di esempio — sostituisci con la classifica reale (es. da un'API o CMS)
const STANDINGS = [
  { pos: 1, team: "Trapani Volley", g: 14, v: 12, p: 2, punti: 34 },
  { pos: 2, team: "Farmacie Rotolo Libertas", g: 14, v: 10, p: 4, punti: 30 },
  { pos: 3, team: "Ericina Volley", g: 14, v: 9, p: 5, punti: 27 },
  { pos: 4, team: "ASD Virtus Favignana", g: 14, v: 7, p: 7, punti: 21 },
  { pos: 5, team: "Pallavolo Marsala", g: 14, v: 5, p: 9, punti: 15 },
  { pos: 6, team: "Volley Castelvetrano", g: 14, v: 2, p: 12, punti: 6 },
];

// Dati di esempio — sostituisci con le prossime gare reali
const PROSSIME_PARTITE = [
  { giornata: 15, casa: "Trapani Volley", trasferta: "Pallavolo Marsala", data: "Sabato 6 Giugno 2026", ora: "18:30", luogo: "Palestra Comunale, Trapani" },
  { giornata: 16, casa: "Volley Castelvetrano", trasferta: "Trapani Volley", data: "Sabato 13 Giugno 2026", ora: "17:00", luogo: "Palasport, Castelvetrano" },
];

const RISULTATI = [
  {
    giornata: 14,
    casa: "Trapani Volley",
    trasferta: "Farmacie Rotolo Libertas",
    setCasa: 3,
    setTrasferta: 0,
    set: ["25-13", "25-16", "25-12"],
    vittoria: true,
  }, 
  {
    giornata: 12,
    casa: "Ericina Volley",
    trasferta: "Trapani Volley",
    setCasa: 0,
    setTrasferta: 3,
    set: ["19-25", "16-25", "25-27"],
    vittoria: true,
  },
  {
    giornata: 13,
    casa: "ASD Virtus Favignana",
    trasferta: "Trapani Volley",
    setCasa: 0,
    setTrasferta: 3,
    set: ["15-25", "15-25", "13-25"],
    vittoria: true,
  }
];

const NEWS = [
  {
    featured: true,
    badge: "In evidenza",
    date: "Domenica 11 Maggio 2025",
    title: "Destinazione raggiunta! 🏆",
    text: "La squadra festeggia con medaglie al collo e spumante in campo. Un traguardo enorme, frutto del lavoro di tutto il gruppo e dello staff tecnico. #CuoreGranata",
    img: "/img/spumante.jpg",
  },
  {
    featured: false,
    date: "Venerdì 9 Maggio 2025",
    title: "Allenamento speciale",
    text: "Sessione intensa in preparazione delle prossime sfide di campionato.",
    img: "/img/fumogeno.jpg",
  },
  {
    featured: false,
    date: "Martedì 6 Maggio 2025",
    title: "Nuove maglie ufficiali",
    text: "Presentate le nuove divise per la stagione in corso. Scopri il design.",
    img: "/img/trofeo.jpg",
  },
];

// Dati di esempio — sostituisci con gli sponsor reali
const SPONSORS = ["Sponsor Uno", "Sponsor Due", "Sponsor Tre", "Sponsor Quattro"];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

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

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ── Logo ── */
function Logo({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/img/logo-senzaSfondo.jpg"
      alt="Logo Trapani Volley"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain", borderRadius: "50%" }}
      priority
    />
  );
}

/* ── Header ── */
function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (fn: (o: boolean) => boolean) => void }) {
  const scrollY = useScrollY();
  const compact = scrollY > 50;
  const active = useActiveSection(NAV_LINKS.map(l => l.href));

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: compact ? 60 : 76,
      background: compact ? "rgba(53,10,16,0.96)" : "linear-gradient(135deg,#4f1218 0%,#6f1d2b 100%)",
      backdropFilter: compact ? "blur(18px)" : "none",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(18px,4vw,60px)",
      transition: "height 0.3s,background 0.3s",
      boxShadow: compact ? "0 4px 40px rgba(0,0,0,0.45)" : "0 2px 24px rgba(0,0,0,0.3)",
    }}>
      <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
        <Logo size={compact ? 36 : 44} />
        <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: compact ? 15 : 17, color: "#fff", letterSpacing: 0.5 }}>
          Trapani Volley
        </span>
      </button>

      <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="tv-desktop-nav">
        {NAV_LINKS.map(({ href, label }, i) => {
          const isLast = i === NAV_LINKS.length - 1;
          const isActive = active === href;
          return (
            <button key={href} onClick={() => scrollTo(href)} style={{
              background: isLast ? "rgba(255,255,255,0.12)" : isActive ? "rgba(255,255,255,0.09)" : "none",
              border: isLast ? "1px solid rgba(255,255,255,0.2)" : "none",
              borderRadius: isLast ? 50 : 6,
              color: isActive || isLast ? "#fff" : "rgba(255,255,255,0.72)", cursor: "pointer", padding: isLast ? "7px 18px" : "8px 12px",
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
              textTransform: "uppercase", transition: "background 0.2s,color 0.2s", position: "relative",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = isLast ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = isActive ? "#fff" : "rgba(255,255,255,0.72)"; e.currentTarget.style.background = isLast ? "rgba(255,255,255,0.12)" : isActive ? "rgba(255,255,255,0.09)" : "none"; }}
            >
              {label}
              {!isLast && (
                <span style={{
                  position: "absolute", left: 12, right: 12, bottom: 2, height: 2, borderRadius: 2,
                  background: "#ff7676", opacity: isActive ? 1 : 0, transition: "opacity 0.2s",
                }} />
              )}
            </button>
          );
        })}
      </nav>

      <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{
        display: "none", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 8, padding: "9px 10px", cursor: "pointer",
      }} className="tv-hamburger">
        <span style={{ display: "block", width: 20, height: 2, background: "#fff", position: "relative",
          transform: menuOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s",
        }}>
          <span style={{ position: "absolute", left: 0, width: 20, height: 2, background: "#fff",
            top: menuOpen ? 0 : -6, transform: menuOpen ? "rotate(90deg)" : "none", transition: "top 0.2s,transform 0.2s",
          }}/>
          <span style={{ position: "absolute", left: 0, width: 20, height: 2, background: "#fff",
            top: menuOpen ? 0 : 6, opacity: menuOpen ? 0 : 1, transition: "top 0.2s,opacity 0.2s",
          }}/>
        </span>
      </button>

      {menuOpen && (
        <div style={{
          position: "absolute", top: compact ? 60 : 76, right: 12,
          background: "linear-gradient(135deg,#4f1218 0%,#6f1d2b 100%)",
          borderRadius: 14, padding: 10, minWidth: 200,
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.12)",
          display: "flex", flexDirection: "column", gap: 4,
          maxHeight: "calc(100vh - 100px)", overflowY: "auto",
        }}>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = active === href;
            return (
              <button key={href} onClick={() => { scrollTo(href); setMenuOpen(() => false); }} style={{
                background: isActive ? "rgba(255,255,255,0.1)" : "none", border: "none",
                color: isActive ? "#fff" : "rgba(255,255,255,0.85)", cursor: "pointer",
                padding: "11px 14px", borderRadius: 8, textAlign: "left",
                fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = isActive ? "rgba(255,255,255,0.1)" : "none"; e.currentTarget.style.color = isActive ? "#fff" : "rgba(255,255,255,0.85)"; }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", textAlign: "center",
    }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/img/squadra.jpg')",
        backgroundSize: "cover", backgroundPosition: "center 30%",
        animation: "tvHeroZoom 22s ease-in-out infinite alternate",
      }} />

      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(148deg, rgba(79,18,24,0.88) 0%, rgba(111,29,43,0.75) 45%, rgba(20,6,9,0.55) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)",
      }} />

      <div style={{ position: "relative", zIndex: 3, padding: "0 24px", maxWidth: 680, animation: "tvFadeUp 0.9s ease both" }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#ff7676", marginBottom: 20, opacity: 0.9 }}>
          #CuoreGranata
        </span>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.05, letterSpacing: -1, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          Trapani Volley
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", marginBottom: 40, letterSpacing: 0.5, lineHeight: 1.7 }}>
          Passione, squadra, vittoria
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("about")} style={{
            background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 50,
            color: "#fff", padding: "13px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.3,
            transition: "background 0.2s,transform 0.2s,box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "none"; }}
          >
            Scopri di più
          </button>
          <button onClick={() => scrollTo("news")} style={{
            background: "#ff7676", border: "none", borderRadius: 50,
            color: "#fff", padding: "13px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.3, boxShadow: "0 4px 20px rgba(255,118,118,0.35)",
            transition: "background 0.2s,transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#ff5959"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff7676"; e.currentTarget.style.transform = "none"; }}
          >
            Ultime notizie
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.45 }}>
        <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>Scorri</span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ animation: "tvBounce 1.5s ease-in-out infinite" }}>
          <path d="M8 0v16M2 10l6 6 6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </section>
  );
}

/* ── AnimCard ── */
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

/* ── About ── */
function About() {
  const [ref, visible] = useInView();
  return (
    <section id="about" style={{ padding: "100px 24px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
          marginBottom: 64,
        }} className="tv-about-grid">
          <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s", textAlign: "left" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Chi siamo</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.15 }}>
              La nostra squadra
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85 }}>
              Trapani Volley porta i colori granata della città di Trapani. Fondata con passione e spirito di comunità, promuove la pallavolo a tutti i livelli — dal settore giovanile fino ai campionati senior.
            </p>
          </div>

          <div style={{
            position: "relative", borderRadius: 24, overflow: "hidden",
            boxShadow: "0 30px 70px rgba(0,0,0,0.45)", aspectRatio: "4/3",
          }}>
            <Image
              src="/img/presidente-coppa.jpg"
              alt="Presidente Trapani Volley con la coppa"
              fill
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35) 100%)" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {ABOUT_CARDS.map(({ icon, title, text }, i) => (
            <AnimCard key={title} delay={i * 0.1}>
              <div style={{
                background: "#181818", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20,
                padding: "40px 28px", textAlign: "center",
                transition: "transform 0.25s,border-color 0.25s,box-shadow 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(111,29,43,0.55)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 62, height: 62, background: "rgba(111,29,43,0.18)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#ff7676" }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>{text}</p>
              </div>
            </AnimCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Wave ── */
function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <div style={{ lineHeight: 0, overflow: "hidden", transform: flip ? "rotate(180deg)" : "none" }}>
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z" fill="#4f1218"/>
      </svg>
    </div>
  );
}

/* ── Squadra (Roster) ── */
function monogram(name: string) {
  const parts = name.replace(".", "").trim().split(" ");
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

function Squadra() {
  const [ref, visible] = useInView();
  return (
    <section id="squadra" style={{ padding: "100px 24px", background: "#111" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s",
          marginBottom: 48, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Rosa {ROSTER.stagione}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>La squadra</h2>
          </div>
          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>{ROSTER.giocatrici.length} atlete</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16 }}>
          {ROSTER.giocatrici.map((name, i) => (
            <AnimCard key={name} delay={(i % 8) * 0.05}>
              <div style={{
                background: "#181818", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16,
                padding: "24px 16px", textAlign: "center",
                transition: "transform 0.25s,border-color 0.25s,box-shadow 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(111,29,43,0.55)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", margin: "0 auto 14px",
                  background: "linear-gradient(135deg,#6f1d2b,#4f1218)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.1rem", color: "#ff9d9d",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  {monogram(name)}
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{name}</div>
              </div>
            </AnimCard>
          ))}
        </div>

        <p style={{ marginTop: 28, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          Foto ufficiali della squadra disponibili a breve — al momento sono mostrate le iniziali di ogni atleta.
        </p>
      </div>
    </section>
  );
}

/* ── Campionati ── */
function Campionati() {
  const [ref, visible] = useInView();
  return (
    <section id="campionati" style={{ padding: "90px 24px", background: "#4f1218", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/img/fumogeno.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.18,
      }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(180deg, #4f1218 0%, rgba(79,18,24,0.75) 50%, #4f1218 100%)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#ff7676", opacity: 0.8, display: "block", marginBottom: 12 }}>Competizioni</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 48, lineHeight: 1.15 }}>Campionati</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {CHAMP_CARDS.map(({ num, title, text }, i) => (
            <AnimCard key={title} delay={i * 0.1}>
              <div style={{
                background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20, padding: "40px 28px", textAlign: "left", position: "relative", overflow: "hidden",
                transition: "background 0.25s,transform 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.055)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "#ff7676", opacity: 0.55 }}/>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 900, color: "rgba(255,255,255,0.07)", lineHeight: 1, marginBottom: 16, letterSpacing: -2 }}>{num}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>{text}</p>
              </div>
            </AnimCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Classifica ── */
function Classifica() {
  const [ref, visible] = useInView();
  return (
    <section id="classifica" style={{ padding: "100px 24px", background: "#111" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s", marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Stagione 2025/2026</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>Classifica</h2>
        </div>

        <AnimCard>
          <div style={{ background: "#181818", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px",
              padding: "14px 20px", fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.07)",
            }} className="tv-classifica-header">
              <span>#</span><span>Squadra</span><span style={{ textAlign: "center" }}>G</span><span style={{ textAlign: "center" }}>V</span><span style={{ textAlign: "center" }}>P</span><span style={{ textAlign: "center" }}>Punti</span>
            </div>
            {STANDINGS.map(({ pos, team, g, v, p, punti }) => {
              const isTrapani = team.toLowerCase().includes("trapani volley");
              return (
                <div key={team} style={{
                  display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px",
                  padding: "14px 20px", alignItems: "center",
                  background: isTrapani ? "rgba(111,29,43,0.18)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderLeft: isTrapani ? "3px solid #ff7676" : "3px solid transparent",
                }} className="tv-classifica-row">
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
        <p style={{ marginTop: 16, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          Dati di esempio — collega la classifica ufficiale del campionato per aggiornarla automaticamente.
        </p>
      </div>
    </section>
  );
}

/* ── Risultati ── */
function setWinnerIsHome(setScore: string) {
  const [a, b] = setScore.split("-").map(n => parseInt(n.trim(), 10));
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return a > b;
}

function Risultati() {
  const [ref, visible] = useInView();
  return (
    <section id="risultati" style={{ padding: "100px 24px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s", marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Stagione 2025/2026</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>Calendario e risultati</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {RISULTATI.map(({ giornata, casa, trasferta, setCasa, setTrasferta, set, vittoria }, i) => {
            const trapaniInCasa = casa.toLowerCase().includes("trapani volley");
            return (
              <AnimCard key={giornata} delay={i * 0.08}>
                <div style={{
                  background: "#181818",
                  border: `1px solid ${vittoria ? "rgba(111,29,43,0.4)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 16,
                  padding: "24px 28px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: 20,
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                }} className="tv-risultato-card">
                  {vittoria && (
                    <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#ff7676" }} />
                  )}

                  <div style={{ textAlign: "center", minWidth: 70 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Giornata</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: "#fff" }}>{giornata}</div>
                  </div>

                  <div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 90px 1fr",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 6,
                    }} className="tv-risultato-teams">
                      <span style={{
                        fontSize: "1rem",
                        fontWeight: trapaniInCasa ? 700 : 500,
                        color: trapaniInCasa ? "#fff" : "rgba(255,255,255,0.7)",
                        textAlign: "right",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {casa}
                      </span>
                      <span style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 900,
                        fontSize: "1.3rem",
                        color: "#ff7676",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}>
                        {setCasa} — {setTrasferta}
                      </span>
                      <span style={{
                        fontSize: "1rem",
                        fontWeight: !trapaniInCasa ? 700 : 500,
                        color: !trapaniInCasa ? "#fff" : "rgba(255,255,255,0.7)",
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {trasferta}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                      {set.map((s, idx) => {
                        const homeWon = setWinnerIsHome(s);
                        const trapaniWonSet = homeWon === null ? null : (trapaniInCasa ? homeWon : !homeWon);
                        return (
                          <span key={idx} style={{
                            fontSize: 11,
                            color: trapaniWonSet ? "#ff9d9d" : "rgba(255,255,255,0.5)",
                            background: trapaniWonSet ? "rgba(255,118,118,0.14)" : "rgba(255,255,255,0.05)",
                            border: trapaniWonSet ? "1px solid rgba(255,118,118,0.35)" : "1px solid transparent",
                            fontWeight: trapaniWonSet ? 700 : 400,
                            padding: "2px 8px", borderRadius: 6,
                          }}>
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                    padding: "6px 14px", borderRadius: 50,
                    background: vittoria ? "rgba(111,29,43,0.25)" : "rgba(255,255,255,0.08)",
                    color: vittoria ? "#ff7676" : "rgba(255,255,255,0.5)",
                    whiteSpace: "nowrap",
                  }}>
                    {vittoria ? "Vittoria" : "Sconfitta"}
                  </div>
                </div>
              </AnimCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Prossime partite ── */
function ProssimePartite() {
  const [ref, visible] = useInView();
  return (
    <section id="prossime-partite" style={{ padding: "0 24px 100px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s", marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>In arrivo</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>Prossime partite</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {PROSSIME_PARTITE.map(({ giornata, casa, trasferta, data, ora, luogo }, i) => (
            <AnimCard key={giornata} delay={i * 0.08}>
              <div style={{
                background: "#181818", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 24px",
              }}>
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
        <p style={{ marginTop: 16, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          Dati di esempio — aggiorna il calendario con le date ufficiali del campionato.
        </p>
      </div>
    </section>
  );
}

/* ── News ── */
function News() {
  const [ref, visible] = useInView();
  return (
    <section id="news" style={{ padding: "100px 24px", background: "#111" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s,transform 0.6s", marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>Aggiornamenti</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>Ultime notizie</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, alignItems: "start" }}>
          {NEWS.map(({ featured, badge, date, title, text, img }, i) => (
            <AnimCard key={title} delay={i * 0.1}>
              <article style={{
                background: featured ? "linear-gradient(135deg,#1a0e10 0%,#181818 100%)" : "#181818",
                border: `1px solid ${featured ? "rgba(111,29,43,0.35)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 20, overflow: "hidden",
                transition: "transform 0.25s,border-color 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(111,29,43,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = featured ? "rgba(111,29,43,0.35)" : "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: featured ? "16/10" : "16/9" }}>
                  <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
                  {badge && (
                    <span style={{ position: "absolute", top: 16, left: 16, background: "#6f1d2b", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 12px", borderRadius: 50 }}>{badge}</span>
                  )}
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginBottom: 10, letterSpacing: 0.3 }}>{date}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: featured ? "1.45rem" : "1.15rem", fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, marginBottom: 18 }}>{text}</p>
                  <a href="#" style={{ fontSize: 13, fontWeight: 700, color: "#ff7676", textDecoration: "none", letterSpacing: 0.3, transition: "opacity 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Leggi tutto →
                  </a>
                </div>
              </article>
            </AnimCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sponsor ── */
function Sponsor() {
  const [ref, visible] = useInView();
  return (
    <section style={{ padding: "60px 24px", background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.6s" }}>
        <span style={{ display: "block", textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>
          I nostri sponsor
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {SPONSORS.map(name => (
            <div key={name} style={{
              padding: "16px 28px", background: "#181818", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12,
              fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: 0.3,
            }}>
              {name}
            </div>
          ))}
        </div>
        <p style={{ marginTop: 16, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
          Spazio riservato agli sponsor — sostituisci con i loghi reali.
        </p>
      </div>
    </section>
  );
}

/* ── Newsletter ── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Collega qui una vera integrazione (es. Mailchimp, Resend, un endpoint API) per salvare l'iscrizione.
    setStatus("sent");
    setEmail("");
  };

  return (
    <div style={{
      maxWidth: 1100, margin: "0 auto 48px", background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "32px 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
    }}>
      <div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 6 }}>
          Resta aggiornato
        </h3>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
          Iscriviti per ricevere risultati e news di Trapani Volley via email.
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          required
          placeholder="La tua email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50,
            padding: "11px 18px", color: "#fff", fontSize: 14, minWidth: 220, outline: "none",
          }}
        />
        <button type="submit" style={{
          background: "#ff7676", border: "none", borderRadius: 50, color: "#fff",
          padding: "11px 26px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
        }}>
          {status === "sent" ? "Iscritto! ✓" : "Iscriviti"}
        </button>
      </form>
    </div>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer id="contatti" style={{ background: "#4f1218", padding: "64px 24px 0", color: "#fff", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <Newsletter />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "48px 40px", paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <Logo size={48} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 16, color: "#fff" }}>Trapani Volley</span>
          </div>
          <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.48)", fontStyle: "italic" }}>Passione, squadra, vittoria</p>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Contatti</h3>
          {[["Email", "info@trapanivolley.it"], ["Tel", "+39 123 456 789"], ["Indirizzo", "Palestra Comunale, Trapani (TP)"]].map(([k, v]) => (
            <p key={k} style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.62)", marginBottom: 8, lineHeight: 1.6 }}>
              <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>{k}:</strong> {v}
            </p>
          ))}
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Seguici</h3>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { href: "https://www.facebook.com/p/Trapani-Volley-61579947234427/", label: "Facebook", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { href: "https://www.instagram.com/trapanivolley/", label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
            ].map(({ href, label, d }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 42, height: 42, background: "rgba(255,255,255,0.08)", borderRadius: "50%",
                color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)",
                transition: "background 0.2s,transform 0.2s,border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#8a2236"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "transparent"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d}/></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          © {new Date().getFullYear()} Trapani Volley — Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}

/* ── Global styles ── */
function GlobalStyles() {
  useEffect(() => {
    const id = "tv-global-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #0d0d0d; color: #fff; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
      @keyframes tvFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes tvBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      @keyframes tvHeroZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
      .tv-desktop-nav { }
      .tv-hamburger { }
      @media (max-width: 760px) {
        .tv-desktop-nav { display: none !important; }
        .tv-hamburger { display: block !important; }
      }
      @media (max-width: 820px) {
        .tv-about-grid { grid-template-columns: 1fr !important; }
        .tv-risultato-card { grid-template-columns: 1fr !important; text-align: center !important; }
        .tv-risultato-teams { grid-template-columns: 1fr !important; }
        .tv-risultato-teams span { text-align: center !important; white-space: normal !important; }
      }
      @media (max-width: 560px) {
        .tv-classifica-header, .tv-classifica-row { grid-template-columns: 28px 1fr 34px 34px 34px 48px !important; padding-left: 12px !important; padding-right: 12px !important; }
      }
    `;
    document.head.appendChild(s);
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);
  return null;
}

/* ── App root ── */
export default function TrapaniVolley() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Wave />
      <Squadra />
      <Campionati />
      <Wave flip />
      <Classifica />
      <Risultati />
      <ProssimePartite />
      <News />
      <Sponsor />
      <Footer />
    </>
  );
}