import { bodyColorSwatches, type GuitarProject } from "@/lib/guitars";

const pickguardColors: Record<string, string> = {
  White: "#f5f0e8",
  Black: "#111111",
  Tortoise: "linear-gradient(135deg, #211008, #7b2f18 38%, #d2904d 58%, #2b1307)",
  "Mint Green": "#d7eadf",
  Pearl: "linear-gradient(135deg, #f8f4e8, #cfd4dc, #fff7dd)",
  None: "transparent",
};

const hardwareColors: Record<string, string> = {
  Chrome: "#d8dde2",
  Nickel: "#c6bca8",
  Gold: "#d6a83f",
  Black: "#171717",
  "Brushed Steel": "#aab0b5",
  "Relic Aged Metal": "#8f826f",
  Titanium: "#9aa4b2",
  Brass: "#b8892e",
};

const bodyShapeStyles: Record<string, React.CSSProperties> = {
  Stratocaster: {
    borderRadius: "46% 34% 42% 46% / 50% 38% 56% 44%",
    clipPath: "polygon(7% 49%, 20% 20%, 45% 25%, 63% 9%, 91% 29%, 82% 51%, 92% 73%, 63% 90%, 45% 75%, 20% 80%)",
  },
  Telecaster: {
    borderRadius: "42% 24% 28% 44% / 48% 28% 50% 46%",
    clipPath: "polygon(8% 47%, 24% 18%, 56% 22%, 82% 33%, 91% 57%, 72% 84%, 28% 80%, 8% 60%)",
  },
  "Les Paul": {
    borderRadius: "48% 40% 44% 48% / 45% 37% 52% 47%",
    clipPath: "polygon(13% 48%, 26% 18%, 52% 15%, 74% 29%, 89% 54%, 75% 82%, 47% 88%, 22% 76%)",
  },
  Jazzmaster: {
    borderRadius: "50% 34% 48% 38% / 36% 56% 38% 58%",
    clipPath: "polygon(9% 39%, 29% 15%, 58% 21%, 85% 33%, 91% 64%, 66% 88%, 35% 79%, 11% 67%)",
  },
  SG: {
    borderRadius: "38% 38% 44% 44% / 46% 34% 50% 48%",
    clipPath: "polygon(8% 50%, 26% 10%, 48% 35%, 73% 10%, 92% 49%, 72% 90%, 49% 66%, 27% 91%)",
  },
  "Flying V": {
    borderRadius: "20% 20% 12% 12%",
    clipPath: "polygon(8% 15%, 47% 45%, 88% 15%, 63% 90%, 48% 64%, 33% 90%)",
  },
  Explorer: {
    borderRadius: "18% 24% 20% 26%",
    clipPath: "polygon(8% 31%, 44% 13%, 65% 36%, 92% 28%, 75% 62%, 91% 86%, 50% 76%, 19% 89%, 29% 59%)",
  },
  "PRS Style": {
    borderRadius: "45% 38% 44% 46% / 43% 36% 53% 48%",
    clipPath: "polygon(11% 48%, 25% 17%, 50% 18%, 65% 9%, 88% 34%, 83% 62%, 66% 86%, 36% 83%, 14% 65%)",
  },
  "Custom Offset": {
    borderRadius: "50% 33% 44% 36% / 38% 54% 36% 57%",
    clipPath: "polygon(8% 39%, 30% 13%, 55% 23%, 87% 28%, 93% 57%, 74% 86%, 43% 78%, 13% 71%)",
  },
};

function getBodyStyle(bodyShape: string, finish: string): React.CSSProperties {
  return {
    background: finish,
    ...(bodyShapeStyles[bodyShape] ?? bodyShapeStyles.Stratocaster),
  };
}

function getPickupPieces(pickups: string) {
  if (pickups === "SSS") {
    return ["single", "single", "single"];
  }

  if (pickups === "HSS") {
    return ["humbucker", "single", "single"];
  }

  if (pickups === "HH") {
    return ["humbucker", "humbucker"];
  }

  if (pickups === "P90") {
    return ["p90", "p90"];
  }

  return ["humbucker", "single", "humbucker"];
}

function getPickupClass(pickup: string) {
  if (pickup === "single") {
    return "h-12 w-3 rounded-sm bg-stone-950";
  }

  if (pickup === "p90") {
    return "h-10 w-7 rounded-md bg-stone-100";
  }

  return "h-12 w-8 rounded bg-stone-950";
}

export function GuitarPreview({ project }: { project: GuitarProject }) {
  const { config } = project;
  const finish = bodyColorSwatches[config.bodyColor] ?? "#c9914b";
  const pickguard = pickguardColors[config.pickguard] ?? pickguardColors.White;
  const hardware = hardwareColors[config.hardwareFinish] ?? hardwareColors.Chrome;
  const pickupPieces = getPickupPieces(config.pickups);
  const showPickguard = config.pickguard !== "None";

  return (
    <div className="overflow-hidden rounded-[30px] border border-zinc-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Visual preview
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">
            {config.bodyShape}
          </h2>
        </div>
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
          Live mockup
        </span>
      </div>

      <div className="relative aspect-[4/3] min-h-72 overflow-hidden rounded-[28px] border border-zinc-200 bg-[radial-gradient(circle_at_50%_35%,_#ffffff,_#f4f4f5_58%,_#eceff3)] p-6">
        <div className="absolute left-8 right-8 top-8 h-px bg-zinc-200/80" />
        <div className="absolute bottom-8 left-8 right-8 h-px bg-zinc-200/80" />
        <div className="absolute left-[8%] top-[18%] h-[64%] w-[84%] rounded-full bg-zinc-300/45 blur-2xl" />

        <div
          className="absolute left-[11%] top-[32%] z-10 h-[43%] w-[48%] border border-black/10 shadow-2xl shadow-zinc-500/30"
          style={getBodyStyle(config.bodyShape, finish)}
        />
        <div
          className="absolute left-[47%] top-[48%] z-20 h-[8%] w-[38%] -translate-y-1/2 rounded-full border-y border-amber-950/20 bg-[linear-gradient(180deg,_#f0d69c,_#b88446)] shadow-lg"
          aria-hidden="true"
        />
        <div className="absolute left-[52%] top-[42%] z-30 h-[12%] w-px bg-zinc-700/45" />
        <div className="absolute left-[58%] top-[42%] z-30 h-[12%] w-px bg-zinc-700/45" />
        <div className="absolute left-[64%] top-[42%] z-30 h-[12%] w-px bg-zinc-700/45" />
        <div className="absolute left-[70%] top-[42%] z-30 h-[12%] w-px bg-zinc-700/45" />

        <div className="absolute left-[80%] top-[36%] z-20 h-[25%] w-[14%] rounded-lg border border-black/10 bg-[linear-gradient(145deg,_#52525b,_#18181b)] shadow-xl">
          <div className="absolute left-1.5 top-2 h-2 w-4 rounded-full" style={{ background: hardware }} />
          <div className="absolute bottom-2 left-1.5 h-2 w-4 rounded-full" style={{ background: hardware }} />
          <div className="absolute right-1.5 top-2 h-2 w-4 rounded-full" style={{ background: hardware }} />
          <div className="absolute bottom-2 right-1.5 h-2 w-4 rounded-full" style={{ background: hardware }} />
        </div>

        {showPickguard ? (
          <div
            className="absolute left-[30%] top-[39%] z-20 h-[25%] w-[18%] rounded-[45%_55%_40%_55%] border border-black/15 shadow-lg"
            style={{ background: pickguard }}
          />
        ) : null}

        <div className="absolute left-[39%] top-[47%] z-30 flex h-[16%] w-[24%] -translate-y-1/2 items-center justify-center gap-1.5">
          {pickupPieces.map((pickup, index) => (
            <span
              key={`${pickup}-${index}`}
              className={`block border border-black/40 shadow-md ${getPickupClass(pickup)}`}
            />
          ))}
        </div>

        <div
          className="absolute left-[55%] top-[51%] z-30 h-[7%] w-[12%] rounded-md border border-black/30 shadow-lg"
          style={{ background: hardware }}
        />
        <div
          className="absolute left-[24%] top-[59%] z-30 h-3 w-3 rounded-full border border-black/20 shadow"
          style={{ background: hardware }}
        />
        <div
          className="absolute left-[29%] top-[64%] z-30 h-3 w-3 rounded-full border border-black/20 shadow"
          style={{ background: hardware }}
        />

        {[42, 46, 50, 54, 58, 62].map((top) => (
          <div
            key={top}
            className="absolute left-[16%] z-40 h-px w-[69%] bg-white/90 shadow-sm"
            style={{ top: `${top}%` }}
          />
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
          <dt className="text-zinc-500">Finish</dt>
          <dd className="mt-1 font-medium text-zinc-950">{config.bodyColor}</dd>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
          <dt className="text-zinc-500">Hardware</dt>
          <dd className="mt-1 font-medium text-zinc-950">{config.hardwareFinish}</dd>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
          <dt className="text-zinc-500">Pickups</dt>
          <dd className="mt-1 font-medium text-zinc-950">{config.pickups}</dd>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
          <dt className="text-zinc-500">Pickguard</dt>
          <dd className="mt-1 font-medium text-zinc-950">{config.pickguard}</dd>
        </div>
      </dl>
    </div>
  );
}
