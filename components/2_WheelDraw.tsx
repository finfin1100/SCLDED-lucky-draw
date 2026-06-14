import { getSliceAngle } from "@/utils/wheelUtils";



type Props = {
  names: string[];
  isDrawing: boolean;
  winner: string[];
  displayName: string;
  wheelRotation: number;
  pointerRotation: number;
};

export default function WheelDraw({
  names,
  isDrawing,
  winner,
  displayName,
  wheelRotation,
  pointerRotation,
}: Props) {
  const wheelNames = [...new Set(names.map((name) => name.trim()))].filter(Boolean);
  const sliceAngle = getSliceAngle(wheelNames.length);
  const borderSize = 1.2;
  const wheelColors = [
    "#22d3ee",
    "#fde047",
    "#a78bfa",
    "#fb7185",
    "#4ade80",
    ];

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative w-[520px] h-[520px] flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full border-[6px] border-cyan-200 overflow-hidden transition-transform duration-[7500ms] ease-[cubic-bezier(.05,.95,.15,1)] shadow-[0_0_45px_rgba(34,211,238,.85)] ${
            isDrawing ? "wheelSpinBlur" : ""
          }`}
          style={{
            transform: `rotate(${wheelRotation}deg)`,
            background: `
              conic-gradient(${wheelNames
                .map((_, index) => {
                  const start = index * sliceAngle;
                  const end = (index + 1) * sliceAngle;

                  return `
                    #000 ${start}deg ${start + borderSize}deg,
                    ${wheelColors[index % wheelColors.length]} ${start + borderSize}deg ${end - borderSize}deg,
                    #000 ${end - borderSize}deg ${end}deg
                    `;
                })
                .join(", ")})
            `,
          }}
        >
        {wheelNames.map((name, index) => {
        const angle = index * sliceAngle + sliceAngle / 2;
        const rad = ((angle - 90) * Math.PI) / 180;

        const radius = 230;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        const textRotate =
            angle > 90 && angle < 270 ? angle + 180 : angle;

        return (
            <div
            key={`${name}-${index}`}
            className="absolute left-1/2 top-1/2 flex items-center justify-center"
            style={{
                width: "118px",
                height: "36px",
                transform: `
                translate(-50%, -50%)
                translate(${x}px, ${y}px)
                rotate(${textRotate}deg)
                `,
            }}
            >
                <div
                className="text-center font-black text-black leading-none"
                style={{
                    width: "74px",
                    whiteSpace: "normal",
                    fontSize:
                    name.length >= 6 ? "15px" :
                    name.length >= 5 ? "17px" :
                    name.length >= 4 ? "20px" :
                    "24px",
                }}
                >
                {name.includes(" ")
                    ? name.split(" ").map((part, i) => (
                        <div key={i}>{part}</div>
                    ))
                    : name}
                </div>
            </div>
        );
        })}
        </div>

        <div className="absolute top-[-30px] text-[72px] text-yellow-300 drop-shadow-[0_0_18px_rgba(250,204,21,.95)]">
          ▼
        </div>

        <div
          className="absolute inset-0 transition-transform duration-[7500ms] ease-[cubic-bezier(.05,.95,.15,1)]"
          style={{
            transform: `rotate(${pointerRotation}deg)`,
          }}
        >
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-[72px] text-cyan-300 rotate-180 drop-shadow-[0_0_18px_rgba(34,211,238,.95)]">
            ▼
          </div>
        </div>

        <div className="absolute w-44 h-44 rounded-full bg-black border-4 border-cyan-300 flex items-center justify-center text-cyan-300 font-black text-[46px] text-center shadow-[0_0_30px_rgba(34,211,238,.6)]">
          {isDrawing
            ? "SPIN"
            : winner.length
            ? "DONE"
            : "READY"}
        </div>
      </div>

      <div className="text-5xl md:text-6xl font-black text-yellow-300 text-center px-4">
        {winner.length
          ? winner.join(" × ")
          : displayName || "READY TO SPIN"}
      </div>
    </div>
  );
}