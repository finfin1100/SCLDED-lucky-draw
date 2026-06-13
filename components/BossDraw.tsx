type Props = {
  isDrawing: boolean;
  winner: string[];
  displayName: string;
};

export default function BossDraw({
  isDrawing,
  winner,
  displayName,
}: Props) {
  const bossText = isDrawing
    ? "讓我看看..."
    : winner.length
    ? "今天就你們兩個！"
    : "DON READY";

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4">
      <div className="flex items-center justify-center gap-6">
        <img
          src="/boss.png"
          alt="DON"
          className="w-[170px] h-[170px] object-contain drop-shadow-[0_0_35px_rgba(34,211,238,.9)]"
        />

        <div className="relative w-[360px] rounded-2xl bg-white text-black px-6 py-5 text-center font-black text-2xl shadow-[0_0_25px_rgba(255,255,255,.45)]">
          {bossText}

          <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[14px] border-b-[14px] border-r-[20px] border-t-transparent border-b-transparent border-r-white" />
        </div>
      </div>

      <div className="text-5xl font-black text-yellow-300 text-center">
        {winner.length
          ? winner.join(" × ")
          : displayName || "DON READY"}
      </div>
    </div>
  );
}