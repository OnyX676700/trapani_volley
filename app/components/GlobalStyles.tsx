"use client";
import { useEffect } from "react";

export default function GlobalStyles() {
  useEffect(() => {
    const id = "tv-global-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #0d0d0d; color: #fff; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
      @keyframes tvFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes tvBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      @keyframes tvHeroZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
      @keyframes tvDropdownIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

      .tv-desktop-nav { }
      .tv-hamburger { }
      .tv-nav-item { position: relative; }
      .tv-dropdown {
        position: absolute; top: 100%; left: 0; margin-top: 10px;
        background: linear-gradient(135deg,#4f1218 0%,#6f1d2b 100%);
        border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;
        min-width: 230px; padding: 8px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        animation: tvDropdownIn 0.18s ease both; z-index: 1100;
      }
      .tv-dropdown a, .tv-dropdown button {
        display: block; width: 100%; text-align: left; background: none; border: none;
        color: rgba(255,255,255,0.8); font-family: 'DM Sans',sans-serif; font-size: 13.5px;
        font-weight: 500; padding: 10px 14px; border-radius: 8px; cursor: pointer;
        text-decoration: none; transition: background 0.15s, color 0.15s;
      }
      .tv-dropdown a:hover, .tv-dropdown button:hover { background: rgba(255,255,255,0.1); color: #fff; }

      @media (max-width: 760px) {
        .tv-desktop-nav { display: none !important; }
        .tv-hamburger { display: block !important; }
      }
      @media (max-width: 820px) {
        .tv-about-grid { grid-template-columns: 1fr !important; }
        .tv-risultato-card { grid-template-columns: 1fr !important; text-align: center !important; }
        .tv-risultato-teams { grid-template-columns: 1fr !important; }
        .tv-risultato-teams span { text-align: center !important; white-space: normal !important; }
      }
      @media (max-width: 560px) {
        .tv-classifica-header, .tv-classifica-row { grid-template-columns: 28px 1fr 34px 34px 34px 48px !important; padding-left: 12px !important; padding-right: 12px !important; }
      }
    `;
    document.head.appendChild(s);
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);
  return null;
}