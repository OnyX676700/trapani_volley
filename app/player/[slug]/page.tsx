// app/player/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GlobalStyles from "../../components/GlobalStyles";
import { ROSTER, slugify, type Athlete } from "../../data/roster";

function isValidImageUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

function findAthlete(slug: string): Athlete | undefined {
  const all = [...ROSTER.femminile, ...ROSTER.maschile];
  return all.find((a) => slugify(a) === slug);
}

export async function generateStaticParams() {
  const all = [...ROSTER.femminile, ...ROSTER.maschile];
  return all.map((a) => ({ slug: slugify(a) }));
}

// ⚠️ Next.js 15+: params è una Promise, va awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const atleta = findAthlete(slug);
  if (!atleta) return {};
  return {
    title: `${atleta.name} ${atleta.surname} – Roster`,
  };
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const atleta = findAthlete(slug);
  if (!atleta) notFound();

  const hasValidImage = isValidImageUrl(atleta.image);

  return (
    <main style={{ minHeight: "100vh", background: "#0f0608", color: "#ffffff" }}>
      <GlobalStyles />
      <Header />

      {/* Hero con foto + nome */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 40,
          background: "linear-gradient(180deg, #1f070d 0%, #0f0608 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
          <Link
            href="/roster"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontFamily: "'DM Sans',sans-serif",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 24,
            }}
          >
            ← Torna al Roster
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 40,
              alignItems: "center",
            }}
          >
            {/* Foto */}
            <div
              style={{
                position: "relative",
                width: 260,
                height: 340,
                borderRadius: 16,
                overflow: "hidden",
                background: "linear-gradient(180deg, #2a0b12 0%, #120407 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              }}
            >
              {hasValidImage ? (
                <Image
                  src={atleta.image!}
                  alt={`${atleta.name} ${atleta.surname}`}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 54,
                      fontWeight: 900,
                      color: "rgba(255,255,255,0.15)",
                      fontFamily: "'Playfair Display',serif",
                    }}
                  >
                    {atleta.number || "TV"}
                  </span>
                </div>
              )}
            </div>

            {/* Nome + ruolo */}
            <div>
              {atleta.number && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#ff7676",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  #{atleta.number} · {atleta.role}
                </span>
              )}
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {atleta.name} {atleta.surname}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Corpo pagina */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "50px 16px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 50 }}>
        {/* Colonna sinistra: Palmares + Carriera */}
        <div>
          {atleta.bio && (
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", marginBottom: 40 }}>
              {atleta.bio}
            </p>
          )}

          {atleta.palmares && atleta.palmares.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <SectionTitle>Palmares</SectionTitle>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {atleta.palmares.map((titolo, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "0.95rem",
                      fontFamily: "'DM Sans',sans-serif",
                      letterSpacing: 0.3,
                    }}
                  >
                    {titolo}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {atleta.carriera && atleta.carriera.length > 0 && (
            <div>
              <SectionTitle>Carriera</SectionTitle>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {atleta.carriera.map((stint, i) => (
                    <li
                        key={i}
                        style={{
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "0.95rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        fontFamily: "'DM Sans',sans-serif",
                        }}
                    >
                        <div style={{ display: "flex", gap: 12 }}>
                        <span style={{ color: "#ff7676", fontWeight: 700, minWidth: 110 }}>{stint.period}</span>
                        <span style={{ color: "rgba(255,255,255,0.85)" }}>{stint.team}</span>
                        </div>
                        {stint.category && (
                        <span style={{ marginLeft: 122, color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
                            {stint.category}
                        </span>
                        )}
                    </li>
                    ))}
              </ul>
            </div>
          )}
        </div>

        {/* Colonna destra: scheda dati */}
        <aside
          style={{
            background: "linear-gradient(180deg, #1a0509 0%, #120407 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: 24,
            height: "fit-content",
          }}
        >
          <SectionTitle noLine>Scheda</SectionTitle>
          <dl style={{ margin: 0 }}>
            <InfoRow label="Nome" value={`${atleta.name} ${atleta.surname}`} />
            {atleta.nationality && <InfoRow label="Nazionalità" value={atleta.nationality} />}
            <InfoRow label="Ruolo" value={atleta.role} />
            {atleta.birthplace && <InfoRow label="Luogo di nascita" value={atleta.birthplace} />}
            {atleta.number && <InfoRow label="Numero di maglia" value={String(atleta.number)} />}
            {atleta.height && <InfoRow label="Altezza" value={`${atleta.height} cm`} />}
            {atleta.birthday && <InfoRow label="Compleanno" value={atleta.birthday} />}
          </dl>
        </aside>
      </section>

      <Footer />
    </main>
  );
}

function SectionTitle({ children, noLine }: { children: React.ReactNode; noLine?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
      <h2
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "1.3rem",
          fontWeight: 800,
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {children}
      </h2>
      {!noLine && (
        <div
          style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(90deg, rgba(255,118,118,0.5) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        />
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        fontSize: "0.9rem",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <dt style={{ color: "rgba(255,255,255,0.5)" }}>{label}</dt>
      <dd style={{ margin: 0, textAlign: "right", fontWeight: 600 }}>{value}</dd>
    </div>
  );
}