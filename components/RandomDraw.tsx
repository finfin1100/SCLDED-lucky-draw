type Props = {
  isDrawing: boolean;
  winner: string[];
  displayName: string;
};

export default function RandomDraw({
  isDrawing,
  winner,
  displayName,
}: Props) {
  if (isDrawing) {
    return (
      <div className="text-3xl md:text-5xl lg:text-6xl font-black text-cyan-300 animate-pulse text-center break-words px-4">
        {displayName}
      </div>
    );
  }

  if (winner.length) {
    return (
      <>
        <div className="text-6xl md:text-8xl lg:text-[100px] break-words max-w-full px-4 leading-none font-black text-yellow-300 drop-shadow-[0_0_40px_rgba(250,204,21,.9)] text-center">
          {winner.join(" × ")}
        </div>

        <div className="mt-10 text-2xl text-cyan-100">
          DRC PASS ✓　LVS CLEAN ✓
        </div>
      </>
    );
  }

  return (
    <div className="text-6xl font-black text-cyan-300 text-center px-4">
      {displayName || "READY TO ROUTE"}
    </div>
  );
}