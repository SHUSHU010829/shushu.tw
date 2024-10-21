"use client";

import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import { TypingAnimation } from "./ui/magicUi/typing-animation";
import SelfCard from "./self-card";
import { createMsg } from "@/app/api/messageBoard";

export default function AskBox() {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [debouncedContent, setDebouncedContent] = useState(content);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDebouncedContent(content);
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [content]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMsg = async () => {
    setIsExpanded(!isExpanded);
    const sendMsg = await createMsg(content);
    if (sendMsg.status === 201) {
      toast.success("好耶！你的訊息已傳出！");
    } else {
      toast.error("訊息傳不出去啦！QQ");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      {!isExpanded ? (
        <>
          <SelfCard />
          <button
            className={`group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg bg-[linear-gradient(110deg,#76A968,45%,#8FCC7E,55%,#76A968)] bg-[length:200%_100%] px-7 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)] transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80`}
            onClick={toggleExpand}
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
              <TypingAnimation
                className="text-lg font-bold text-white "
                text="偷偷跟我說..."
              />
            </div>
          </button>
        </>
      ) : (
        <>
          <SelfCard />
          <div
            className="flex flex-col rounded-lg border-2 border-slate-600 bg-white p-2 transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isExpanded ? "200px" : "0",
              overflow: "hidden",
            }}
          >
            <textarea
              id="OrderNotes"
              className="m-1 h-full resize-none rounded p-1 align-top focus:outline-none focus:ring-opacity-0 sm:text-sm"
              placeholder="偷偷跟我說..."
              rows={8}
              value={content}
              onChange={e => setContent(e.target.value)}
            ></textarea>
            {isExpanded && content.length < 10 ? (
              <div className="pr-1 text-end text-xs text-stone-300">
                輸入的文字需超過十字
              </div>
            ) : (
              <div className="pr-1 text-end text-xs text-stone-300">
                字數：{debouncedContent.length}
              </div>
            )}
            <button
              className="mt-2 rounded-md bg-[#76A968] px-8 py-2 text-sm font-semibold text-white hover:bg-[#81b872] hover:shadow-lg"
              onClick={handleSendMsg}
              disabled={content.length < 10}
            >
              SEND
            </button>
          </div>
        </>
      )}
    </>
  );
}
