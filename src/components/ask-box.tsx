"use client";

import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import { createMsg } from "@/app/api/messageBoard";
import { MessageCircle, Send, Sparkles } from "lucide-react";

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
    const sendMsg = await createMsg(content);
    if (sendMsg.status === 201) {
      toast.success("好耶！你的訊息已傳出！");
      setContent("");
      setIsExpanded(false);
    } else {
      toast.error("訊息傳不出去啦！QQ");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="group relative">
        {/* Decorative corner accents */}
        <div className="absolute -left-2 -top-2 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-primary opacity-50 transition-opacity group-hover:opacity-100 dark:border-purple-400"></div>
        <div className="absolute -right-2 -top-2 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-primary opacity-50 transition-opacity group-hover:opacity-100 dark:border-purple-400"></div>
        <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-primary opacity-50 transition-opacity group-hover:opacity-100 dark:border-purple-400"></div>
        <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-primary opacity-50 transition-opacity group-hover:opacity-100 dark:border-purple-400"></div>

        <div className="to-primary-light/30 relative rounded-2xl border border-gray-200 bg-gradient-to-br from-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-slate-600 dark:from-slate-800 dark:to-slate-700">
          {!isExpanded ? (
            <button
              onClick={toggleExpand}
              className="group/btn w-full space-y-3 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3 transition-transform group-hover/btn:scale-110 dark:bg-purple-500/10">
                  <MessageCircle className="h-6 w-6 text-primary dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                    偷偷跟我說...
                    <Sparkles className="h-4 w-4 animate-pulse text-yellow-500" />
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    有什麼想對我說的嗎？
                  </p>
                </div>
                <div className="text-primary transition-transform group-hover/btn:translate-x-1 dark:text-purple-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3 dark:bg-purple-500/10">
                  <MessageCircle className="h-6 w-6 text-primary dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  留下你的訊息
                </h3>
              </div>

              <textarea
                className="h-32 w-full resize-none rounded-xl border-2 border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-purple-400"
                placeholder="在這裡寫下你想說的話..."
                value={content}
                onChange={e => setContent(e.target.value)}
              ></textarea>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {content.length < 10 ? (
                    <>需要至少 10 個字 ({content.length}/10)</>
                  ) : (
                    <>{debouncedContent.length} 字</>
                  )}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={toggleExpand}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSendMsg}
                    disabled={content.length < 10}
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-600"
                  >
                    <Send className="h-4 w-4" />
                    送出
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
