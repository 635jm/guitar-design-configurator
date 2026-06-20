import {
  getOptionAsset,
  getRenderableThumbnailPath,
  type GuitarAssetCategory,
  type GuitarOptionAsset,
} from "@/lib/guitar-assets";
import { type GuitarConfig } from "@/lib/guitars";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";

type OptionCardProps = {
  field: keyof GuitarConfig;
  option: string;
  selected: boolean;
  onSelect: () => void;
};

function Thumbnail({ field, option }: { field: keyof GuitarConfig; option: string }) {
  if (field === "neckShape") {
    return (
      <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-zinc-950">
        {option.replace(" Shape", "").replace("Soft ", "").slice(0, 8)}
      </span>
    );
  }

  return (
    <Image
      src={getRenderableThumbnailPath(getAssetCategory(field)!, option)}
      alt=""
      width={96}
      height={60}
      unoptimized
      className="h-full w-full rounded-md object-cover"
    />
  );
}

function getAssetCategory(field: keyof GuitarConfig): GuitarAssetCategory | undefined {
  if (field === "neckShape") {
    return undefined;
  }

  return field as GuitarAssetCategory;
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
      className={`group relative flex h-[76px] min-w-0 flex-col items-center justify-between rounded-lg border bg-white p-1.5 text-center text-[10px] font-semibold leading-tight shadow-sm transition ${
        selected
          ? "border-blue-500 bg-blue-50/20 ring-2 ring-blue-500/12"
          : "border-zinc-200 hover:border-blue-200 hover:shadow-md"
      }`}
      aria-pressed={selected}
      data-thumbnail-path={asset?.thumbnailPath}
      data-preview-layer-path={asset?.previewLayerPath}
    >
      <span className="grid h-10 w-full place-items-center overflow-hidden rounded-md bg-zinc-50">
        <Thumbnail field={field} option={option} />
      </span>
      <span className="line-clamp-2 max-w-full text-zinc-700">
        {option.replace("Single Coil ", "")}
      </span>
      {selected ? (
        <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-blue-600 text-white">
          <IconCheck aria-hidden="true" className="h-2.5 w-2.5" stroke={2.6} />
        </span>
      ) : null}
    </button>
  );
}
