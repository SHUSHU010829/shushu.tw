import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Sans_TC, Space_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CrtScanline } from "@/components/effects/crt-scanline";

const NotoSansTC = Noto_Sans_TC({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
});

const SpaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

const SITE_DESCRIPTION =
  "SHUSHU 的個人主控台 — Twitch 直播狀態、頻道連結、社群資訊與留言室，一個頁面找到所有關於 SHUSHU 的東西。";

export const metadata: Metadata = {
  metadataBase: new URL("https://shushu.tw"),
  title: "SHUSHU.SYS // SHUSHU",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "SHUSHU.SYS // SHUSHU",
    description: SITE_DESCRIPTION,
    type: "website",
    url: "https://shushu.tw",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "SHUSHU.SYS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHUSHU.SYS // SHUSHU",
    description: SITE_DESCRIPTION,
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b99dfb23-305b-4a3a-8310-273fad09daa6"
        ></script>
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${NotoSansTC.variable} ${SpaceMono.variable}`}
      >
        <CrtScanline />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
