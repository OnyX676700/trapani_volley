// app/staff/[slug]/page.tsx
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

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />

      <section
        style={{
          paddingTop: 140,
          paddingBottom: 40,
          background: "#f7f5f4",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <Link
             href="/club/staff-tecnico"
            style={{
              color: "rgba(0,0,0,0.5)",
              fontSize: 13,
              fontFamily: "'DM Sans',sans-serif",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 24,
            }}
          >
            ← Torna allo Staff Tecnico
          </Link>

          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            {/* Foto */}
            <div
              style={{
                position: "relative",
                width: 140,
                height: 140,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                background: "#e0e0e0",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Image src={membro.file} alt={membro.nome} fill style={{ objectFit: "cover" }} />
            </div>

            {/* Nome + ruoli */}
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 700,
                  color: "#6f1d2b",
                  margin: "0 0 12px",
                  lineHeight: 1.15,
                }}
              >
                {membro.nome}
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {membro.ruolo.split(", ").map((r) => (
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
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "50px 24px" }}>
        {membro.bio ? (
          membro.bio.split("\n\n").map((paragrafo, i) => (
            <p
              key={i}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "rgba(0,0,0,0.8)",
                marginBottom: 20,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {paragrafo}
            </p>
          ))
        ) : (
          <p style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans',sans-serif" }}>
            Biografia in arrivo.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}