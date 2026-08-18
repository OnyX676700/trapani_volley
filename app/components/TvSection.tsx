// app/components/TvSection.tsx
"use client";

import Image from "next/image";
import { VIDEO } from "../data/video";

const clampStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#fff",
  lineHeight: 1.35,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
} as React.CSSProperties;

export default function TvSection() {
  const [featured, ...rest] = VIDEO;

  if (!featured) return null;

  return (
    <section id="la-tv" style={{ background: "#ffffff", padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 700,
                color: "#6f1d2b",
              }}
            >
              Trapani Volley TV
            </h2>
          </div>

          <a
            href="https://www.youtube.com/channel/UCaaqEfYWBDFiRgJ8cD9FAFQ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              color: "#6f1d2b",
              textDecoration: "none",
              borderBottom: "1px solid rgba(111,29,43,0.4)",
              paddingBottom: 3,
            }}
          >
            Vai al canale →
          </a>
        </div>

        {/* ── Video in evidenza (grande, sopra) ── */}
        <a
          href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tv-video-card tv-video-featured"
          style={{
            display: "block",
            borderRadius: 20,
            overflow: "hidden",
            background: "#161616",
            border: "1px solid rgba(255,255,255,0.08)",
            textDecoration: "none",
            marginBottom: 28,
          }}
        >
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
            <Image
              src={`https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg`}
              alt={featured.title}
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: 74,
                height: 74,
                borderRadius: "50%",
                background: "rgba(255,118,118,0.92)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
                zIndex: 2,
              }}
            >
              <svg width="24" height="27" viewBox="0 0 18 20" fill="#fff">
                <path d="M0 0l18 10L0 20V0z" />
              </svg>
            </span>
            <span
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#fff",
                background: "rgba(111,29,43,0.9)",
                padding: "5px 12px",
                borderRadius: 50,
                zIndex: 2,
              }}
            >
              {featured.tag}
            </span>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 26px", zIndex: 2 }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.15rem,2.2vw,1.6rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.3,
                  margin: 0,
                  maxWidth: 700,
                }}
              >
                {featured.title}
              </h3>
            </div>
          </div>
        </a>

        {/* ── Griglia video secondari (piccoli, sotto) ── */}
        <div className="tv-secondary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {rest.map((v, i) => (
            <a
              key={`${v.youtubeId}-${i}`}
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tv-video-card tv-video-thumb"
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 14,
                overflow: "hidden",
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
                <Image
                  src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,118,118,0.92)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                  }}
                >
                  <svg width="12" height="13" viewBox="0 0 18 20" fill="#fff">
                    <path d="M0 0l18 10L0 20V0z" />
                  </svg>
                </span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "#ff9d9d",
                    marginBottom: 6,
                  }}
                >
                  {v.tag}
                </span>
                <h3 style={clampStyle}>{v.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tv-video-card {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .tv-video-featured:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 118, 118, 0.4);
        }
        .tv-video-thumb:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 118, 118, 0.4);
        }
        @media (max-width: 980px) {
          .tv-secondary-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 700px) {
          .tv-secondary-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 460px) {
          .tv-secondary-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}