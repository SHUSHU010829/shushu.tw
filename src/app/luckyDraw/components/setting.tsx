"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GearIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Setting() {
  const [theme, setTheme] = useState("");
  const [prizes, setPrizes] = useState("");
  const [participants, setParticipants] = useState("");

  useEffect(() => {
    const savedPrizes = localStorage.getItem("draw_prizes");
    if (savedPrizes) {
      setPrizes(savedPrizes);
    }
    const savedTheme = localStorage.getItem("draw_title");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    const savedParticipants = localStorage.getItem("draw_participants");
    if (savedParticipants) {
      setParticipants(savedParticipants);
    }
  }, []);

  const handleThemeChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setTheme(value);
  };

  const handlePrizesChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setPrizes(value);
  };

  const handleParticipantsChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setParticipants(value);
  };

  const handleSave = () => {
    localStorage.setItem("draw_prizes", prizes);
    localStorage.setItem("draw_title", theme);
    localStorage.setItem("draw_participants", participants);
    window.location.reload();
  };

  const handleDelete = () => {
    setTheme("");
    setPrizes("");
    setParticipants("");
    localStorage.removeItem("draw_prizes");
    localStorage.removeItem("draw_title");
    localStorage.removeItem("draw_participants");
    localStorage.removeItem("draw_history");
    window.location.reload();
  };

  return (
    <div className="flex w-full items-center justify-center gap-3 pt-5">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex transform items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-500 transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div>設定</div>
            <GearIcon />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>編輯抽獎資訊</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col">
              <label
                htmlFor="OrderNotes"
                className="block font-medium text-gray-700"
              >
                抽獎主題
              </label>
              <input
                id="theme"
                className="mt-1 h-full w-full resize-none rounded-lg border-2 border-secondary p-2 align-top shadow-sm focus:border-primary focus:outline-primary focus:ring-primary sm:text-sm"
                value={theme}
                onChange={handleThemeChange}
              />
            </div>
            <div className="flex h-44 flex-col">
              <label
                htmlFor="OrderNotes"
                className="block font-medium text-gray-700"
              >
                獎品
              </label>
              <textarea
                id="prizes"
                className="mt-1 h-full w-full resize-none rounded-lg border-2 border-secondary p-2 align-top shadow-sm focus:border-primary focus:outline-primary focus:ring-primary sm:text-sm"
                placeholder="獎品輸入方式：品項名稱, 數量。未輸入數量預設為 1"
                value={prizes}
                onChange={handlePrizesChange}
              ></textarea>
            </div>
            <div className="flex h-56 flex-col">
              <label
                htmlFor="OrderNotes"
                className="block font-medium text-gray-700"
              >
                抽選對象
              </label>
              <textarea
                id="participants"
                className="mt-1 h-full w-full resize-none rounded-lg border-2 border-secondary p-2 align-top shadow-sm focus:border-primary focus:outline-primary focus:ring-primary sm:text-sm"
                placeholder="換行分隔每個抽選對象：名稱, 數量。未輸入數量預設為 1"
                value={participants}
                onChange={handleParticipantsChange}
              ></textarea>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <button
                className="rounded-md border border-black bg-white px-10 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
                onClick={handleSave}
              >
                儲存
              </button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex transform items-center gap-2 rounded-md border border-red-600 bg-red-600 px-4 py-2 text-sm text-white transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div>刪除</div>
            <TrashIcon />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定刪除暫存的資料嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              刪除後無法復原，請謹慎操作。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>確定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
