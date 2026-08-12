"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sent");
    setEmail("");
  };
  return (
    <div style={{
      maxWidth: 1100, margin: "0 auto 48px", background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "32px 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
    }}>
      <div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 6 }}>
          Resta aggiornato
        </h3>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
          Iscriviti per ricevere risultati e news di Trapani Volley via email.
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input type="email" required placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)}
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50,
            padding: "11px 18px", color: "#fff", fontSize: 14, minWidth: 220, outline: "none" }} />
        <button type="submit" style={{ background: "#ff7676", border: "none", borderRadius: 50, color: "#fff",
          padding: "11px 26px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
          {status === "sent" ? "Iscritto! ✓" : "Iscriviti"}
        </button>
      </form>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#4f1218", padding: "64px 24px 0", color: "#fff", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <Newsletter />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "48px 40px", paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <Logo size={48} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 16, color: "#fff" }}>Trapani Volley</span>
          </div>
          <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.48)", fontStyle: "italic" }}>Passione, squadra, vittoria</p>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Contatti</h3>
          {[["Email", "info@trapanivolley.it"], ["Tel", "+39 123 456 789"], ["Indirizzo", "Palestra Comunale, Trapani (TP)"]].map(([k, v]) => (
            <p key={k} style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.62)", marginBottom: 8, lineHeight: 1.6 }}>
              <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>{k}:</strong> {v}
            </p>
          ))}
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Link utili</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/sponsor" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.87rem", textDecoration: "none" }}>Sponsor & Partner</Link>
            <Link href="/news" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.87rem", textDecoration: "none" }}>News</Link>
            <Link href="/#calendario" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.87rem", textDecoration: "none" }}>Calendario</Link>
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Seguici</h3>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { href: "https://www.tiktok.com/@trapanivolley", label: "TikTok", d: "M23.498 6.186a2.956 2.956 0 0 0-2.082-2.09C19.796 3.5 12 3.5 12 3.5s-7.796 0-9.416.596a2.956 2.956 0 0 0-2.082 2.09A30.225 30.225 0 0 0 0 12a30.225 30.225 0 0 0 .502 5.814c.18.788.67 1.48 1.414 2.09C4.204 20.5 12 20.5 12 20.5s7.796 0 9.416-.596a2.956 2.956 0 0 0 2.082-2.09A30.225 30.225 0 0 0 24 12a30.225 30.225 0 0 0-.502-5.814zM9.75 15V9l6 3-6 3z" },
              { href: "https://www.youtube.com/@trapanivolley", label: "YouTube", d: "M23.498 6.186a2.956 2.956 0 0 0-2.082-2.09C19.796 3.5 12 3.5 12 3.5s-7.796 0-9.416.596a2.956 2.956 0 0 0-2.082 2.09A30.225 30.225 0 0 0 0 12a30.225 30.225 0 0 0 .502 5.814c.18.788.67 1.48 1.414 2.09C4.204 20.5 12 20.5 12 20.5s7.796 0 9.416-.596a2.956 2.956 0 0 0 2.082-2.09A30.225 30.225 0 0 0 24 12a30.225 30.225 0 0 0-.502-5.814zM9.75 15V9l6 3-6 3z" },
              { href: "https://www.facebook.com/p/Trapani-Volley-61579947234427/", label: "Facebook", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { href: "https://www.instagram.com/trapanivolley/", label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
            ].map(({ href, label, d }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 42, height: 42, background: "rgba(255,255,255,0.08)", borderRadius: "50%",
                color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          © {new Date().getFullYear()} Trapani Volley — Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}