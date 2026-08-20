// app/club/staff-tecnico/page.tsx
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";
import Header from "@/app/components/Header";
import { STAFF_TECNICO, slugifyStaff } from "@/app/data/staff";

/* ── Staff tecnico ── */
export default function StaffTecnicoPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />

      {/* Hero */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 40,
          textAlign: "center",
          background: "#f7f5f4",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a2236",
              display: "block",
              marginBottom: 8,
            }}
          >
            Guida Tecnica
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              color: "#6f1d2b",
              margin: 0,
            }}
          >
            Staff Tecnico
          </h1>
        </div>
      </section>

      {/* Griglia Staff */}
      <section style={{ padding: "60px 16px", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {STAFF_TECNICO.map(({ ruolo, nome, file }) => (
            <Link
              key={nome}
              href={`/club/staff-tecnico/${slugifyStaff(nome)}`}
              style={{
                position: "relative",
                height: 330,
                borderRadius: 16,
                overflow: "hidden",
                background: "linear-gradient(180deg, #2a0b12 0%, #120407 100%)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* Foto */}
              <Image
                src={file}
                alt={nome}
                fill
                sizes="(max-width: 768px) 50vw, 260px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />

              {/* Sfumatura testo */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(15, 6, 8, 0.95) 0%, rgba(15, 6, 8, 0.2) 60%, transparent 100%)",
                }}
              />

              {/* Info Nome + ruoli */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 10px",
                    lineHeight: 1.2,
                  }}
                >
                  {nome}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ruolo.split(", ").map((r) => (
                    <span
                      key={r}
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "#ff7676",
                        background: "rgba(255,118,118,0.15)",
                        padding: "3px 9px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}