"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  names: string[];
  round: number;
  onComplete: (winners: string[]) => void;
};

type Bridge = {
  row: number;
  left: number;
};

type PathPoint = {
  x: number;
  y: number;
};

const BRIDGE_ROWS = 30;

function createBridges(namesLength: number) {
  const rows = BRIDGE_ROWS;
  const bridges: Bridge[] = [];
  let previousLefts: number[] = [];

  for (let row = 0; row < rows; row++) {
    const currentLefts: number[] = [];

    for (let left = 0; left < namesLength - 1; left++) {
      const shouldCreate = Math.random() < 0.35;

      const isNextToCurrent =
        currentLefts.includes(left - 1);

      const isSameAsPrevious =
        previousLefts.includes(left);

      if (
        shouldCreate &&
        !isNextToCurrent &&
        !isSameAsPrevious
      ) {
        currentLefts.push(left);
        bridges.push({ row, left });
      }
    }

    previousLefts = currentLefts;
  }

  return bridges;
}

function getBridgeY(row: number, lineHeight: number) {
  const startY = 60;
  const endY = 275;

  return startY + (row * (endY - startY)) / (BRIDGE_ROWS - 1);
}

function getPathPoints(
  startLine: number,
  bridges: Bridge[],
  lineGap: number,
  lineHeight: number
) {
  let currentLine = startLine;

  const sortedBridges = [...bridges].sort(
    (a, b) => b.row - a.row
  );

  const points: PathPoint[] = [
    { x: currentLine * lineGap, y: 300 },
  ];

  for (const bridge of sortedBridges) {
    const bridgeY = getBridgeY(
      bridge.row,
      lineHeight
    );

    const isLeftSide =
      bridge.left === currentLine;

    const isRightSide =
      bridge.left + 1 === currentLine;

    if (!isLeftSide && !isRightSide) continue;

    points.push({
      x: currentLine * lineGap,
      y: bridgeY,
    });

    currentLine = isLeftSide
      ? currentLine + 1
      : currentLine - 1;

    points.push({
      x: currentLine * lineGap,
      y: bridgeY,
    });
  }

  points.push({
    x: currentLine * lineGap,
    y: 45,
  });

  return {
    points,
    winnerIndex: currentLine,
  };
}

export default function LadderDraw({
  names,
  round,
  onComplete,
}: Props) {
  const [selectedLines, setSelectedLines] =
    useState<number[]>([]);

  const [paths, setPaths] =
    useState<PathPoint[][]>([]);

  const [winners, setWinners] =
    useState<string[]>([]);
  const pathRefs = useRef<(SVGPolylineElement | null)[]>([]);

    const [bridges, setBridges] =
        useState<Bridge[]>(() =>
            createBridges(names.length)
        );
    const [ladderNames, setLadderNames] =
        useState<string[]>(names);

    useEffect(() => {
    setSelectedLines([]);
    setPaths([]);
    setWinners([]);

    setBridges(
        createBridges(names.length)
    );

    setLadderNames(
        [...names].sort(() => Math.random() - 0.5)
    );
    }, [round]);

  const lineGap = 48;
  const lineHeight = 240;
  const width = (names.length - 1) * lineGap;

    const selectLine = (index: number) => {
    if (selectedLines.includes(index)) return;
    if (selectedLines.length >= 2) return;

    const nextSelectedLines = [
        ...selectedLines,
        index,
    ];

    setSelectedLines(nextSelectedLines);

    if (nextSelectedLines.length === 2) {
        const results = nextSelectedLines.map((lineIndex) =>
        getPathPoints(
            lineIndex,
            bridges,
            lineGap,
            lineHeight
        )
        );

        setPaths(results.map((result) => result.points));

        const finalWinners = results.map(
        (result) => ladderNames[result.winnerIndex]
        );

        setWinners(finalWinners);
        onComplete(finalWinners);
    }
    };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-cyan-300 font-black tracking-[0.25em]">
        LADDER LOTTERY
      </div>

      <div
        className="relative"
        style={{ width, height: 360 }}
      >
        {ladderNames.map((name, index) => {
          const x = index * lineGap;

          return (
            <div key={name}>
              <div
                className="absolute top-3 -translate-x-1/2 text-center text-xs font-black text-yellow-300 w-12 truncate"
                style={{ left: x }}
              >
                {selectedLines.length === 2 ? name : "?"}
              </div>

              <div
                className="absolute top-10 w-[3px] bg-cyan-300/70 rounded-full"
                style={{
                  left: x,
                  height: 240,
                }}
              />

              <button
                type="button"
                onClick={() => selectLine(index)}
                className={`
                  absolute top-[300px] -translate-x-1/2 w-10 h-10 rounded-full border-2
                  font-black transition-all
                  ${
                    selectedLines.includes(index)
                      ? "bg-yellow-300 text-black border-yellow-100 ring-4 ring-white"
                      : "border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-black"
                  }
                `}
                style={{ left: x }}
              >
                {index + 1}
              </button>
            </div>
          );
        })}

        {selectedLines.length === 2 &&
          bridges.map((bridge) => {
          const x = bridge.left * lineGap;
          const y = getBridgeY(
            bridge.row,
            lineHeight
          );

          return (
            <div
              key={`${bridge.row}-${bridge.left}`}
              className="absolute h-[3px] bg-yellow-300 rounded-full shadow-[0_0_12px_rgba(250,204,21,.9)]"
              style={{
                left: x,
                top: y,
                width: lineGap,
              }}
            />
          );
        })}

        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={360}
        >
          {paths.map((path, index) => (
            <polyline
            key={index}
            ref={(element) => {
                pathRefs.current[index] = element;

                if (element) {
                const length = element.getTotalLength();

                element.style.strokeDasharray = `${length}`;
                element.style.strokeDashoffset = `${length}`;

                element.getBoundingClientRect();

                element.style.animation =
                    "ladderDraw 5s ease-out forwards";
                }
            }}
            points={path
                .map((point) => `${point.x},${point.y}`)
                .join(" ")}
            fill="none"
            stroke={index === 0 ? "#fb7185" : "#4ade80"}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>

      <div className="text-white/60 text-sm">
        {winners.length < 2
          ? "請選上面兩個數字"
          : `結果：${winners.join(" × ")}`}
      </div>
    </div>
  );
}