import {
  getOptionAsset,
  type GuitarAssetCategory,
  type GuitarOptionAsset,
} from "@/lib/guitar-assets";
import { bodyColorSwatches, type GuitarConfig } from "@/lib/guitars";

type OptionCardProps = {
  field: keyof GuitarConfig;
  option: string;
  selected: boolean;
  onSelect: () => void;
};

const woodSwatches: Record<string, string> = {
  Alder: "linear-gradient(135deg,#d9a45e,#f2d198)",
  Ash: "linear-gradient(135deg,#d29d58,#f7dfae 45%,#b77d39)",
  Mahogany: "linear-gradient(135deg,#4f1d0d,#8d3f16)",
  Basswood: "linear-gradient(135deg,#e7bd80,#f7dfb6)",
  "Maple Top": "linear-gradient(135deg,#e8c984,#fff0bd)",
  Walnut: "linear-gradient(135deg,#4f2e1f,#9a6a43)",
  "Chambered Body": "linear-gradient(135deg,#d5a55d,#80502f)",
  "Carbon Fiber": "repeating-linear-gradient(45deg,#20242b 0 6px,#111318 6px 12px)",
};

const pickguardSwatches: Record<string, string> = {
  White: "#f8f6ef",
  Black: "#161616",
  Tortoise: "linear-gradient(135deg,#2b1208,#8d3a17,#d08b45)",
  "Mint Green": "#d9eadf",
  Pearl: "linear-gradient(135deg,#f7f1df,#ced7dd,#fff7df)",
  None: "linear-gradient(135deg,#fff,#f4f4f5)",
};

const hardwareSwatches: Record<string, string> = {
  Chrome: "linear-gradient(135deg,#f9fafb,#bfc7cf,#ffffff)",
  Nickel: "linear-gradient(135deg,#eee4cf,#b7ab93)",
  Gold: "linear-gradient(135deg,#ffe8a3,#c38b19)",
  Black: "#111111",
  "Brushed Steel": "linear-gradient(135deg,#e4e7eb,#929aa3)",
  "Relic Aged Metal": "linear-gradient(135deg,#b9a98a,#776b58)",
  Titanium: "linear-gradient(135deg,#dfe7f1,#8995a3)",
  Brass: "linear-gradient(135deg,#f3d06f,#a97920)",
};

function getThumbnailStyle(field: keyof GuitarConfig, option: string) {
  if (field === "bodyColor") {
    return { background: bodyColorSwatches[option] ?? "#e5e7eb" };
  }

  if (field === "bodyMaterial") {
    return { background: woodSwatches[option] ?? "#e5e7eb" };
  }

  if (field === "pickguard") {
    return { background: pickguardSwatches[option] ?? "#f4f4f5" };
  }

  if (field === "hardwareFinish") {
    return { background: hardwareSwatches[option] ?? "#d4d4d8" };
  }

  return undefined;
}

function Thumbnail({ field, option }: { field: keyof GuitarConfig; option: string }) {
  const style = getThumbnailStyle(field, option);

  if (style) {
    return <span className="h-full w-full rounded-md border border-black/5" style={style} />;
  }

  if (field === "bodyShape") {
    return (
      <span className="relative h-12 w-12 rounded-[48%_34%_44%_46%/50%_38%_56%_44%] bg-zinc-400 shadow-inner">
        <span className="absolute left-8 top-5 h-2 w-8 rounded-full bg-zinc-400" />
      </span>
    );
  }

  if (field === "neckShape") {
    return (
      <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-zinc-700">
        {option.replace(" Shape", "").slice(0, 8)}
      </span>
    );
  }

  if (field === "pickups") {
    return (
      <span className="flex items-center gap-1">
        {option.split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={`block rounded-sm bg-zinc-900 ${
              letter === "H" ? "h-6 w-5" : "h-6 w-2"
            }`}
          />
        ))}
      </span>
    );
  }

  return (
    <span className="h-6 w-12 rounded border border-zinc-400 bg-[linear-gradient(135deg,#f8fafc,#cbd5e1)] shadow-sm" />
  );
}

function getAssetCategory(field: keyof GuitarConfig): GuitarAssetCategory | undefined {
  if (field === "neckShape") {
    return undefined;
  }

  return field;
}

function getCardAsset(
  field: keyof GuitarConfig,
  option: string,
): GuitarOptionAsset | undefined {
  const category = getAssetCategory(field);

  return category ? getOptionAsset(category, option) : undefined;
}

export function OptionCard({ field, option, selected, onSelect }: OptionCardProps) {
  const asset = getCardAsset(field, option);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex h-[88px] min-w-0 flex-col items-center justify-between rounded-lg border bg-white p-2 text-center text-[11px] font-semibold leading-tight shadow-sm transition sm:h-[92px] ${
        selected
          ? "border-blue-500 ring-2 ring-blue-500/15"
          : "border-zinc-200 hover:border-blue-200 hover:shadow-md"
      }`}
      aria-pressed={selected}
      data-thumbnail-path={asset?.thumbnailPath}
      data-preview-layer-path={asset?.previewLayerPath}
    >
      <span className="grid h-11 w-full place-items-center overflow-hidden rounded-md bg-zinc-100 sm:h-12">
        <Thumbnail field={field} option={option} />
      </span>
      <span className="line-clamp-2 max-w-full text-zinc-700">{option}</span>
      {selected ? (
        <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-blue-600 text-white">
          <svg
            aria-hidden="true"
            className="h-2.5 w-2.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 16 16"
          >
            <path d="m3 8 3 3 7-7" />
          </svg>
        </span>
      ) : null}
    </button>
  );
}
