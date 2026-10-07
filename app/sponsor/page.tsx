// app/sponsor/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";
import { SPONSOR, MAIN_SPONSOR, COLLABORAZIONI, type SponsorSenzaLivello } from "../data/sponsor";

/* Ordine e stile di ogni fascia, dal più alto al più basso */
const LIVELLI = [
  { key: "diamante", label: "Sponsor Diamante", color: "#b9e0ff" },
  { key: "platino", label: "Sponsor Platino", color: "#e5e4e2" },
  { key: "oro", label: "Sponsor Oro", color: "#d4af37" },
  { key: "argento", label: "Sponsor Argento", color: "#c0c0c0" },
  { key: "bronzo", label: "Sponsor Bronzo", color: "#cd7f32" },
] as const;

type GridItem = SponsorSenzaLivello & { etichetta?: string };

/* Main sponsor: uno per squadra, con didascalia sotto il logo */
const MAIN_ITEMS: GridItem[] = [
  { ...MAIN_SPONSOR.femminile, etichetta: "Main Sponsor Femminile" },
  { ...MAIN_SPONSOR.maschile, etichetta: "Main Sponsor Maschile" },
];

function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 28,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <h2
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "rgba(255,255,255,0.12)",
        }}
      />
    </div>
  );
}

function SponsorGrid({ items }: { items: GridItem[] }) {
  return (
    <div
      className="tv-sponsor-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(370px,1fr))",
        gap: 32,
      }}
    >
      {items.map((s) => {
        const card = (
          <div
            className="tv-sponsor-card"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "380px",
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
              style={{ objectFit: "contain", padding: 1 }}
              sizes="(max-width: 640px) 50vw, 380px"
            />
          </div>
        );

        const caption = s.etichetta ? (
          <span
            style={{
              display: "block",
              marginTop: 12,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#ff7676",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {s.etichetta}
          </span>
        ) : null;

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
            {caption}
          </Link>
        ) : (
          <div key={s.name} aria-label={s.name}>
            {card}
            {caption}
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
        className="tv-page-top tv-page-bottom"
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
            className="tv-page-title"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 64,
            }}
          >
            Sponsor & Partner
          </h1>

          {/* Main Sponsor */}
          <div style={{ marginBottom: 72 }}>
            <SectionHeader label="Main Sponsor" color="#ff7676" />
            <SponsorGrid items={MAIN_ITEMS} />
          </div>

          {/* Fasce per livello */}
          {LIVELLI.map(({ key, label, color }) => {
            const sponsorDelLivello = SPONSOR.filter(
              (s) => s.livello === key
            );
            if (sponsorDelLivello.length === 0) return null;

            return (
              <div key={key} style={{ marginBottom: 72 }}>
                <SectionHeader label={label} color={color} />
                <SponsorGrid items={sponsorDelLivello} />
              </div>
            );
          })}

          {/* Collaborazioni */}
          {COLLABORAZIONI.length > 0 && (
            <div style={{ marginBottom: 72 }}>
              <SectionHeader label="Collaborazioni" color="rgba(255,255,255,0.6)" />
              <SponsorGrid items={COLLABORAZIONI} />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}