// app/sponsor/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";
import { SPONSOR } from "../data/sponsor";

function SponsorGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(500px,1fr))",
        gap: 32,
      }}
    >
      {SPONSOR.map((s) => {
        const card = (
          <div
            className="tv-sponsor-card"
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              background: "#fff",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <Image
              src={s.file}
              alt={s.name}
              fill
              style={{ objectFit: "contain", padding: 14 }}
              sizes="(max-width: 760px) 90vw, 400px"
            />
          </div>
        );

        return s.url ? (
          <Link
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Vai al sito di ${s.name}`}
            className="tv-sponsor-link"
            style={{ display: "block" }}
          >
            {card}
          </Link>
        ) : (
          <div key={s.name} aria-label={s.name}>
            {card}
          </div>
        );
      })}

      <style jsx>{`
        .tv-sponsor-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .tv-sponsor-link {
          cursor: pointer;
        }
        .tv-sponsor-link:hover .tv-sponsor-card,
        .tv-sponsor-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(255, 118, 118, 0.25);
        }
      `}</style>
    </div>
  );
}

export default function SponsorPage() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <section
        style={{
          padding: "160px 24px 100px",
          background: "#0d0d0d",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
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
            Insieme a noi
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 48,
            }}
          >
            Sponsor & Partner
          </h1>

          <SponsorGrid />
        </div>
      </section>
      <Footer />
    </>
  );
}