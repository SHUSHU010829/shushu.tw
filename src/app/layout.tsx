import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Sans_TC, Rubik } from "next/font/google";

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
        <meta
          property="og:image"
          content="https://og-examples.vercel.sh/api/static"
        />
        <meta
          property="twitter:image"
          content="https://og-examples.vercel.sh/api/static"
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${NotoSansTC.variable} ${RubikFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
