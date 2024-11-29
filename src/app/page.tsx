import AskBox from "@/components/ask-box";
import SocialLink from "@/components/social-link";
import { SiTwitch, SiPlurk, SiDiscord, SiYoutube } from "react-icons/si";
import { FaXTwitter, FaBluesky } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background bg-dot-black/[0.2]">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* content */}
      <div className="flex flex-col gap-4 py-10">
        <AskBox />
        <SocialLink
          href="https://www.twitch.tv/shushu010829"
          icon={<SiTwitch />}
          label="TWITCH"
          gradient="bg-[linear-gradient(110deg,#6441a5,45%,#7853BD,55%,#6441a5)]"
        />
        <SocialLink
          href="https://discord.gg/shushu010829"
          icon={<SiDiscord />}
          label="DISCORD"
          gradient="bg-[linear-gradient(110deg,#5865F2,45%,#7781F3,55%,#5865F2)]"
        />
        <SocialLink
          href="https://www.youtube.com/@SHUSHU0829"
          icon={<SiYoutube />}
          label="YOUTUBE"
          gradient="bg-[linear-gradient(110deg,#FF0000,45%,#FF5151,55%,#FF0000)]"
        />
        <SocialLink
          href="https://twitter.com/SHUSHU_0829"
          icon={<FaXTwitter />}
          label="TWITTER"
          gradient="bg-[linear-gradient(110deg,#000000,45%,#2A2A2A,55%,#000000)]"
        />
        <SocialLink
          href="https://bsky.app/profile/shushu010829.bsky.social"
          icon={<FaBluesky />}
          label="Bluesky"
          gradient="bg-[linear-gradient(110deg,#0085ff,45%,#00A5FF,55%,#0085ff)]"
        />
        <SocialLink
          href="https://www.plurk.com/fortune_shuuuuu"
          icon={<SiPlurk />}
          label="PLURK"
          gradient="bg-[linear-gradient(110deg,#ff574c,45%,#FF796F,55%,#ff574c)]"
        />
        <p className="text-center text-xs">&copy; 2024 SHUSHU</p>
      </div>
    </main>
  );
}
