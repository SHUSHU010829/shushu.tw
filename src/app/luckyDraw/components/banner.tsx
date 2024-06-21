"use client";

import { useEffect, useState } from "react";

export default function Banner() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("draw_title");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <div className="bg-secondary-light px-4 py-3 text-white">
      <p className="text-center text-sm font-medium">{theme || "來抽抽！"}</p>
    </div>
  );
}
