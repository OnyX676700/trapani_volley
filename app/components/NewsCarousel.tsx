// app/components/NewsCarousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NEWS } from "../data/news";

const AUTOPLAY_MS = 6500;

export default function NewsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = NEWS.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, count]);

  if (count === 0) return null;

  const go = (i: number) => setIndex(((i % count) + count) % count);

  return (
    <section
      id="news"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", background: "#160a0c", padding: "90px 24px", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 0%, rgba(111,29,43,0.35), transparent 55%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#ff7676", display: "block", marginBottom: 12 }}>
              Aggiornamenti
            </span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>
              Ultime notizie
            </h2>
          </div>
          <Link href="/news" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#ff9d9d", textDecoration: "none", borderBottom: "1px solid rgba(255,157,157,0.4)", paddingBottom: 3 }}>
            Tutte le notizie →
          </Link>
        </div>

        {/* Slide principale */}
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "16/8", boxShadow: "0 30px 70px rgba(0,0,0,0.45)" }} className="tv-news-slide">
          {NEWS.map((item, i) => (
            <div
              key={item.slug}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === index ? 1 : 0,
                transition: "opacity 0.7s ease",
                pointerEvents: i === index ? "auto" : "none",
              }}
            >
              <Image src={item.img} alt={item.title} fill priority={i === 0} style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 1200px" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,4,5,0.92) 0%, rgba(10,4,5,0.35) 55%, rgba(10,4,5,0.1) 100%)" }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "36px 40px" }}>
                {item.badge && (
                  <span style={{ display: "inline-block", background: "#6f1d2b", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, marginBottom: 14 }}>
                    {item.badge}
                  </span>
                )}
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>{item.date}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.3rem,2.6vw,2rem)", fontWeight: 700, color: "#fff", marginBottom: 10, maxWidth: 640 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 560 }}>{item.text}</p>
              </div>
            </div>
          ))}

          {count > 1 && (
            <>
              <button
                aria-label="Notizia precedente"
                onClick={() => go(index - 1)}
                style={navBtnStyle("left")}
              >
                ‹
              </button>
              <button
                aria-label="Notizia successiva"
                onClick={() => go(index + 1)}
                style={navBtnStyle("right")}
              >
                ›
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {NEWS.map((item, i) => (
              <button
                key={item.slug}
                aria-label={`Vai alla notizia ${i + 1}`}
                onClick={() => go(i)}
                style={{
                  width: i === index ? 26 : 8,
                  height: 8,
                  borderRadius: 50,
                  border: "none",
                  background: i === index ? "#ff7676" : "rgba(255,255,255,0.25)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function navBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 18,
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.35)",
    color: "#fff",
    fontSize: 24,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
  } as React.CSSProperties;
}