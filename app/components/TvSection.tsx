// app/components/TvSection.tsx
"use client";

import Image from "next/image";
import { VIDEO } from "../data/video";

export default function TvSection() {
  return (
    <section id="la-tv" style={{ background: "#0d0d0d", padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff" }}>
              Trapani Volley TV
            </h2>
          </div>
          <a
            href="https://www.youtube.com/channel/UCaaqEfYWBDFiRgJ8cD9FAFQ"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#ff9d9d", textDecoration: "none", borderBottom: "1px solid rgba(255,157,157,0.4)", paddingBottom: 3 }}
          >
            Vai al canale →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {VIDEO.map((v, i) => (
            <a
              key={`${v.youtubeId}-${i}`}
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tv-video-card"
              style={{ display: "block", borderRadius: 18, overflow: "hidden", background: "#161616", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
                <Image
                  src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 60%)" }} />
                <span style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                  width: 54, height: 54, borderRadius: "50%", background: "rgba(255,118,118,0.92)",
                  display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 22px rgba(0,0,0,0.4)",
                  zIndex: 2
                }}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="#fff"><path d="M0 0l18 10L0 20V0z" /></svg>
                </span>
                <span style={{ position: "absolute", top: 14, left: 14, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "#fff", background: "rgba(111,29,43,0.85)", padding: "4px 10px", borderRadius: 50, zIndex: 2 }}>
                  {v.tag}
                </span>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#fff", lineHeight: 1.4, margin: 0 }}>{v.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tv-video-card {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .tv-video-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 118, 118, 0.4);
        }
      `}</style>
    </section>
  );
}