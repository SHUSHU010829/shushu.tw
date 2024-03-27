import Image from "next/image";
import { SiTwitch, SiPlurk, SiDiscord, SiYoutube } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { RxCrumpledPaper } from "react-icons/rx";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background bg-dot-black/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* content */}
      <div className="flex flex-col items-center justify-center gap-8 pb-20 pt-10">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* self-card */}
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
              <div className="font-sans text-slate-200">
                shushu90829@gmail.com
              </div>
            </div>
          </BackgroundGradient>

          {/* social */}
          <div className="flex flex-col gap-5">
            {/* twitch */}
            <div className="w-[15rem]">
              <a
                className="group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg bg-[linear-gradient(110deg,#6441a5,45%,#7853BD,55%,#6441a5)]  bg-[length:200%_100%] px-8 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)]  transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80"
                href="https://www.twitch.tv/shushu010829"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
                  <SiTwitch /> TWITCH
                </span>
              </a>
            </div>
            {/* youtube */}
            <div className="w-[15rem]">
              <a
                className="group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg  bg-[linear-gradient(110deg,#FF0000,45%,#FF5151,55%,#FF0000)]  bg-[length:200%_100%] px-8 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)]  transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80"
                href="https://www.youtube.com/@SHUSHU0829"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
                  <SiYoutube /> YOUTUBE
                </span>
              </a>
            </div>
            {/* twitter */}
            <div className="w-[15rem]">
              <a
                className="group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg bg-[linear-gradient(110deg,#000000,45%,#2A2A2A,55%,#000000)]  bg-[length:200%_100%] px-8 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)]  transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80"
                href="https://twitter.com/SHUSHU_0829"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
                  <FaXTwitter /> TWITTER
                </span>
              </a>
            </div>
            {/* plurk */}
            <div className="w-[15rem]">
              <a
                className="group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg bg-[linear-gradient(110deg,#ff574c,45%,#FF796F,55%,#ff574c)]  bg-[length:200%_100%] px-8 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)]  transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)]  active:bg-opacity-80"
                href="https://www.plurk.com/fortune_shuuuuu"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
                  <SiPlurk /> PLURK
                </span>
              </a>
            </div>
            {/* discord */}
            <div className="w-[15rem]">
              <a
                className="group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg bg-[linear-gradient(110deg,#5865F2,45%,#7781F3,55%,#5865F2)]  bg-[length:200%_100%] px-8 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)]  transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80"
                href="https://discord.gg/WVuqdscbkB"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
                  <SiDiscord /> DISCORD
                </span>
              </a>
            </div>
            {/* github */}
            {/* <div className="w-[15rem]">
              <a
                className="group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg bg-[linear-gradient(110deg,#0D1117,45%,#2A313C,55%,#0D1117)]  bg-[length:200%_100%] px-8 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)]  transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80"
                href="https://github.com/SHUSHU010829"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
                  <SiGithub /> GITHUB
                </span>
              </a>
            </div> */}
            {/* wavebox */}
            <div className="w-[15rem]">
              <a
                className="group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg bg-[linear-gradient(110deg,#1d1e24,45%,#3B3D49,55%,#1d1e24)]  bg-[length:200%_100%] px-8 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)]  transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80"
                href="https://wavebox.me/wave/7g3xtuqdoqd2iuki/"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
                  <RxCrumpledPaper /> WAVEBOX
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="absolute bottom-8 right-8 flex origin-bottom-right rotate-90 text-xs text-gray-500">
        <p>&copy; 2024. SHUSHU. All rights reserved.</p>
      </div>
    </main>
  );
}
