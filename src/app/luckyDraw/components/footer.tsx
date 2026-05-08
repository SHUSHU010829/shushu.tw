"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="p-6 text-sm font-bold">
      <div>
        © 2024{" "}
        <span
          className=" text-secondary cursor-pointer transition duration-200 hover:text-primary"
          onClick={() => router.push("/")}
        >
          SHUSHU
        </span>
      </div>
    </div>
  );
}
