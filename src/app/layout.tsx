import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Sans_TC, Rubik } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const NotoSansTC = Noto_Sans_TC({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
});

const RubikFont = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "SHUSHU",
  description: "ABOUT SHUSHU.",
  openGraph: {
    title: "SHUSHU",
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
          src="https://analytics.us.umami.is/script.js"
          data-website-id="5cc76b9a-0cdf-4441-a060-2edddbcf3017"
        ></script>
        <script
          defer
          data-domain="shushu.tw"
          src="https://shuplausible.zeabur.app/js/script.js"
        ></script>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:domain" content="shushu.tw"></meta>
        <meta property="twitter:url" content="https://www.shushu.tw"></meta>
        <meta name="twitter:title" content="SHUSHU"></meta>
        <meta name="twitter:description" content="ABOUT SHUSHU."></meta>
        <meta
          name="twitter:image"
          content="https://shushu-tw.vercel.app/api/og"
        ></meta>
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${NotoSansTC.variable} ${RubikFont.variable}`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
