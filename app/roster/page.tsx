"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";
import { ROSTER, ROLE_ORDER, type Athlete } from "../data/roster";

function isValidImageUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

export default function RosterPage() {
  const [tab, setTab] = useState<"femminile" | "maschile">("femminile");
  const list = ROSTER[tab];

  // Raggruppa gli atleti per ruolo
  const groupedAthletes = list.reduce<Record<string, Athlete[]>>((acc, athlete) => {
    const roleKey = athlete.role.trim() || "Altri Ruoli";
    if (!acc[roleKey]) acc[roleKey] = [];
    acc[roleKey].push(athlete);
    return acc;
  }, {});

  // Ordina i ruoli secondo l'ordine prefissato
  const sortedRoles = Object.keys(groupedAthletes).sort((a, b) => {
    const indexA = ROLE_ORDER.indexOf(a);
    const indexB = ROLE_ORDER.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <main style={{ minHeight: "100vh", background: "#0f0608", color: "#ffffff" }}>
      <GlobalStyles />
      <Header />

      {/* Hero / Header Pagina */}
      <section style={{ paddingTop: 140, paddingBottom: 40, textAlign: "center", background: "linear-gradient(180deg, #1f070d 0%, #0f0608 100%)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#ff7676", display: "block", marginBottom: 8 }}>
            Stagione {ROSTER.stagione}
          </span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, margin: "0 0 20px" }}>
            Il Roster Ufficiale
          </h1>

          {/* Toggle Maschile / Femminile */}
          <div style={{ display: "inline-flex", gap: 6, background: "rgba(255,255,255,0.08)", padding: 4, borderRadius: 50, border: "1px solid rgba(255,255,255,0.12)" }}>
            {(["femminile", "maschile"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? "#ff7676" : "transparent",
                  color: tab === t ? "#ffffff" : "rgba(255,255,255,0.6)",
                  border: "none",
                  borderRadius: 50,
                  padding: "8px 24px",
                  fontSize: 12,
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
        </div>
      </section>

      {/* Griglia divisa per Ruoli */}
      <section style={{ padding: "60px 16px", maxWidth: 1200, margin: "0 auto" }}>
        {list.length === 0 ? (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", margin: "60px 0" }}>
            Rosa {tab} in fase di completamento.
          </p>
        ) : (
          sortedRoles.map((role) => (
            <div key={role} style={{ marginBottom: 50 }}>
              {/* Titolo del Ruolo */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                  {role}
                </h2>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,118,118,0.5) 0%, rgba(255,255,255,0.05) 100%)" }} />
              </div>

              {/* Grid Atlete del Ruolo */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 20
                }}
              >
                {groupedAthletes[role].map((atleta, index) => {
                  const hasValidImage = isValidImageUrl(atleta.image);

                  return (
                    <div
                      key={`${atleta.surname}-${index}`}
                      style={{
                        position: "relative",
                        height: 330,
                        borderRadius: 16,
                        overflow: "hidden",
                        background: "linear-gradient(180deg, #2a0b12 0%, #120407 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
                      }}
                    >
                      {/* Foto dell'atleta */}
                      {hasValidImage ? (
                        <Image
                          src={atleta.image!}
                          alt={`${atleta.name} ${atleta.surname}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 260px"
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#21090d" }}>
                          <span style={{ fontSize: 36, fontWeight: 900, color: "rgba(255,255,255,0.15)", fontFamily: "'Playfair Display',serif" }}>
                            {atleta.number || "TV"}
                          </span>
                        </div>
                      )}

                      {/* Sfumatura testo */}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15, 6, 8, 0.95) 0%, rgba(15, 6, 8, 0.2) 60%, transparent 100%)" }} />

                      {/* Numero Maglia */}
                      {atleta.number && (
                        <div style={{ position: "absolute", top: 12, right: 14, fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 900, color: "var(--color-granata-dark)" }}>
                          #{atleta.number}
                        </div>
                      )}

                      {/* Info Nome */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px" }}>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
                          <span style={{ display: "block", fontWeight: 400, fontSize: "0.9rem", opacity: 0.85 }}>
                            {atleta.name}
                          </span>
                          {atleta.surname}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>

      <Footer />
    </main>
  );
}