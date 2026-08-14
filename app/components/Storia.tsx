"use client";

import Image from "next/image";
import { useInView, AnimCard } from "../lib/hooks";

export default function Storia() {
  const [ref, visible] = useInView();
  return (
    <section id="storia" style={{ padding: "100px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
            marginBottom: 80,
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
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#8a2236",
                display: "block",
                marginBottom: 12,
              }}
            >
              Chi siamo
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 700,
                color: "#6f1d2b",
                marginBottom: 20,
                lineHeight: 1.15,
              }}
            >
              La nostra storia
            </h2>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#8a2236",
                marginBottom: 16,
              }}
            >
              Una nuova realtà, una grande ambizione
            </h3>
            <p style={{ fontSize: "1.05rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.85 }}>
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

        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 44 }}>
          <AnimCard>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              Trapani Volley è oggi{" "}
              <strong style={{ color: "#111" }}>l&apos;unica società pallavolistica a rappresentare i colori granata</strong>,
              portando con orgoglio il nome della città nei campionati ufficiali{" "}
              <strong style={{ color: "#111" }}>FIPAV e PGS</strong>.
            </p>
          </AnimCard>

          <AnimCard delay={0.05}>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#6f1d2b",
                marginBottom: 16,
              }}
            >
              Una crescita straordinaria
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 20 }}>
              Il percorso della società è stato fin da subito caratterizzato da una crescita importante. In soli
              otto mesi di attività, Trapani Volley ha raggiunto{" "}
              <strong style={{ color: "#111" }}>oltre 160 atleti tesserati</strong>, dando vita a un settore
              giovanile articolato e a un progetto che parte dai più piccoli, con i corsi di{" "}
              <strong style={{ color: "#111" }}>Minivolley</strong>, e arriva alle prime squadre.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La società partecipa complessivamente a{" "}
              <strong style={{ color: "#111" }}>sette campionati FIPAV</strong>, oltre ai campionati PGS, con una
              struttura composta da:
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Serie D Femminile", "Serie D Maschile", "numerose formazioni giovanili", "corsi di Minivolley"].map(
                (item) => (
                  <li
                    key={item}
                    style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.02rem", color: "rgba(20,20,20,0.8)" }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff7676", flexShrink: 0 }} />
                    {item}
                  </li>
                )
              )}
            </ul>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginTop: 20 }}>
              Un percorso pensato per accompagnare ogni atleta nella propria crescita, sportiva e personale.
            </p>
          </AnimCard>

          <AnimCard delay={0.1}>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#6f1d2b",
                marginBottom: 16,
              }}
            >
              Il successo in campo
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La prima stagione ha già regalato risultati importanti, confermando la qualità del lavoro svolto.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La <strong style={{ color: "#111" }}>Prima Squadra Femminile</strong> ha conquistato la{" "}
              <strong style={{ color: "#111" }}>promozione in Serie D</strong>, vincendo il campionato da imbattuta
              dopo <strong style={{ color: "#111" }}>15 gare</strong>: un traguardo storico per una società nata da
              appena pochi mesi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              Importante anche il percorso della <strong style={{ color: "#111" }}>Prima Squadra Maschile</strong>,
              capace di raggiungere il <strong style={{ color: "#111" }}>3º posto alle Finali Regionali PGS di Messina</strong>.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              Risultati che rappresentano soltanto l&apos;inizio di un progetto costruito con ambizione, passione e
              programmazione.
            </p>
          </AnimCard>

          <AnimCard delay={0.15}>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#6f1d2b",
                marginBottom: 16,
              }}
            >
              Una società radicata nella città
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La crescita di Trapani Volley è sostenuta da uno <strong style={{ color: "#111" }}>staff qualificato</strong>,
              formato da allenatori federali, dirigenti e professionisti della comunicazione, e da una presenza
              capillare sul territorio.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La società gestisce infatti <strong style={{ color: "#111" }}>alcune palestre scolastiche</strong>,
              distribuite in diversi quartieri della città, creando una rete di spazi che permette di svolgere
              quotidianamente tutte le attività sportive e di portare la pallavolo sempre più vicino alle famiglie
              trapanesi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              Per Trapani Volley, infatti, fare sport significa anche creare comunità, offrire ai giovani un
              ambiente sano in cui crescere e contribuire alla valorizzazione del territorio.
            </p>
          </AnimCard>

          <AnimCard delay={0.2}>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#6f1d2b",
                marginBottom: 16,
              }}
            >
              Una squadra anche fuori dal campo
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              La nostra crescita non si misura soltanto attraverso i risultati sportivi.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9 }}>
              In pochi mesi, Trapani Volley ha costruito una{" "}
              <strong style={{ color: "#111" }}>community digitale in costante espansione</strong>, raggiungendo
              circa <strong style={{ color: "#111" }}>4 milioni di visualizzazioni complessive nei primi otto mesi
              di attività</strong>. Una presenza online che racconta quotidianamente la vita della società, le
              partite, gli atleti e i valori del progetto, creando un punto di incontro tra squadra, tifosi,
              famiglie e territorio.
            </p>
          </AnimCard>

          <AnimCard delay={0.25}>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#6f1d2b",
                marginBottom: 16,
              }}
            >
              Il futuro è granata
            </h3>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              Trapani Volley è una società giovane, ma con una visione chiara:{" "}
              <strong style={{ color: "#111" }}>crescere, formare e rappresentare Trapani attraverso la pallavolo</strong>.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 16 }}>
              Ogni atleta, ogni allenatore, ogni dirigente, ogni famiglia e ogni partner fa parte di un progetto
              che guarda al futuro con entusiasmo e ambizione.
            </p>
            <p style={{ fontSize: "1.02rem", color: "rgba(20,20,20,0.72)", lineHeight: 1.9, marginBottom: 28 }}>
              Perché la nostra storia è appena iniziata.
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#8a2236",
                lineHeight: 1.5,
                borderLeft: "3px solid #ff7676",
                paddingLeft: 20,
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