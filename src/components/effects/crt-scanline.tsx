"use client";

import { usePathname } from "next/navigation";

export function CrtScanline() {
  const pathname = usePathname();

  if (pathname.startsWith("/luckyDraw")) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 motion-reduce:hidden"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,255,135,0.012) 2px 3px)",
      }}
    />
  );
}
