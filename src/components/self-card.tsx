"use client";

import Image from "next/image";
import { BackgroundGradient } from "./ui/background-gradient";
import { useState } from "react";

export default function SelfCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BackgroundGradient className="relative flex flex-col items-start rounded-lg bg-dark overflow-hidden">
        <div className="h-[15rem] w-full rounded-tl-lg rounded-tr-lg bg-primary-light relative overflow-hidden">
          <Image
            src="/images/me.png"
            alt="me"
            width={600}
            height={600}
            className={`transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {/* Status Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-700">Available</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5 w-full">
          <div className="flex items-end gap-2">
            <div className="font-notoSans text-2xl font-black text-background">
              SHUSHU
            </div>
            <div className="font-mono text-lg font-medium text-background/80">
              #0829
            </div>
          </div>
          <div className="font-sans text-sm text-slate-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            shushu90829@gmail.com
          </div>

          {/* Bio Section */}
          <div className="mt-2 pt-3 border-t border-slate-600">
            <p className="text-xs text-slate-400 leading-relaxed">
              創作者 · 遊戲實況主 · 內容分享者
            </p>
          </div>

          {/* Social Stats */}
          <div className={`grid grid-cols-3 gap-2 mt-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
            <div className="bg-slate-700/50 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400">Platforms</div>
              <div className="text-sm font-bold text-background mt-0.5">6+</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400">Community</div>
              <div className="text-sm font-bold text-background mt-0.5">Active</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400">Content</div>
              <div className="text-sm font-bold text-background mt-0.5">Daily</div>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
