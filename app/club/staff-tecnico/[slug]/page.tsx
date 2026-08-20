// app/club/staff-tecnico/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GlobalStyles from "@/app/components/GlobalStyles";
import { STAFF_TECNICO, slugifyStaff, type StaffMember } from "@/app/data/staff";

function findStaffMember(slug: string): StaffMember | undefined {
  return STAFF_TECNICO.find((s) => slugifyStaff(s.nome) === slug);
}

export async function generateStaticParams() {
  return STAFF_TECNICO.map((s) => ({ slug: slugifyStaff(s.nome) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const membro = findStaffMember(slug);
  if (!membro) return {};
  return {
    title: `${membro.nome} – Staff Tecnico`,
  };
}

export default async function StaffMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const membro = findStaffMember(slug);
  if (!membro) notFound();

  const ruoli = membro.ruolo.split(", ");

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
            href="/club/staff-tecnico"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontFamily: "'DM Sans',sans-serif",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 24,
            }}
          >
            ← Torna allo Staff Tecnico
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
              <Image
                src={membro.file}
                alt={membro.nome}
                fill
                sizes="260px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            </div>

            {/* Nome + ruolo */}
            <div>
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
                {ruoli.join(" · ")}
              </span>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {membro.nome}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Corpo pagina */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "50px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 50,
        }}
      >
        {/* Colonna sinistra: Biografia */}
        <div>
          {membro.bio ? (
            <div style={{ marginBottom: 40 }}>
              <SectionTitle>Biografia</SectionTitle>
              {membro.bio.split("\n\n").map((paragrafo, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: 20,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif" }}>
              Biografia in arrivo.
            </p>
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
            <InfoRow label="Nome" value={membro.nome} />
            <InfoRow label="Ruolo" value={membro.ruolo} />
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