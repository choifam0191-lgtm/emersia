import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "emersia | 스마트 LTE 안전방송 시스템",
    template: "%s | emersia",
  },
  description:
    "건설현장 안전방송 솔루션 전문기업. LTE 기반 스마트 방송시스템으로 현장 안전을 지원합니다.",
  icons: { icon: "/pix.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-sans">
        <Header />
        <div className="min-h-dvh">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
