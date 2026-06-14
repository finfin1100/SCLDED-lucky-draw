"use client";

import { useEffect, useState } from "react";

type Props = {
  names: string[];
  round: number;
  onComplete: (winners: string[]) => void;
};

function shuffle(list: string[]) {
  const arr = [...list];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function getBoxGrid(names: string[], columns: number) {
  const totalSlots = columns * columns;
  const emptySlots = totalSlots - names.length;

  const frontEmpty = Math.floor(emptySlots / 2);
  const backEmpty = emptySlots - frontEmpty;

  return [
    ...Array(frontEmpty).fill(null),
    ...names,
    ...Array(backEmpty).fill(null),
  ];
}

export default function BoxDraw({
  names,
  round,
  onComplete,
}: Props) {
  const [boxNames, setBoxNames] = useState<string[]>(names);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [canChoose, setCanChoose] = useState(false);

  const columns = Math.ceil(Math.sqrt(boxNames.length));

  const gridItems = getBoxGrid(boxNames, columns);

  useEffect(() => {
    if (round === 0) {
      setBoxNames(names);
      return;
    }

    setSelectedNames([]);
    setCanChoose(false);
    setIsShuffling(true);

    const interval = setInterval(() => {
      setBoxNames(shuffle(names));
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setBoxNames(shuffle(names));
      setIsShuffling(false);
      setCanChoose(true);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [round]);

  const chooseBox = (name: string) => {
    if (!canChoose) return;
    if (selectedNames.includes(name)) return;
    if (selectedNames.length >= 2) return;

    const nextSelectedNames = [...selectedNames, name];
    setSelectedNames(nextSelectedNames);

    if (nextSelectedNames.length === 2) {
      setCanChoose(false);
      onComplete(nextSelectedNames);
    }
  };

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 96px)`,
      }}
    >
        {gridItems.map((name, index) => {
        if (name === null) {
            return (
            <div
                key={`empty-${index}`}
                className="w-24 h-24 pointer-events-none"
            />
            );
        }
        const isSelected = selectedNames.includes(name);

        return (
          <button
            key={`${name}-${index}`}
            type="button"
            onClick={() => chooseBox(name)}
            disabled={!canChoose || isSelected}
            className={`
              w-24 h-24 rounded-xl border-2
              flex items-center justify-center
              font-black text-xl transition-all
              ${
                isSelected
                  ? "bg-yellow-300 text-black border-yellow-100 ring-4 ring-white shadow-[0_0_25px_rgba(255,255,255,.8)]"
                  : "bg-cyan-500/10 text-cyan-300 border-cyan-300 hover:scale-105"
              }
              ${canChoose ? "cursor-pointer" : "cursor-not-allowed"}
            `}
          >
            {isShuffling
              ? "..."
              : round > 0 && canChoose && !isSelected
              ? "?"
              : name}
          </button>
        );
      })}
    </div>
  );
}