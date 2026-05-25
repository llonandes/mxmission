import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saint Mary's Mexican Mission Trip 2026 | Build a Home. Build a Future.",
  description:
    "Join Saint Mary's June 14–20, 2026 in Tijuana, Mexico to build homes alongside families in Colonia La Morita. Open to teens (8th–12th grade) and adults. Scholarships available.",
  openGraph: {
    title: "Saint Mary's Mexican Mission Trip 2026",
    description:
      "Build homes alongside families in Tijuana, Mexico — June 14–20, 2026. Teens & adults welcome.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
