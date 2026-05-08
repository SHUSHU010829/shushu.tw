"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Taipei",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getTpeTime(): string {
  return formatter.format(new Date());
}

export function useTpeClock(): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(getTpeTime());
    const id = setInterval(() => setTime(getTpeTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
