"use client";

import { useState } from "react";

export default function SocialLink({
  href,
  icon,
  label,
  gradient,
}: {
  href: string;
  icon: any;
  label: string;
  gradient: string;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="w-full transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
      <a
        className={`group relative inline-flex w-full animate-shimmer items-center justify-center overflow-hidden rounded-xl ${gradient} bg-[length:200%_100%] px-7 py-4 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)] transition-all duration-300 ease-out hover:shadow-[0_8px_24px_rgba(80,80,80,35%)] active:shadow-[0_2px_8px_rgba(0,0,0,30%)] ${isPressed ? 'ring-2 ring-white/50' : ''}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        {/* Shine effect on hover */}
        <span className="absolute inset-0 -z-10 block h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></span>

        {/* Arrow icon */}
        <span className="absolute -start-full transition-all duration-300 ease-out group-hover:start-4">
          <svg
            className="size-5 rtl:rotate-180 transition-transform group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        {/* Content */}
        <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all duration-300 ease-out group-hover:ms-4">
          <span className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-active:scale-95">
            {icon}
          </span>
          <span className="relative">
            {label}
            {/* Underline effect */}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </span>

        {/* External link indicator */}
        <span className="absolute right-3 opacity-0 transition-all duration-300 group-hover:opacity-60">
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      </a>
    </div>
  );
}
