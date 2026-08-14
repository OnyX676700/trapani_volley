"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// Numero di contatto usato anche nella sezione "Contatti" qui sotto.
// Il link WhatsApp è generato da questo stesso numero: se cambia, aggiornalo solo qui.
const PHONE_DISPLAY = "+39 342 821 4090";
const PHONE_WHATSAPP = PHONE_DISPLAY.replace(/[^\d]/g, ""); // es. 393428214090

const socialLinks = [
  {
    href: "https://www.tiktok.com/@trapanivolley",
    label: "TikTok",
    icon: FaTiktok,
  },
  {
    href: "https://www.youtube.com/channel/UCaaqEfYWBDFiRgJ8cD9FAFQ",
    label: "YouTube",
    icon: FaYoutube,
  },
  {
    href: "https://www.facebook.com/p/Trapani-Volley-61579947234427/",
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/trapanivolley/",
    label: "Instagram",
    icon: FaInstagram,
  },
];

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
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto 48px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 18,
        padding: "32px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 6,
          }}
        >
          Newsletter
        </h3>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
          Iscriviti per ricevere risultati e news di Trapani Volley via email.
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          required
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 50,
            padding: "11px 18px",
            color: "#fff",
            fontSize: 14,
            minWidth: 220,
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#ff7676",
            border: "none",
            borderRadius: 50,
            color: "#fff",
            padding: "11px 26px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {status === "sent" ? "Iscritto! ✓" : "Iscriviti"}
        </button>
      </form>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#4f1218",
        padding: "64px 24px 0",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Newsletter />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "48px 40px",
          paddingBottom: 48,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <Logo size={48} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 16, color: "#fff" }}>
              Trapani Volley
            </span>
          </div>
          <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.48)", fontStyle: "italic" }}>
            Passione, squadra, vittoria
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>
            Contatti
          </h3>
          {[
            ["Email", "info.trapanivolley@libero.it"],
            ["Indirizzo", "Via Emilia Romagna 1/B, Trapani (TP)"],
            ["Partita IVA", "02939130817"],
          ].map(([k, v]) => (
            <p key={k} style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.62)", marginBottom: 8, lineHeight: 1.6 }}>
              <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>{k}:</strong> {v}
            </p>
          ))}
          <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.62)", marginBottom: 8, lineHeight: 1.6, display: "flex", alignItems: "center", gap: 8 }}>
            <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>Tel:</strong> {PHONE_DISPLAY}
            <a
              href={`https://wa.me/${PHONE_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrivici su WhatsApp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(37,211,102,0.16)",
                border: "1px solid rgba(37,211,102,0.35)",
                color: "#25D366",
                flexShrink: 0,
              }}
            >
              <FaWhatsapp size={13} />
            </a>
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>
            Link utili
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/sponsor" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.87rem", textDecoration: "none" }}>
              Sponsor & Partner
            </Link>
            <Link href="/news" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.87rem", textDecoration: "none" }}>
              News
            </Link>
            <Link href="/#calendario" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.87rem", textDecoration: "none" }}>
              Calendario
            </Link>
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, marginBottom: 18, color: "#fff" }}>
            Seguici
          </h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 42,
                  height: 42,
                  background: label === "WhatsApp" ? "rgba(37,211,102,0.16)" : "rgba(255,255,255,0.08)",
                  borderRadius: "50%",
                  color: label === "WhatsApp" ? "#25D366" : "rgba(255,255,255,0.85)",
                  border: label === "WhatsApp" ? "1px solid rgba(37,211,102,0.35)" : "1px solid rgba(255,255,255,0.1)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          © {new Date().getFullYear()} Trapani Volley — Associazione Sportiva Dilettantistica senza scopo di lucro. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}