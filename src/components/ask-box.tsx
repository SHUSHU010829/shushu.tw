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
      <div className="relative group">
        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary dark:border-purple-400 rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary dark:border-purple-400 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary dark:border-purple-400 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary dark:border-purple-400 rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>

        <div className="relative bg-gradient-to-br from-white to-primary-light/30 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-600 transition-all duration-300 hover:shadow-2xl">
          {!isExpanded ? (
            <button
              onClick={toggleExpand}
              className="w-full text-left space-y-3 group/btn"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 dark:bg-purple-500/10 rounded-xl group-hover/btn:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-primary dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    偷偷跟我說...
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    有什麼想對我說的嗎？
                  </p>
                </div>
                <div className="text-primary dark:text-purple-400 group-hover/btn:translate-x-1 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 dark:bg-purple-500/10 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-primary dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  留下你的訊息
                </h3>
              </div>

              <textarea
                className="w-full h-32 resize-none rounded-xl p-4 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 focus:border-primary dark:focus:border-purple-400 focus:outline-none transition-colors text-gray-800 dark:text-white placeholder-gray-400"
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
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSendMsg}
                    disabled={content.length < 10}
                    className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary dark:bg-purple-500 text-white hover:bg-primary/90 dark:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-4 h-4" />
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
