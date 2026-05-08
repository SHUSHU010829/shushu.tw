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

export const metadata: Metadata = {
  title: "SHUSHU.SYS // SHUSHU",
  description: "ABOUT SHUSHU.",
  openGraph: {
    title: "SHUSHU.SYS // SHUSHU",
    description: "ABOUT SHUSHU.",
    type: "website",
    url: "https://shushu.tw",
    images: "https://shushu-tw.vercel.app/api/og",
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="shushu.tw" />
        <meta property="twitter:url" content="https://www.shushu.tw" />
        <meta name="twitter:title" content="SHUSHU.SYS // SHUSHU" />
        <meta name="twitter:description" content="ABOUT SHUSHU." />
        <meta
          name="twitter:image"
          content="https://shushu-tw.vercel.app/api/og"
        />
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
