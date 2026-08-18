// app/components/SponsorMarquee.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { SPONSOR } from "../data/sponsor";

export default function SponsorMarquee() {
  // duplichiamo la lista per ottenere il loop infinito senza scatti
  const loop = [...SPONSOR, ...SPONSOR];

  return (
    <section style={{ background: "#fff", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#8a2236", display: "block", marginBottom: 12 }}>
            Insieme a noi
          </span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#6f1d2b" }}>
            Sponsor &amp; Partner
          </h2>
        </div>
        <Link href="/sponsor" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#8a2236", textDecoration: "none", borderBottom: "1px solid rgba(138,34,54,0.4)", paddingBottom: 3 }}>
          Tutti i partner →
        </Link>
      </div>

      <div
        className="tv-sponsor-viewport"
        style={{
          position: "relative",
          width: "100%",
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="tv-sponsor-track" style={{ display: "flex", gap: 36, width: "max-content" }}>
          {loop.map((s, i) => {
            const card = (
              <div
                className="tv-sponsor-card"
                style={{
                  position: "relative",
                  width: "clamp(210px, 22vw, 300px)",
                  height: "clamp(150px, 15vw, 200px)",
                  flexShrink: 0,
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
                  padding: "6%",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image src={s.file} alt={s.name} fill style={{ objectFit: "contain" }} sizes="(max-width: 640px) 210px, 300px" />
                </div>
              </div>
            );

            return s.url ? (
              <Link
                key={`${s.name}-${i}`}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Vai al sito di ${s.name}`}
                style={{ display: "block", flexShrink: 0 }}
              >
                {card}
              </Link>
            ) : (
              <div key={`${s.name}-${i}`} aria-label={s.name} style={{ flexShrink: 0 }}>
                {card}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .tv-sponsor-track {
          animation: tv-sponsor-scroll 42s linear infinite;
        }
        .tv-sponsor-viewport:hover .tv-sponsor-track {
          animation-play-state: paused;
        }
        .tv-sponsor-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .tv-sponsor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
        }
        @keyframes tv-sponsor-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tv-sponsor-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}