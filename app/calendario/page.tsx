"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";
import Calendario from "../components/Calendario";
import type { Squadra } from "../data/calendario";

function CalendarioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // La squadra selezionata vive nell'URL: /calendario?squadra=maschile
  const squadra: Squadra =
    searchParams.get("squadra") === "maschile" ? "maschile" : "femminile";

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />
      <div style={{ height: 96 }} />

      {/* Toggle Femminile / Maschile */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 32 }}>
        <div style={{ display: "inline-flex", gap: 6, background: "rgba(0,0,0,0.06)", padding: 4, borderRadius: 50, border: "1px solid rgba(0,0,0,0.08)" }}>
          {(["femminile", "maschile"] as const).map((t) => (
            <button
              key={t}
              onClick={() => router.replace(`/calendario?squadra=${t}`, { scroll: false })}
              style={{
                background: squadra === t ? "#ff7676" : "transparent",
                color: squadra === t ? "#ffffff" : "rgba(0,0,0,0.55)",
                border: "none",
                borderRadius: 50,
                padding: "8px 24px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: "'DM Sans',sans-serif",
                transition: "all 0.3s ease",
              }}
            >
              {t === "femminile" ? "Femminile" : "Maschile"}
            </button>
          ))}
        </div>
      </div>

      <Calendario squadra={squadra} />
      <Footer />
    </main>
  );
}

// useSearchParams richiede un Suspense boundary in Next.js 15+
export default function CalendarioPage() {
  return (
    <Suspense fallback={null}>
      <CalendarioContent />
    </Suspense>
  );
}