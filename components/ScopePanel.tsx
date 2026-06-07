type Props = {
  children: React.ReactNode;
  isDrawing: boolean;
  winner: string[];
};

export default function ScopePanel({
  children,
  isDrawing,
  winner,
}: Props) {
  return (
    <div className="relative rounded-2xl border border-cyan-400/30 bg-[#03101f]/90 p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.08)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative z-10 space-y-7">
        <section className="border border-cyan-400/25 bg-black/20 rounded-xl p-6 overflow-hidden">
          <div className="text-sm font-black text-cyan-300 mb-3">
            INPUT A
            <span className="ml-2 text-sm font-normal text-cyan-200">
              （0 → 1 → 0）
            </span>
          </div>

          <div className="relative overflow-hidden">
            <div className="scopeScan" />

            <svg width="100%" height="115" viewBox="0 0 1000 115">
              <line x1="70" y1="85" x2="960" y2="85" stroke="#164e63" strokeWidth="2" strokeDasharray="8 8" />
              <line x1="70" y1="25" x2="960" y2="25" stroke="#164e63" strokeWidth="2" strokeDasharray="8 8" />

              <text x="0" y="35" fill="#67e8f9" fontSize="22">1</text>
              <text x="0" y="90" fill="#67e8f9" fontSize="22">0</text>

              <path
                d="M80 85 L170 85 L170 25 L300 25 L300 85 L430 85 L430 25 L560 25 L560 85 L690 85 L690 25 L820 25 L820 85 L940 85"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="7"
                strokeLinecap="square"
                className="waveMove"
              />
            </svg>
          </div>
        </section>

        <section className="relative border border-cyan-400/30 rounded-2xl bg-black/30 min-h-[330px] flex flex-col items-center justify-center shadow-[0_0_45px_rgba(34,211,238,.12)] overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,.12),transparent)] animate-[scan_2s_linear_infinite]" />

          <div className="absolute top-5 text-cyan-300 tracking-[0.25em] text-sm font-black">
            {isDrawing
              ? "SIGNAL PROPAGATING"
              : winner.length
              ? "FINAL WINNER"
              : "WAITING RESULT"}
          </div>

          {children}
        </section>

        <section className="border border-cyan-400/25 bg-black/20 rounded-xl p-6 overflow-hidden">
          <div className="text-sm font-black text-yellow-300 mb-3">
            OUTPUT Y
            <span className="ml-2 text-sm font-normal text-yellow-200">
              （1 → 0 → 1，INVERTED）
            </span>
          </div>

          <div className="relative overflow-hidden">
            <div className="scopeScanYellow" />

            <svg width="100%" height="115" viewBox="0 0 1000 115">
              <line x1="70" y1="85" x2="960" y2="85" stroke="#713f12" strokeWidth="2" strokeDasharray="8 8" />
              <line x1="70" y1="25" x2="960" y2="25" stroke="#713f12" strokeWidth="2" strokeDasharray="8 8" />

              <text x="0" y="35" fill="#fde047" fontSize="22">1</text>
              <text x="0" y="90" fill="#fde047" fontSize="22">0</text>

              <path
                d="M80 25 L170 25 L170 85 L300 85 L300 25 L430 25 L430 85 L560 85 L560 25 L690 25 L690 85 L820 85 L820 25 L940 25"
                fill="none"
                stroke="#fde047"
                strokeWidth="7"
                strokeLinecap="square"
                className="waveMove"
              />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}