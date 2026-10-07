import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NoZoom from "./no-zoom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#4f1218", 
};

export const metadata: Metadata = {
  title: "Trapani Volley",
  description:
    "Società sportiva di pallavolo a Trapani, Sicilia. Scopri le nostre squadre, eventi e risultati.",
  icons: {
    icon: "/img/favicon.jpg",
  },
  appleWebApp: {
    capable: true,
    title: "Trapani Volley",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NoZoom />
        {children}
      </body>
    </html>
  );
}