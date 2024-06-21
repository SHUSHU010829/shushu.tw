"use client";

import { useEffect, useState } from "react";
import SparklesText from "@/components/ui/magicUi/sparkles-text";

export default function Prize() {
  const [prize, setPrize] = useState("");

  useEffect(() => {
    const savedPrizes = localStorage.getItem("draw_prizes");
    if (savedPrizes) {
      const firstLine = savedPrizes.split("\n")[0];
      const prizeName = firstLine.split(",")[0];
      setPrize(prizeName);
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center pt-10">
      <SparklesText text={prize || "尚未有獎品"} />
    </div>
  );
}
