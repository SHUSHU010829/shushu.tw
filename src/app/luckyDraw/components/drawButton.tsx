"use client";

import { useEffect, useState } from "react";
import { FaceIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import confetti from "canvas-confetti";

export default function DrawButton() {
  const [winnerPeople, setWinnerPeople] = useState("");
  const [winnerPrize, setWinnerPrize] = useState("");
  const [openWinnerCard, setOpenWinnerCard] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    const savedPrize = localStorage.getItem("draw_prizes")?.trim();
    if (savedPrize) {
      setButtonStatus(true);
    }
    const savedParticipants = localStorage.getItem("draw_participants")?.trim();
    if (savedParticipants) {
      setButtonStatus(true);
    }
  }, []);

  const handleDraw = () => {
    if (localStorage.getItem("draw_prizes")?.trim() === "") {
      alert("沒有獎品囉！");
      return;
    } else if (localStorage.getItem("draw_participants")?.trim() === "") {
      alert("沒人可以抽了喔！");
      return;
    }
    const drawPrizes =
      localStorage.getItem("draw_prizes")?.trim().split("\n") || [];
    const drawParticipants =
      localStorage.getItem("draw_participants")?.trim().split("\n") || [];

    // Create the prize pool
    const prizePool: string[] = [];
    drawPrizes.forEach(prize => {
      const [prizeName, count] = prize.split(", ");
      const prizeCount = parseInt(count) || 1;
      for (let i = 0; i < prizeCount; i++) {
        prizePool.push(prizeName);
      }
    });

    // Create the participants pool
    let participantsPool: string[] = [];
    drawParticipants.forEach(participant => {
      const [participantName, count] = participant.split(", ");
      const participantCount = parseInt(count) || 1;
      for (let i = 0; i < participantCount; i++) {
        participantsPool.push(participantName);
      }
    });

    // Conduct the draw
    const prizeName = prizePool.shift();
    const winnerIndex = Math.floor(Math.random() * participantsPool.length);
    const winner = participantsPool.splice(winnerIndex, 1)[0];

    // Remove all instances of the winner from the participants pool
    participantsPool = participantsPool.filter(
      participant => participant !== winner
    );

    // Update the local storage
    const drawHistory = localStorage.getItem("draw_history")
      ? JSON.parse(localStorage.getItem("draw_history") || "")
      : [];
    drawHistory.push({ winner, prize: prizeName });
    localStorage.setItem("draw_history", JSON.stringify(drawHistory));
    setOpenWinnerCard(true);

    // Update the prize pool and participants pool in localStorage
    localStorage.setItem("draw_prizes", prizePool.join("\n"));
    localStorage.setItem("draw_participants", participantsPool.join("\n"));

    setWinnerPeople(winner);
    if (prizeName) setWinnerPrize(prizeName);

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleClose = () => {
    window.location.reload();
  };

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <button
        className={`flex transform items-center gap-2 rounded-md border border-primary bg-primary px-16 py-2 text-sm text-white transition duration-200 hover:-translate-y-1 hover:shadow-md ${buttonStatus ? "cursor-pointer" : "cursor-not-allowed bg-stone-700"}`}
        onClick={handleDraw}
        disabled={!buttonStatus}
      >
        <div>抽獎</div>
        <FaceIcon />
      </button>
      <AlertDialog open={openWinnerCard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl">
              獲獎者：{winnerPeople} 🎉
            </AlertDialogTitle>
            <AlertDialogDescription>
              恭喜抽到了<strong>{winnerPrize}</strong>！
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleClose}
              className="w-full bg-secondary hover:bg-opacity-80 hover:duration-200"
            >
              恭喜它
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
