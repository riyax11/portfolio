import type { Metadata } from "next";
import { Sora } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { portfolio as p } from "@/data/portfolio";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

const title = `${p.name} | ${p.role}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-riya-patkar.vercel.app"),
  title,
  description: p.intro,
  openGraph: {
    title,
    description: p.intro,
    url: "https://portfolio-riya-patkar.vercel.app",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="bg-bg font-sans text-ink antialiased">
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}