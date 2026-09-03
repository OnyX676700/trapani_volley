"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useInView, AnimCard } from "../lib/hooks";

const maroonDark = "#5c1622";
const maroon = "#6f1d2b";
const maroonMid = "#8a2236";
const coral = "#e8574f";
const ink = "rgba(20,20,20,0.72)";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'Playfair Display',serif",
        fontStyle: "italic",
        fontSize: "1.05rem",
        color: maroonMid,
        display: "block",
        marginBottom: 10,
      }}
    >
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center", padding: "8px 12px" }}>
      <div
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "2.6rem",
          fontWeight: 700,
          color: maroon,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: "0.92rem", color: "rgba(20,20,20,0.6)" }}>{label}</div>
    </div>
  );
}

export default function Storia() {
  const [ref, visible] = useInView();
  return (
    <section id="storia" style={{ background: "#ffffff" }}>
      {/* Hero */}
      <div style={{ padding: "100px 24px 80px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
          className="tv-about-grid"
        >
          <div
            ref={ref}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.6s,transform 0.6s",
            }}
          >
            <SectionLabel>Chi siamo</SectionLabel>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 700,
                color: maroon,
                marginBottom: 20,
                lineHeight: 1.15,
              }}
            >
              La nostra storia
            </h2>
            <p style={{ fontSize: "1.05rem", color: ink, lineHeight: 1.85 }}>
              Fondata nel <strong style={{ color: "#111" }}>2025</strong>, Trapani Volley nasce con un obiettivo
              preciso: diventare la{" "}
              <strong style={{ color: "#111" }}>scuola di pallavolo di riferimento della città di Trapani</strong>,
              costruendo nel tempo una realtà sportiva solida, organizzata e capace di coinvolgere atleti, famiglie
              e territorio.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(0,0,0,0.18)",
              aspectRatio: "4/3",
            }}
          >
            <Image src="/img/storia.jpg" alt="Presidente Trapani Volley con la coppa" fill style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* Founding pull-quote */}
      <AnimCard>
        <div style={{ padding: "0 24px 90px" }}>
          <div
            style={{
              maxWidth: 780,
              margin: "0 auto",
              borderLeft: `3px solid ${coral}`,
              paddingLeft: 28,
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.35rem",
                lineHeight: 1.6,
                color: "#1a1a1a",
              }}
            >
              Oggi Trapani Volley è l&apos;unica società a rappresentare i colori granata, portando il nome della
              città nei campionati ufficiali <strong>FIPAV</strong> e <strong>PGS</strong>.
            </p>
          </div>
        </div>
      </AnimCard>

      {/* Growth in numbers */}
      <div style={{ background: "#faf7f5", padding: "80px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <AnimCard>
            <SectionLabel>Una crescita straordinaria</SectionLabel>
            <p style={{ fontSize: "1.02rem", color: ink, lineHeight: 1.9, marginBottom: 40 }}>
              In soli otto mesi di attività, la società ha dato vita a un settore giovanile articolato: un progetto
              che parte dai più piccoli, con i corsi di Minivolley, e arriva alle prime squadre.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
                marginBottom: 40,
                padding: "28px 0",
                borderTop: "1px solid rgba(0,0,0,0.08)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Stat value="160+" label="atleti tesserati" />
              <Stat value="7" label="campionati FIPAV, oltre ai campionati PGS" />
              <Stat value="8" label="mesi di attività" />
            </div>

            <p style={{ fontSize: "1.02rem", color: ink, lineHeight: 1.9, marginBottom: 16 }}>
              La struttura della società è composta da:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Serie D Femminile", "Serie D Maschile", "Formazioni giovanili", "Corsi di Minivolley"].map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "0.92rem",
                    color: maroonMid,
                    border: `1px solid ${maroonMid}`,
                    borderRadius: 999,
                    padding: "7px 16px",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </AnimCard>
        </div>
      </div>

      {/* Results */}
      <div style={{ padding: "90px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <AnimCard>
            <SectionLabel>Il successo in campo</SectionLabel>
            <p style={{ fontSize: "1.02rem", color: ink, lineHeight: 1.9, marginBottom: 32 }}>
              La prima stagione ha già regalato risultati importanti, confermando la qualità del lavoro svolto.
            </p>
          </AnimCard>

          <AnimCard delay={0.05}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              <div style={{ borderLeft: `3px solid ${maroon}`, paddingLeft: 20 }}>
                <p style={{ fontSize: "0.85rem", color: "rgba(20,20,20,0.5)", marginBottom: 8 }}>
                  Prima Squadra Femminile
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: maroon,
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  Promozione in Serie D
                </p>
                <p style={{ fontSize: "0.98rem", color: ink, lineHeight: 1.7 }}>
                  Campionato vinto da imbattuta dopo 15 gare: un traguardo storico per una società nata da appena
                  pochi mesi.
                </p>
              </div>

              <div style={{ borderLeft: `3px solid ${maroon}`, paddingLeft: 20 }}>
                <p style={{ fontSize: "0.85rem", color: "rgba(20,20,20,0.5)", marginBottom: 8 }}>
                  Prima Squadra Maschile
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: maroon,
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  3º posto alle Finali Regionali PGS
                </p>
                <p style={{ fontSize: "0.98rem", color: ink, lineHeight: 1.7 }}>
                  Disputate a Messina, a conferma della solidità del percorso costruito in pochi mesi.
                </p>
              </div>
            </div>
          </AnimCard>
        </div>
      </div>

      {/* Territorio */}
      <div style={{ background: "#faf7f5", padding: "90px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <AnimCard>
            <SectionLabel>Una società radicata nella città</SectionLabel>
            <p style={{ fontSize: "1.02rem", color: ink, lineHeight: 1.9, marginBottom: 16 }}>
              La crescita di Trapani Volley è sostenuta da uno staff qualificato, formato da allenatori federali,
              dirigenti e professionisti della comunicazione, e da una presenza capillare sul territorio.
            </p>
            <p style={{ fontSize: "1.02rem", color: ink, lineHeight: 1.9, marginBottom: 16 }}>
              La società gestisce infatti alcune palestre scolastiche, distribuite in diversi quartieri della
              città, creando una rete di spazi che permette di svolgere quotidianamente tutte le attività sportive e
              di portare la pallavolo sempre più vicino alle famiglie trapanesi.
            </p>
            <p style={{ fontSize: "1.02rem", color: ink, lineHeight: 1.9 }}>
              Per Trapani Volley, infatti, fare sport significa anche creare comunità, offrire ai giovani un
              ambiente sano in cui crescere e contribuire alla valorizzazione del territorio.
            </p>
          </AnimCard>
        </div>
      </div>

      {/* Community digitale */}
      <div style={{ padding: "90px 24px" }}>
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            alignItems: "center",
          }}
        >
          <AnimCard>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "4rem",
                fontWeight: 700,
                color: maroon,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              ~4M
            </div>
          </AnimCard>
          <AnimCard delay={0.05}>
            <div style={{ flex: "1 1 320px", minWidth: 0 }}>
              <SectionLabel>Una squadra anche fuori dal campo</SectionLabel>
              <p style={{ fontSize: "1.02rem", color: ink, lineHeight: 1.9 }}>
                In pochi mesi, Trapani Volley ha costruito una community digitale in costante espansione,
                raggiungendo circa 4 milioni di visualizzazioni complessive nei primi otto mesi di attività. Una
                presenza online che racconta quotidianamente la vita della società, le partite, gli atleti e i
                valori del progetto.
              </p>
            </div>
          </AnimCard>
        </div>
      </div>

      {/* Closing manifesto */}
      <div style={{ background: maroonDark, padding: "100px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <AnimCard>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.5rem,3vw,2rem)",
                fontStyle: "italic",
                color: "#f7ece9",
                lineHeight: 1.5,
                marginBottom: 28,
              }}
            >
              Una società giovane, ma con una visione chiara: crescere, formare e rappresentare Trapani attraverso
              la pallavolo. Perché la nostra storia è appena iniziata.
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: 0.5,
                color: coral,
              }}
            >
              Trapani Volley. Una città. Un colore. Una squadra. Un futuro da costruire insieme.
            </p>
          </AnimCard>
        </div>
      </div>
    </section>
  );
}