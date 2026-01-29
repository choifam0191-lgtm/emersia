import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "영우테크 | 스마트 방송장비",
  description: "혁신적인 방송 환경을 선도하는 영우테크 스마트 방송장비 랜딩 페이지"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

