"use client";

import { AnimCard, SectionHeading } from "../lib/hooks";
import { getCalendario, type Squadra } from "../data/calendario";

const isTrapani = (team: string) => team.toLowerCase().includes("trapani volley");

function setWinnerIsHome(setScore: string) {
  const [a, b] = setScore.split("-").map((n) => parseInt(n.trim(), 10));
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return a > b;
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "0.95rem", margin: 0 }}>{children}</p>
  );
}

export default function Calendario({ squadra = "femminile" }: { squadra?: Squadra }) {
  const { classifica, risultati, prossime } = getCalendario(squadra);
  const label = squadra === "maschile" ? "Maschile" : "Femminile";

  // dal più recente al più vecchio
  const risultatiOrdinati = [...risultati].sort((a, b) => b.giornata - a.giornata);
  // dalla più vicina alla più lontana
  const prossimeOrdinate = [...prossime].sort((a, b) => a.giornata - b.giornata);

  return (
    <section id="calendario" className="tv-section" style={{ padding: "100px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow={`Calendario ${label}`} title="Stagione 2026/2027" />

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#6f1d2b", marginBottom: 20 }}>Classifica</h3>
        <div style={{ marginBottom: 60 }}>
          {classifica.length === 0 ? (
            <EmptyState>Classifica non ancora disponibile.</EmptyState>
          ) : (
            <AnimCard>
              <div style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, overflow: "hidden", maxWidth: 900 }}>
                <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px", padding: "14px 20px", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", borderBottom: "1px solid rgba(0,0,0,0.08)" }} className="tv-classifica-header">
                  <span>#</span><span>Squadra</span><span style={{ textAlign: "center" }}>G</span><span style={{ textAlign: "center" }}>V</span><span style={{ textAlign: "center" }}>P</span><span style={{ textAlign: "center" }}>Punti</span>
                </div>
                {classifica.map(({ pos, team, g, v, p, punti }) => {
                  const nostra = isTrapani(team);
                  return (
                    <div key={team} style={{ display: "grid", gridTemplateColumns: "40px 1fr 44px 44px 44px 56px", padding: "14px 20px", alignItems: "center", background: nostra ? "rgba(111,29,43,0.1)" : "transparent", borderBottom: "1px solid rgba(0,0,0,0.06)", borderLeft: nostra ? "3px solid #ff7676" : "3px solid transparent" }} className="tv-classifica-row">
                      <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, color: nostra ? "#ff7676" : "rgba(0,0,0,0.5)" }}>{pos}</span>
                      <span style={{ fontWeight: nostra ? 700 : 500, color: nostra ? "#111" : "rgba(0,0,0,0.7)", fontSize: "0.92rem" }}>{team}</span>
                      <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(0,0,0,0.55)" }}>{g}</span>
                      <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(0,0,0,0.55)" }}>{v}</span>
                      <span style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(0,0,0,0.55)" }}>{p}</span>
                      <span style={{ textAlign: "center", fontWeight: 700, color: nostra ? "#ff7676" : "#111" }}>{punti}</span>
                    </div>
                  );
                })}
              </div>
            </AnimCard>
          )}
        </div>

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#6f1d2b", marginBottom: 20 }}>Risultati</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 60 }}>
          {risultatiOrdinati.length === 0 && <EmptyState>Nessun risultato disponibile.</EmptyState>}
          {risultatiOrdinati.map(({ giornata, casa, trasferta, setCasa, setTrasferta, set }, i) => {
            const trapaniInCasa = isTrapani(casa);
            // la vittoria si ricava dai set, non serve salvarla
            const vittoria = trapaniInCasa ? setCasa > setTrasferta : setTrasferta > setCasa;
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
        {prossimeOrdinate.length === 0 && <EmptyState>Nessuna partita in programma.</EmptyState>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {prossimeOrdinate.map(({ giornata, casa, trasferta, data, ora, luogo }, i) => (
            <AnimCard key={giornata} delay={i * 0.08}>
              <div style={{ background: "#f7f5f4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>Giornata {giornata}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#8a2236", background: "rgba(255,118,118,0.16)", padding: "3px 10px", borderRadius: 50 }}>{data}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14, fontSize: "0.95rem", flexWrap: "wrap", textAlign: "center" }}>
                  <span style={{ fontWeight: isTrapani(casa) ? 700 : 500, color: isTrapani(casa) ? "#111" : "rgba(0,0,0,0.65)" }}>{casa}</span>
                  <span style={{ color: "rgba(0,0,0,0.35)" }}>vs</span>
                  <span style={{ fontWeight: isTrapani(trasferta) ? 700 : 500, color: isTrapani(trasferta) ? "#111" : "rgba(0,0,0,0.65)" }}>{trasferta}</span>
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