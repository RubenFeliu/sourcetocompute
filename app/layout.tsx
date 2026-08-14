import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ruben V. Feliu — AI Data Center Power Infrastructure",
  description:
    "Integrated strategy, engineering, controls, cybersecurity, program delivery and operational readiness for next-generation AI infrastructure. From energy source to compute.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${grotesk.variable} ${mono.variable} bg-ink-950 text-steel-100 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
