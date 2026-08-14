"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GlobalStyles from "../../components/GlobalStyles";
import Storia from "../../components/Storia";

export default function StoriaPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111111" }}>
      <GlobalStyles />
      <Header />
      <div style={{ height: 96 }} />
      <Storia />
      <Footer />
    </main>
  );
}