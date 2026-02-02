import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "영우테크 | 스마트 방송장비",
  description:
    "혁신적인 방송 환경을 선도하는 영우테크 스마트 방송장비 랜딩 페이지",
  icons: { icon: "/pix.png" }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
