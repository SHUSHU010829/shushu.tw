"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function History() {
  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <Card className="h-96 w-[80%] bg-white">
        <CardHeader>
          <CardTitle>中獎名單</CardTitle>
        </CardHeader>
        <Separator className=" bg-black" />
        <CardContent className="p-6">
          <div>目前尚未有中獎者</div>
        </CardContent>
      </Card>
    </div>
  );
}
