"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../components/GlobalStyles";
import Calendario from "../components/Calendario";

export default function CalendarioPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />
      <div style={{ height: 96 }} />
      <Calendario />
      <Footer />
    </main>
  );
}