"use client";

import { SectionHeading, AnimCard } from "../lib/hooks";

// 1. Definiamo l'interfaccia per TypeScript
interface GiovanileItem {
  id: string | number;
  categoria: string;
  text: string;
}

// 2. Dati delle giovanili (se non li importi da un file esterno)
const GIOVANILI: GiovanileItem[] = [
  {
    id: "u12-15-f",
    categoria: "Under 12-13-14-15-17 Femminile",
    text: "Percorso completo di crescita tecnica e tattica dedicato al settore giovanile femminile.",
  },
  {
    id: "u17-m",
    categoria: "Under 17 Maschile",
    text: "Formazione atletica e agonistica per i giovani atleti del settore maschile.",
  },
];

export default function Giovanili() {
  return (
    <section id="giovanili" style={{ padding: "100px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow="Il nostro futuro" title="Settore Giovanile" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {GIOVANILI.map(({ id, categoria, text }: GiovanileItem, i: number) => (
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