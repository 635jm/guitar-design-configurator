import { bodyColorSwatches, type GuitarProject } from "@/lib/guitars";

type PickupType = "single" | "humbucker" | "p90";

type BodyLayout = {
  bodyClass: string;
  bodyStyle: React.CSSProperties;
  pickguardClass: string;
  bridgeClass: string;
  controls: Array<{ className: string; type?: "switch" }>;
  pickupLeft: string;
  pickupGap: string;
  neckLeft: string;
  neckTop: string;
  neckWidth: string;
  headstockClass: string;
  accentClass?: string;
};

const pickguardColors: Record<string, string> = {
  White: "#f5f0e8",
  Black: "#111111",
  Tortoise:
    "linear-gradient(135deg, #211008, #7b2f18 38%, #d2904d 58%, #2b1307)",
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

const hardwareHighlights: Record<string, string> = {
  Chrome: "#ffffff",
  Nickel: "#f7f0df",
  Gold: "#fff1a8",
  Black: "#555555",
  "Brushed Steel": "#eef2f5",
  "Relic Aged Metal": "#c4b69d",
  Titanium: "#dce4ef",
  Brass: "#f3ce67",
};

const bodyLayouts: Record<string, BodyLayout> = {
  Stratocaster: {
    bodyClass: "left-[8%] top-[31%] h-[44%] w-[48%]",
    bodyStyle: {
      borderRadius: "47% 33% 43% 46% / 52% 37% 57% 43%",
      clipPath:
        "polygon(6% 48%, 20% 18%, 42% 25%, 59% 8%, 91% 28%, 82% 50%, 94% 73%, 65% 92%, 45% 75%, 20% 83%)",
    },
    pickguardClass:
      "left-[24%] top-[38%] h-[27%] w-[24%] rounded-[58%_42%_44%_56%/48%_58%_42%_52%]",
    bridgeClass: "left-[48%] top-[51%] h-[8%] w-[12%] rounded-md",
    controls: [
      { className: "left-[30%] top-[60%]" },
      { className: "left-[36%] top-[64%]" },
      { className: "left-[41%] top-[58%]", type: "switch" },
    ],
    pickupLeft: "30%",
    pickupGap: "1.25%",
    neckLeft: "51%",
    neckTop: "45%",
    neckWidth: "34%",
    headstockClass:
      "left-[81%] top-[34%] h-[27%] w-[14%] rounded-[35%_20%_32%_24%/22%_38%_34%_28%]",
    accentClass:
      "left-[14%] top-[36%] h-[6%] w-[17%] rounded-full bg-white/25 blur-sm",
  },
  Telecaster: {
    bodyClass: "left-[9%] top-[32%] h-[42%] w-[47%]",
    bodyStyle: {
      borderRadius: "44% 20% 27% 45% / 48% 24% 50% 47%",
      clipPath:
        "polygon(7% 48%, 22% 17%, 54% 20%, 84% 33%, 93% 56%, 72% 85%, 28% 81%, 8% 60%)",
    },
    pickguardClass:
      "left-[23%] top-[37%] h-[24%] w-[20%] rounded-[50%_36%_48%_42%/42%_50%_46%_55%]",
    bridgeClass: "left-[45%] top-[52%] h-[10%] w-[15%] rounded-sm",
    controls: [
      { className: "left-[34%] top-[62%]" },
      { className: "left-[42%] top-[65%]" },
      { className: "left-[28%] top-[58%]", type: "switch" },
    ],
    pickupLeft: "31%",
    pickupGap: "4%",
    neckLeft: "51%",
    neckTop: "45%",
    neckWidth: "34%",
    headstockClass:
      "left-[82%] top-[36%] h-[22%] w-[13%] rounded-[65%_20%_30%_28%/50%_20%_40%_34%]",
    accentClass: "left-[17%] top-[41%] h-[5%] w-[25%] rounded-full bg-white/20",
  },
  Jazzmaster: {
    bodyClass: "left-[7%] top-[29%] h-[47%] w-[50%]",
    bodyStyle: {
      borderRadius: "51% 34% 48% 37% / 36% 57% 39% 58%",
      clipPath:
        "polygon(8% 39%, 30% 14%, 58% 21%, 87% 33%, 93% 63%, 66% 90%, 34% 80%, 10% 68%)",
    },
    pickguardClass:
      "left-[22%] top-[38%] h-[27%] w-[27%] rounded-[54%_35%_48%_40%/38%_54%_42%_57%]",
    bridgeClass: "left-[48%] top-[53%] h-[7%] w-[13%] rounded-full",
    controls: [
      { className: "left-[31%] top-[64%]" },
      { className: "left-[38%] top-[67%]" },
      { className: "left-[18%] top-[40%]", type: "switch" },
    ],
    pickupLeft: "31%",
    pickupGap: "5%",
    neckLeft: "51%",
    neckTop: "45%",
    neckWidth: "34%",
    headstockClass:
      "left-[81%] top-[34%] h-[28%] w-[14%] rounded-[35%_24%_36%_25%/24%_42%_38%_30%]",
    accentClass: "left-[14%] top-[34%] h-[8%] w-[23%] rounded-full bg-white/20",
  },
  Explorer: {
    bodyClass: "left-[5%] top-[27%] h-[51%] w-[53%]",
    bodyStyle: {
      borderRadius: "17% 22% 19% 25%",
      clipPath:
        "polygon(5% 30%, 44% 10%, 66% 35%, 96% 24%, 76% 61%, 94% 88%, 50% 76%, 16% 91%, 29% 59%)",
    },
    pickguardClass:
      "left-[24%] top-[39%] h-[19%] w-[20%] rounded-[18%_44%_26%_42%]",
    bridgeClass: "left-[47%] top-[52%] h-[9%] w-[14%] rounded-sm",
    controls: [
      { className: "left-[23%] top-[65%]" },
      { className: "left-[31%] top-[69%]" },
      { className: "left-[40%] top-[63%]", type: "switch" },
    ],
    pickupLeft: "31%",
    pickupGap: "5%",
    neckLeft: "52%",
    neckTop: "45%",
    neckWidth: "34%",
    headstockClass:
      "left-[81%] top-[33%] h-[29%] w-[15%] rounded-[18%_42%_24%_30%]",
    accentClass:
      "left-[17%] top-[33%] h-[5%] w-[28%] -rotate-12 rounded-full bg-white/16",
  },
  Default: {
    bodyClass: "left-[9%] top-[31%] h-[44%] w-[48%]",
    bodyStyle: {
      borderRadius: "46% 36% 43% 45% / 48% 39% 54% 45%",
      clipPath:
        "polygon(9% 48%, 24% 18%, 51% 18%, 72% 29%, 90% 54%, 76% 84%, 45% 88%, 19% 74%)",
    },
    pickguardClass:
      "left-[27%] top-[39%] h-[24%] w-[21%] rounded-[48%_52%_42%_52%]",
    bridgeClass: "left-[48%] top-[52%] h-[8%] w-[12%] rounded-md",
    controls: [
      { className: "left-[29%] top-[62%]" },
      { className: "left-[36%] top-[66%]" },
    ],
    pickupLeft: "31%",
    pickupGap: "3%",
    neckLeft: "51%",
    neckTop: "45%",
    neckWidth: "34%",
    headstockClass:
      "left-[81%] top-[34%] h-[27%] w-[14%] rounded-[35%_24%_36%_25%/24%_42%_38%_30%]",
  },
};

function getBodyLayout(bodyShape: string) {
  if (bodyShape === "Custom Offset") {
    return bodyLayouts.Jazzmaster;
  }

  return bodyLayouts[bodyShape] ?? bodyLayouts.Default;
}

function getBodyStyle(bodyShape: string, finish: string): React.CSSProperties {
  return {
    background: finish,
    ...(getBodyLayout(bodyShape).bodyStyle),
  };
}

function getPickupPieces(pickups: string): PickupType[] {
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

function getPickupClass(pickup: PickupType) {
  if (pickup === "single") {
    return "h-[48px] w-[12px] rounded-sm bg-zinc-950";
  }

  if (pickup === "p90") {
    return "h-[42px] w-[30px] rounded-md bg-stone-100";
  }

  return "h-[48px] w-[34px] rounded bg-zinc-950";
}

function getBridgeLabel(bridgeType: string) {
  if (bridgeType === "Floyd Rose") {
    return "Locking trem";
  }

  if (bridgeType === "Bigsby") {
    return "Vibrato";
  }

  if (bridgeType === "Tune-o-matic") {
    return "Tune-o-matic";
  }

  return bridgeType;
}

export function GuitarPreview({ project }: { project: GuitarProject }) {
  const { config } = project;
  const finish = bodyColorSwatches[config.bodyColor] ?? "#c9914b";
  const pickguard = pickguardColors[config.pickguard] ?? pickguardColors.White;
  const hardware = hardwareColors[config.hardwareFinish] ?? hardwareColors.Chrome;
  const hardwareHighlight =
    hardwareHighlights[config.hardwareFinish] ?? hardwareHighlights.Chrome;
  const pickupPieces = getPickupPieces(config.pickups);
  const layout = getBodyLayout(config.bodyShape);
  const showPickguard = config.pickguard !== "None";

  return (
    <div className="overflow-hidden rounded-[28px] border border-zinc-200/90 bg-white p-5 shadow-[0_26px_90px_rgba(15,23,42,0.11)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Visual preview
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">
            {config.bodyShape}
          </h2>
        </div>
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm">
          Live mockup
        </span>
      </div>

      <div className="relative aspect-[4/3] min-h-72 overflow-hidden rounded-[24px] border border-zinc-200 bg-[radial-gradient(circle_at_50%_32%,_#ffffff,_#f7f7f8_48%,_#e9edf2)] p-6 shadow-inner">
        <div className="absolute inset-x-8 top-8 h-px bg-white" />
        <div className="absolute inset-x-8 bottom-8 h-px bg-zinc-300/70" />
        <div className="absolute left-[8%] top-[18%] h-[66%] w-[84%] rounded-full bg-zinc-400/25 blur-3xl" />
        <div className="absolute left-[18%] top-[69%] h-[13%] w-[55%] rounded-full bg-zinc-900/10 blur-xl" />

        <div
          className={`absolute z-10 border border-black/10 shadow-[0_24px_55px_rgba(39,39,42,0.28),inset_8px_10px_18px_rgba(255,255,255,0.28),inset_-12px_-14px_24px_rgba(0,0,0,0.16)] ${layout.bodyClass}`}
          style={getBodyStyle(config.bodyShape, finish)}
        />
        <div
          className={`absolute z-20 border border-white/30 ${layout.accentClass ?? ""}`}
        />

        {showPickguard ? (
          <div
            className={`absolute z-20 border border-black/15 shadow-[0_10px_20px_rgba(24,24,27,0.18),inset_0_1px_0_rgba(255,255,255,0.55)] ${layout.pickguardClass}`}
            style={{ background: pickguard }}
          >
            <div className="absolute inset-1 rounded-[inherit] border border-white/20" />
          </div>
        ) : null}

        <div
          className="absolute z-20 h-[8%] -translate-y-1/2 rounded-full border-y border-amber-950/20 bg-[linear-gradient(180deg,_#f2d9a1,_#c79353_55%,_#9a6533)] shadow-[0_10px_18px_rgba(120,80,35,0.18)]"
          style={{
            left: layout.neckLeft,
            top: layout.neckTop,
            width: layout.neckWidth,
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-x-2 top-1/2 h-px bg-amber-950/20" />
          {[18, 34, 50, 66, 82].map((left) => (
            <div
              key={left}
              className="absolute top-1/2 h-[115%] w-px -translate-y-1/2 bg-amber-950/25"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>

        <div
          className={`absolute z-20 border border-black/10 bg-[linear-gradient(145deg,_#5c6470,_#1f2329_62%,_#0d0f12)] shadow-xl ${layout.headstockClass}`}
        >
          {[18, 38, 62, 82].map((top, index) => (
            <div
              key={top}
              className="absolute h-2 w-4 rounded-full border border-black/20 shadow-sm"
              style={{
                background: hardware,
                left: index % 2 === 0 ? "10%" : "62%",
                top: `${top}%`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute top-[43%] z-30 flex h-[18%] -translate-y-1/2 items-center"
          style={{ gap: layout.pickupGap, left: layout.pickupLeft }}
        >
          {pickupPieces.map((pickup, index) => (
            <span
              key={`${pickup}-${index}`}
              className={`relative block border border-black/45 shadow-[0_5px_10px_rgba(24,24,27,0.25)] ${getPickupClass(
                pickup,
              )}`}
            >
              {pickup === "humbucker" ? (
                <span className="absolute inset-y-1 left-1/2 w-px bg-white/20" />
              ) : null}
              {pickup === "p90" ? (
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900/60" />
              ) : null}
            </span>
          ))}
        </div>

        <div
          className={`absolute z-30 border border-black/25 shadow-[0_8px_16px_rgba(24,24,27,0.25),inset_0_1px_0_rgba(255,255,255,0.45)] ${layout.bridgeClass}`}
          style={{
            background: `linear-gradient(135deg, ${hardwareHighlight}, ${hardware})`,
          }}
        >
          <div className="absolute inset-x-1 top-1/2 h-px bg-black/25" />
          {config.bridgeType === "Bigsby" ? (
            <div
              className="absolute -bottom-5 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-full border border-black/20"
              style={{ borderColor: hardware }}
            />
          ) : null}
          {config.bridgeType === "Floyd Rose" ? (
            <div className="absolute -right-3 top-1/2 h-1 w-5 -translate-y-1/2 rounded-full bg-zinc-900/70" />
          ) : null}
        </div>

        {layout.controls.map((control) => (
          <div
            key={control.className}
            className={`absolute z-30 ${
              control.type === "switch"
                ? "h-1.5 w-8 -rotate-12 rounded-full border border-black/20"
                : "h-3.5 w-3.5 rounded-full border border-black/25"
            } shadow-[0_4px_8px_rgba(24,24,27,0.25)] ${control.className}`}
            style={{
              background:
                control.type === "switch"
                  ? `linear-gradient(90deg, ${hardware}, ${hardwareHighlight})`
                  : `radial-gradient(circle_at_35%_28%, ${hardwareHighlight}, ${hardware})`,
            }}
          />
        ))}

        {[40, 44, 48, 52, 56, 60].map((top) => (
          <div
            key={top}
            className="absolute left-[18%] z-40 h-px w-[68%] bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.32)]"
            style={{ top: `${top}%` }}
          />
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        {[
          ["Finish", config.bodyColor],
          ["Hardware", config.hardwareFinish],
          ["Pickups", config.pickups],
          ["Bridge", getBridgeLabel(config.bridgeType)],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-3 shadow-sm"
          >
            <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {label}
            </dt>
            <dd className="mt-1 font-semibold text-zinc-950">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
