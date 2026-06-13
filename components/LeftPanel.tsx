type Props = {
  namesText: string;
  setNamesText: (value: string) => void;

  drawMode: "random" | "wheel" | "boss" | "box";
  setDrawMode: (mode: "random" | "wheel" | "boss" | "box") => void;

  history: string[];

  onDraw: () => void;

  isDrawing: boolean;
  namesCount: number;
};

export default function LeftPanel({
  namesText,
  setNamesText,
  drawMode,
  setDrawMode,
  history,
  onDraw,
  isDrawing,
  namesCount,
}: Props) {
  return (
    <div className="rounded-2xl border border-cyan-400/30 bg-slate-950/80 p-5">
      <div className="text-cyan-300 tracking-[0.25em] text-sm mb-8 whitespace-nowrap">
        LAYOUT TEAM SYSTEM
      </div>

      <div className="text-3xl font-black mb-1 whitespace-nowrap">
        SCLDED
      </div>

      <div className="text-xl font-bold mb-6">
        LUCKY DRAW
      </div>

      <div className="border-t border-cyan-400/30 pt-5">

        <div className="text-cyan-300 text-sm mb-3">
          ENGINEER LIST
        </div>

        <div className="text-white/60 text-sm mb-3">
          一行一位 layout engineer
        </div>

        <div className="mb-4">
          <div className="text-cyan-300 text-sm mb-2">
            DRAW MODE
          </div>

          <select
            value={drawMode}
            onChange={(e) =>
              setDrawMode(
                e.target.value as "random" | "wheel" | "boss" | "box"
              )
            }
            className="w-full rounded-lg bg-[#061626] border border-cyan-400/40 p-3 outline-none focus:border-cyan-200 text-white"
          >
            <option value="random">
              亂數抽籤
            </option>

            <option value="wheel">
              圓餅圖抽籤
            </option>

            <option value="boss">
              DON點名
            </option>

            <option value="box">
              白紙選一選
            </option>   

          </select>
        </div>

        <textarea
          value={namesText}
          onChange={(e) =>
            setNamesText(e.target.value)
          }
          className="w-full h-60 rounded-lg bg-[#061626] border border-cyan-400/40 p-3 outline-none focus:border-cyan-200 font-mono"
        />

        <button
          onClick={onDraw}
          disabled={isDrawing || namesCount < 2}
          className="mt-6 w-full py-4 rounded-lg text-lg font-black bg-cyan-400/90 text-black hover:bg-cyan-200 transition-all shadow-[0_0_30px_rgba(34,211,238,.55)] disabled:opacity-40"
        >
          {isDrawing
            ? "ROUTING..."
            : "START ROUTING"}
        </button>
      </div>

      <div className="mt-6 border-t border-cyan-400/30 pt-5">

        <div className="text-cyan-300 text-sm mb-3">
          ROUTING HISTORY
        </div>

        <div className="space-y-2">
          {history.map((h, i) => (
            <div
              key={i}
              className="border border-cyan-400/20 bg-black/30 rounded px-3 py-2 font-mono text-sm flex justify-between"
            >
              <span>
                CELL-
                {String(i + 1).padStart(
                  3,
                  "0"
                )}
              </span>

              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}