"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("draw_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <Card className="h-[400px] w-[80%] bg-white">
        <CardHeader>
          <CardTitle>中獎名單</CardTitle>
        </CardHeader>
        <Separator className=" bg-black" />
        <CardContent
          className={`flex flex-col gap-3 p-6 ${history.length > 6 ? "max-h-72 overflow-y-auto" : ""}`}
        >
          {history.length > 0 ? (
            history.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="rounded bg-primary-light p-2 text-sm font-bold">
                  {entry.prize}
                </div>
                {entry.winner}
              </div>
            ))
          ) : (
            <div>目前尚未有中獎者</div>
          )}
        </CardContent>
        <CardFooter className="flex w-full items-center justify-center p-2 text-center text-xs font-bold text-stone-400">
          {history.length > 6 && <>下滑看剩餘名單</>}
        </CardFooter>
      </Card>
    </div>
  );
}
