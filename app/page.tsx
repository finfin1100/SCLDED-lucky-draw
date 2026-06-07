"use client";

import { useMemo, useRef, useState } from "react";

import LeftPanel from "@/components/LeftPanel";
import RandomDraw from "@/components/RandomDraw";
import ScopePanel from "@/components/ScopePanel";
import WheelDraw from "@/components/WheelDraw";

import type { DrawMode } from "@/types/draw";

import {
  createHistoryRecord,
  getAvailableNames,
  getUniqueNames,
  shuffle,
} from "@/utils/drawUtils";

import {
  createRandomWheelRotation,
  createRandomPointerRotation,
  getWinnersFromPointers,
} from "@/utils/wheelUtils";

export default function Home() {
  const [namesText, setNamesText] = useState(
    "FIN\n上軒\n有銘\n聖棋\n博之\n偉嘉\n嘉嶸\n宜潔\n薾云\n宜鳳\n雅玲\n江瑋\n平心\nPro Max\n棋淵\n隱1\n隱2\n隱3\n隱4\n隱5"
  );

  const [displayName, setDisplayName] = useState("");
  const [winner, setWinner] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const historyRef = useRef<string[]>([]);

  const [drawMode, setDrawMode] =
    useState<DrawMode>("random");

  const [wheelRotation, setWheelRotation] =
    useState(0);
  const [pointerRotation, setPointerRotation] =
  useState(0);
  const [activeWheelNames, setActiveWheelNames] =
    useState<string[]>([]);

  const names = useMemo(() => {
    return namesText
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
  }, [namesText]);

  const draw = () => {
    const uniqueNames = getUniqueNames(names);

    if (uniqueNames.length < 2 || isDrawing) return;

    const pool = getAvailableNames(
      uniqueNames,
      historyRef.current
    );

    if (pool.length < 2) {
      setWinner([]);
      setDisplayName("人數不足，請按 F5 重新開始");
      return;
    }

    setWinner([]);
    setIsDrawing(true);

    const finalWinners = shuffle(pool).slice(0, 2);

    if (drawMode === "wheel") {
      setDisplayName("WHEEL SPINNING...");
      setActiveWheelNames(pool);

      const targetRotation =
        createRandomWheelRotation(wheelRotation);

      const targetPointerRotation =
        createRandomPointerRotation(
          pool,
          targetRotation,
          pointerRotation
        );

      setWheelRotation(targetRotation);
      setPointerRotation(targetPointerRotation);

      setTimeout(() => {
        let actualWinners = getWinnersFromPointers(
          pool,
          targetRotation,
          targetPointerRotation
        );

        if (actualWinners[0] === actualWinners[1]) {
          const firstWinnerIndex = pool.indexOf(actualWinners[0]);

          const secondWinner = pool.find(
            (_, index) => index !== firstWinnerIndex
          );

          actualWinners = [
            actualWinners[0],
            secondWinner!,
          ];
        }

        const newRecord =
          createHistoryRecord(actualWinners);

        const nextHistory = [
          ...historyRef.current,
          newRecord,
        ];

        historyRef.current = nextHistory;

        setWinner(actualWinners);
        setDisplayName(newRecord);
        setHistory(nextHistory);
        setIsDrawing(false);
      }, 7500);

      return;
    }

    let count = 0;

    const interval = setInterval(() => {
      const preview = shuffle(pool).slice(0, 2);
      setDisplayName(preview.join(" × "));

      count++;

      if (count > 45) {
        clearInterval(interval);

        const newRecord =
          createHistoryRecord(finalWinners);

        const nextHistory = [
          ...historyRef.current,
          newRecord,
        ];

        historyRef.current = nextHistory;

        setWinner(finalWinners);
        setDisplayName(newRecord);
        setHistory(nextHistory);
        setIsDrawing(false);
      }
    }, 80);
  };
const wheelDisplayNames =
  activeWheelNames.length > 0
    ? activeWheelNames
    : getAvailableNames(names, history);
    return (
    <div className="min-h-screen bg-[#020711] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.07)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-[620px] h-[620px] rounded-full bg-yellow-500/10 blur-[160px]" />

      <div className="relative z-10 max-w-[1500px] mx-auto p-6 grid lg:grid-cols-[310px_1fr] gap-6">
        <LeftPanel
          namesText={namesText}
          setNamesText={setNamesText}
          drawMode={drawMode}
          setDrawMode={setDrawMode}
          history={history}
          onDraw={draw}
          isDrawing={isDrawing}
          namesCount={names.length}
        />

        <ScopePanel
          isDrawing={isDrawing}
          winner={winner}
        >
          {drawMode === "wheel" ? (
            <WheelDraw
              names={wheelDisplayNames}
              isDrawing={isDrawing}
              winner={winner}
              displayName={displayName}
              wheelRotation={wheelRotation}
              pointerRotation={pointerRotation}
            />
          ) : (
            <RandomDraw
              isDrawing={isDrawing}
              winner={winner}
              displayName={displayName}
            />
          )}
        </ScopePanel>
      </div>

      <style jsx global>{`
        .waveMove {
          stroke-dasharray: 80 18;
          animation: waveDash 0.8s linear infinite;
        }

        @keyframes waveDash {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -98;
          }
        }

        .scopeScan {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;

          background: linear-gradient(
            90deg,
            rgba(34,211,238,0) 0%,
            rgba(34,211,238,0.08) 25%,
            rgba(34,211,238,0.18) 55%,
            rgba(34,211,238,0.25) 78%,
            rgba(255,255,255,0.95) 88%,
            rgba(34,211,238,0.15) 94%,
            rgba(34,211,238,0) 100%
          );

          filter: blur(1px);
          animation: scopeMove 2s linear infinite;
          pointer-events: none;
          z-index: 10;
        }

        .scopeScanYellow {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;

          background: linear-gradient(
            90deg,
            rgba(253,224,71,0) 0%,
            rgba(253,224,71,0.08) 25%,
            rgba(253,224,71,0.18) 55%,
            rgba(253,224,71,0.45) 78%,
            rgba(255,255,255,0.95) 88%,
            rgba(253,224,71,0.15) 94%,
            rgba(253,224,71,0) 100%
          );

          filter: blur(1px);
          animation: scopeMove 2s linear infinite;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes scopeMove {
          from {
            transform: translateX(-150px);
          }

          to {
            transform: translateX(1200px);
          }
        }

        @keyframes scan {
          from {
            transform: translateX(-120px);
          }

          to {
            transform: translateX(1300px);
          }
        }

        @keyframes statusCycle {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          4% {
            opacity: 1;
            transform: translateY(0px);
          }

          16% {
            opacity: 1;
            transform: translateY(0px);
          }

          20% {
            opacity: 0;
            transform: translateY(-18px);
          }

          100% {
            opacity: 0;
            transform: translateY(-18px);
          }
        }

        .wheelSpinBlur {
          filter: blur(1.2px);
        }
      `}</style>
    </div>
  );
}