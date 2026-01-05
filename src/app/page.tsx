"use client";

import AskBox from "@/components/ask-box";
import SelfCard from "@/components/self-card";
import SocialLink from "@/components/social-link";
import { SiTwitch, SiPlurk, SiDiscord, SiYoutube } from "react-icons/si";
import { FaXTwitter, FaBluesky } from "react-icons/fa6";
import { Meteors } from "@/components/ui/meteors";
import ThemeToggle from "@/components/theme-toggle";
import { motion } from "framer-motion";

export default function Home() {
  const socialLinks = [
    {
      href: "https://www.twitch.tv/shushu010829",
      icon: <SiTwitch />,
      label: "TWITCH",
      gradient: "bg-[linear-gradient(110deg,#6441a5,45%,#7853BD,55%,#6441a5)]",
    },
    {
      href: "https://discord.gg/shushu010829",
      icon: <SiDiscord />,
      label: "DISCORD",
      gradient: "bg-[linear-gradient(110deg,#5865F2,45%,#7781F3,55%,#5865F2)]",
    },
    {
      href: "https://www.youtube.com/@SHUSHU0829",
      icon: <SiYoutube />,
      label: "YOUTUBE",
      gradient: "bg-[linear-gradient(110deg,#FF0000,45%,#FF5151,55%,#FF0000)]",
    },
    {
      href: "https://twitter.com/SHUSHU_0829",
      icon: <FaXTwitter />,
      label: "TWITTER",
      gradient: "bg-[linear-gradient(110deg,#000000,45%,#2A2A2A,55%,#000000)]",
    },
    {
      href: "https://bsky.app/profile/shushu010829.bsky.social",
      icon: <FaBluesky />,
      label: "Bluesky",
      gradient: "bg-[linear-gradient(110deg,#0085ff,45%,#00A5FF,55%,#0085ff)]",
    },
    {
      href: "https://www.plurk.com/fortune_shuuuuu",
      icon: <SiPlurk />,
      label: "PLURK",
      gradient: "bg-[linear-gradient(110deg,#ff574c,45%,#FF796F,55%,#ff574c)]",
    },
  ];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-light/30 to-background dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 bg-dot-black/[0.2] dark:bg-dot-white/[0.2] transition-colors duration-500">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 dark:from-purple-500/5 dark:via-transparent dark:to-blue-500/5 animate-pulse"></div>

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Meteors effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Meteors number={15} />
      </div>
      {/* content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-8 py-10 px-4 w-full max-w-md lg:max-w-3xl"
      >
        {/* Profile Card Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SelfCard />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative flex items-center justify-center my-2"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative bg-background dark:bg-slate-900 px-4">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">SOCIAL LINKS</span>
          </div>
        </motion.div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + index * 0.1,
                ease: "easeOut",
              }}
            >
              <SocialLink
                href={link.href}
                icon={link.icon}
                label={link.label}
                gradient={link.gradient}
              />
            </motion.div>
          ))}
        </div>

        {/* Ask Box - Special Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="md:col-span-2"
        >
          <AskBox />
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6"
        >
          &copy; 2024 SHUSHU
        </motion.p>
      </motion.div>
    </main>
  );
}
