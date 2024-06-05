import Image from "next/image";
import { BackgroundGradient } from "./ui/background-gradient";

export default function SelfCard() {
  return (
    <div>
      <BackgroundGradient className="relative flex flex-col items-start rounded-lg bg-dark">
        <div className="h-[15rem] w-[15rem] rounded-tl-lg rounded-tr-lg bg-primary-light">
          <Image src="/images/me.png" alt="me" width={600} height={600} />
        </div>
        <div className="flex flex-col gap-1 p-4">
          <div className="flex items-end gap-2">
            <div className="font-notoSans text-xl font-black text-background">
              SHUSHU
            </div>
            <div className="font-mono text-base font-medium text-background">
              #0829
            </div>
          </div>
          <div className="font-sans text-slate-200">shushu90829@gmail.com</div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
