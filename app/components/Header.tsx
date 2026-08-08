"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

type NavItem = {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
};

export const NAV_STRUCTURE: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Club",
    submenu: [
      { label: "Storia", href: "/#storia" },
      { label: "Organigramma", href: "/#organigramma" },
      { label: "Staff tecnico", href: "/#staff-tecnico" },
      { label: "Roster M/F", href: "/#roster" },
    ],
  },
  {
    label: "Calendario",
    submenu: [{ label: "Stagione 2026/2027", href: "/#calendario" }],
  },
  {
    label: "Giovanili",
    submenu: [
      { label: "Under 18", href: "/#giovanili-u18" },
      { label: "Under 16", href: "/#giovanili-u16" },
    ],
  },
  { label: "Sponsor & Partner", href: "/sponsor" },
  { label: "News", href: "/news" },
];

const LANGS = [
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

export default function Header() {
  const scrollY = useScrollY();
  const compact = scrollY > 50;
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [lang, setLang] = useState("it");
  const [langOpen, setLangOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleNavClick(e: React.MouseEvent, href: string) {
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      // se non siamo in home, lascia che Link navighi a /#id
    }
    setMenuOpen(false);
    setOpenMobile(null);
  }

  function openWithDelay(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDesktop(label);
  }
  function closeWithDelay() {
    closeTimer.current = setTimeout(() => setOpenDesktop(null), 150);
  }

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: compact ? 60 : 76,
        background: compact ? "rgba(53,10,16,0.96)" : "linear-gradient(135deg,#4f1218 0%,#6f1d2b 100%)",
        backdropFilter: compact ? "blur(18px)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(18px,4vw,60px)",
        transition: "height 0.3s,background 0.3s",
        boxShadow: compact ? "0 4px 40px rgba(0,0,0,0.45)" : "0 2px 24px rgba(0,0,0,0.3)",
      }}
    >
      <Link href="/" style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <Logo size={compact ? 36 : 44} />
        <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: compact ? 15 : 17, color: "#fff", letterSpacing: 0.5 }}>
          Trapani Volley
        </span>
      </Link>

      <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="tv-desktop-nav">
        {NAV_STRUCTURE.map((item) => {
          if (!item.submenu) {
            return (
              <Link
                key={item.label}
                href={item.href!}
                onClick={(e) => handleNavClick(e, item.href!)}
                style={{
                  color: "rgba(255,255,255,0.72)", cursor: "pointer", padding: "8px 12px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                  textTransform: "uppercase", textDecoration: "none", borderRadius: 6,
                  transition: "background 0.2s,color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.72)"; e.currentTarget.style.background = "none"; }}
              >
                {item.label}
              </Link>
            );
          }
          const isOpen = openDesktop === item.label;
          return (
            <div
              key={item.label}
              className="tv-nav-item"
              onMouseEnter={() => openWithDelay(item.label)}
              onMouseLeave={closeWithDelay}
            >
              <button
                onClick={() => setOpenDesktop(isOpen ? null : item.label)}
                style={{
                  background: isOpen ? "rgba(255,255,255,0.09)" : "none", border: "none",
                  color: isOpen ? "#fff" : "rgba(255,255,255,0.72)", cursor: "pointer", padding: "8px 12px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                  textTransform: "uppercase", borderRadius: 6, display: "flex", alignItems: "center", gap: 5,
                }}
              >
                {item.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.18s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <div className="tv-dropdown">
                  {item.submenu.map((sub) => (
                    <Link key={sub.label} href={sub.href} onClick={(e) => handleNavClick(e, sub.href)}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Selettore lingua */}
        <div
          className="tv-nav-item"
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
          style={{ marginLeft: 8 }}
        >
          <button
            onClick={() => setLangOpen((o) => !o)}
            style={{
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50,
              color: "#fff", cursor: "pointer", padding: "7px 16px", fontFamily: "'DM Sans',sans-serif",
              fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5,
            }}
          >
            {lang.toUpperCase()}
          </button>
          {langOpen && (
            <div className="tv-dropdown" style={{ minWidth: 90, right: 0, left: "auto" }}>
              {LANGS.map((l) => (
                <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}>
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <button onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" style={{
        display: "none", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 8, padding: "9px 10px", cursor: "pointer",
      }} className="tv-hamburger">
        <span style={{ display: "block", width: 20, height: 2, background: "#fff", position: "relative",
          transform: menuOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
          <span style={{ position: "absolute", left: 0, width: 20, height: 2, background: "#fff",
            top: menuOpen ? 0 : -6, transform: menuOpen ? "rotate(90deg)" : "none", transition: "top 0.2s,transform 0.2s" }} />
          <span style={{ position: "absolute", left: 0, width: 20, height: 2, background: "#fff",
            top: menuOpen ? 0 : 6, opacity: menuOpen ? 0 : 1, transition: "top 0.2s,opacity 0.2s" }} />
        </span>
      </button>

      {menuOpen && (
        <div style={{
          position: "absolute", top: compact ? 60 : 76, right: 12, left: 12,
          background: "linear-gradient(135deg,#4f1218 0%,#6f1d2b 100%)",
          borderRadius: 14, padding: 10,
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.12)",
          display: "flex", flexDirection: "column", gap: 4,
          maxHeight: "calc(100vh - 100px)", overflowY: "auto",
        }}>
          {NAV_STRUCTURE.map((item) => {
            if (!item.submenu) {
              return (
                <Link key={item.label} href={item.href!} onClick={(e) => handleNavClick(e, item.href!)} style={{
                  color: "rgba(255,255,255,0.85)", padding: "11px 14px", borderRadius: 8,
                  fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, textDecoration: "none",
                }}>
                  {item.label}
                </Link>
              );
            }
            const isOpen = openMobile === item.label;
            return (
              <div key={item.label}>
                <button onClick={() => setOpenMobile(isOpen ? null : item.label)} style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", color: "rgba(255,255,255,0.85)",
                  padding: "11px 14px", borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500,
                }}>
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.18s" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ paddingLeft: 14, display: "flex", flexDirection: "column" }}>
                    {item.submenu.map((sub) => (
                      <Link key={sub.label} href={sub.href} onClick={(e) => handleNavClick(e, sub.href)} style={{
                        color: "rgba(255,255,255,0.65)", padding: "9px 14px", fontSize: 13.5, textDecoration: "none",
                      }}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 8, padding: "10px 14px" }}>
            {LANGS.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{
                background: lang === l.code ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, color: "#fff",
                padding: "6px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
              }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}