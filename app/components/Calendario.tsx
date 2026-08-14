"use client";

import { AnimCard, SectionHeading } from "../lib/hooks";

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

function setWinnerIsHome(setScore: string) {
  const [a, b] = setScore.split("-").map((n) => parseInt(n.trim(), 10));
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return a > b;
}

export default function Calendario() {
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