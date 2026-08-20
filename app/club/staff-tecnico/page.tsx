// app/club/staff-tecnico/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";
import Header from "@/app/components/Header";
import { STAFF_TECNICO, slugifyStaff } from "@/app/data/staff";

/* ── Staff tecnico ── */
export default function StaffTecnicoPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />

      <section
        style={{
          padding: "140px 24px 100px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 56, textAlign: "center" }}>
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
            Guida Tecnica
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.5rem,5vw,3.5rem)",
              fontWeight: 700,
              color: "#6f1d2b",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Staff Tecnico
          </h1>
          <div
            style={{
              width: 60,
              height: 3,
              background: "#8a2236",
              margin: "20px auto 0",
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 28,
          }}
        >
          {STAFF_TECNICO.map(({ ruolo, nome, file }) => {
            const isHovered = hovered === nome;
            return (
              <Link
                key={nome}
                href={`/club/staff-tecnico/${slugifyStaff(nome)}`}
                onMouseEnter={() => setHovered(nome)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  background: "#f7f5f4",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 20,
                  padding: "28px",
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                  overflow: "hidden",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 16px 32px rgba(111,29,43,0.16)"
                    : "0 1px 2px rgba(0,0,0,0.03)",
                  borderColor: isHovered
                    ? "rgba(138,34,54,0.35)"
                    : "rgba(0,0,0,0.08)",
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                }}
              >
                {/* Foto dello Staff */}
                <div
                  style={{
                    position: "relative",
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#e0e0e0",
                    border: "3px solid #ffffff",
                    boxShadow: isHovered
                      ? "0 0 0 3px rgba(138,34,54,0.4)"
                      : "0 0 0 3px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.25s ease",
                  }}
                >
                  <Image
                    src={file}
                    alt={nome}
                    fill
                    sizes="84px"
                    style={{
                      objectFit: "cover",
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: isHovered ? "#6f1d2b" : "#111111",
                      marginBottom: 8,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {nome}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {ruolo.split(", ").map((r) => (
                      <span
                        key={r}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#8a2236",
                          background: "rgba(255,118,118,0.12)",
                          padding: "4px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Freccia indicativa al hover */}
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "1.4rem",
                    color: "#8a2236",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateX(0)" : "translateX(-6px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}