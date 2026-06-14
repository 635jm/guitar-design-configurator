import { type GuitarConfig } from "@/lib/guitars";

export type AssetPath = `/${string}`;

export type GuitarAssetCategory =
  | "bodyShape"
  | "bodyMaterial"
  | "bodyColor"
  | "pickguard"
  | "pickups"
  | "bridgeType"
  | "hardwareFinish"
  | "knobs";

export type GuitarOptionAsset = {
  label: string;
  slug: string;
  thumbnailPath: AssetPath;
  previewLayerPath?: AssetPath;
  fallbackThumbnailPath: AssetPath;
  fallbackPreviewLayerPath: AssetPath;
};

export type PreviewLayerSet = {
  bodyBase: AssetPath;
  bodyFinish?: AssetPath;
  woodGrain?: AssetPath;
  neck?: AssetPath;
  fretboard?: AssetPath;
  pickguard?: AssetPath;
  pickups?: AssetPath;
  bridge?: AssetPath;
  knobs?: AssetPath;
  switch?: AssetPath;
  hardware?: AssetPath;
  shadow?: AssetPath;
  glossHighlight?: AssetPath;
};

export type GuitarAssetMap = Record<
  GuitarAssetCategory,
  Record<string, GuitarOptionAsset>
>;

export const THUMBNAIL_PLACEHOLDER =
  "/assets/guitar/placeholders/thumbnail-placeholder.svg" as const;

export const PREVIEW_LAYER_PLACEHOLDER =
  "/assets/guitar/placeholders/preview-layer-placeholder.svg" as const;

const thumbnailBase = "/assets/guitar/thumbnails";
const previewBase = "/assets/guitar/preview-layers";

const slugByLabel: Record<string, string> = {
  Stratocaster: "stratocaster",
  Telecaster: "telecaster",
  "Les Paul": "les-paul",
  Jazzmaster: "jazzmaster",
  SG: "sg",
  "Flying V": "flying-v",
  Explorer: "explorer",
  "PRS Style": "prs-style",
  "Custom Offset": "custom-offset",
  "C Shape": "c-shape",
  "Modern C": "modern-c",
  "Soft V": "soft-v",
  "U Shape": "u-shape",
  "D Shape": "d-shape",
  "Thin Wizard": "thin-wizard",
  "Chunky Vintage": "chunky-vintage",
  Alder: "alder",
  Ash: "ash",
  Mahogany: "mahogany",
  Basswood: "basswood",
  "Maple Top": "maple-top",
  Walnut: "walnut",
  "Chambered Body": "chambered-body",
  "Carbon Fiber": "carbon-fiber",
  Sunburst: "sunburst",
  Black: "black",
  "Olympic White": "olympic-white",
  "Candy Apple Red": "candy-apple-red",
  Natural: "natural",
  "Surf Green": "surf-green",
  "Shell Pink": "shell-pink",
  "Matte Black": "matte-black",
  "Transparent Blue": "transparent-blue",
  "Custom Color": "custom-color",
  White: "white",
  Tortoise: "tortoise",
  "Mint Green": "mint-green",
  Pearl: "pearl",
  None: "none",
  SSS: "sss",
  HSS: "hss",
  HH: "hh",
  P90: "p90",
  HSH: "hsh",
  Hardtail: "hardtail",
  "Tune-o-matic": "tune-o-matic",
  "2-point Tremolo": "two-point-tremolo",
  "Floyd Rose": "floyd-rose",
  Bigsby: "bigsby",
  Chrome: "chrome",
  Nickel: "nickel",
  Gold: "gold",
  "Brushed Steel": "brushed-steel",
  "Relic Aged Metal": "relic-aged-metal",
  Titanium: "titanium",
  Brass: "brass",
  "Volume Taper": "volume-taper",
  "Tone Taper": "tone-taper",
  "Dome Metal": "dome-metal",
  "Skirted Metal": "skirted-metal",
};

function getSlug(label: string) {
  return (
    slugByLabel[label] ??
    label
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

function makeAsset(
  label: string,
  thumbnailFolder: string,
  previewFolder?: string,
): GuitarOptionAsset {
  const slug = getSlug(label);

  return {
    label,
    slug,
    thumbnailPath: `${thumbnailBase}/${thumbnailFolder}/${slug}.svg`,
    previewLayerPath: previewFolder
      ? `${previewBase}/${previewFolder}/${slug}.png`
      : undefined,
    fallbackThumbnailPath: THUMBNAIL_PLACEHOLDER,
    fallbackPreviewLayerPath: PREVIEW_LAYER_PLACEHOLDER,
  };
}

function makeAssetGroup(
  labels: readonly string[],
  thumbnailFolder: string,
  previewFolder?: string,
) {
  return Object.fromEntries(
    labels.map((label) => [
      label,
      makeAsset(label, thumbnailFolder, previewFolder),
    ]),
  );
}

function makeBodyShapeAsset(label: string): GuitarOptionAsset {
  const slug = getSlug(label);

  return {
    label,
    slug,
    thumbnailPath: `${thumbnailBase}/body-shapes/${slug}.svg`,
    previewLayerPath: `${previewBase}/bodies/${slug}/body-base.png`,
    fallbackThumbnailPath: THUMBNAIL_PLACEHOLDER,
    fallbackPreviewLayerPath: PREVIEW_LAYER_PLACEHOLDER,
  };
}

function makeBodyShapeAssetGroup(labels: readonly string[]) {
  return Object.fromEntries(
    labels.map((label) => [label, makeBodyShapeAsset(label)]),
  );
}

export const guitarAssetMap = {
  bodyShape: makeBodyShapeAssetGroup(
    [
      "Stratocaster",
      "Telecaster",
      "Les Paul",
      "Jazzmaster",
      "SG",
      "Flying V",
      "Explorer",
      "PRS Style",
      "Custom Offset",
    ],
  ),
  bodyMaterial: makeAssetGroup(
    [
      "Alder",
      "Ash",
      "Mahogany",
      "Basswood",
      "Maple Top",
      "Walnut",
      "Chambered Body",
      "Carbon Fiber",
    ],
    "body-materials",
    "materials",
  ),
  bodyColor: makeAssetGroup(
    [
      "Sunburst",
      "Black",
      "Olympic White",
      "Candy Apple Red",
      "Natural",
      "Surf Green",
      "Shell Pink",
      "Matte Black",
      "Transparent Blue",
      "Custom Color",
    ],
    "finishes",
    "finishes",
  ),
  pickguard: makeAssetGroup(
    ["White", "Black", "Tortoise", "Mint Green", "Pearl", "None"],
    "pickguards",
    "pickguards",
  ),
  pickups: makeAssetGroup(
    ["SSS", "HSS", "HH", "P90", "HSH"],
    "pickups",
    "pickups",
  ),
  bridgeType: makeAssetGroup(
    ["Hardtail", "Tune-o-matic", "2-point Tremolo", "Floyd Rose", "Bigsby"],
    "bridges",
    "bridges",
  ),
  hardwareFinish: makeAssetGroup(
    [
      "Chrome",
      "Nickel",
      "Gold",
      "Black",
      "Brushed Steel",
      "Relic Aged Metal",
      "Titanium",
      "Brass",
    ],
    "hardware-finishes",
    "hardware",
  ),
  knobs: makeAssetGroup(
    ["Volume Taper", "Tone Taper", "Dome Metal", "Skirted Metal"],
    "knobs",
    "knobs",
  ),
} satisfies GuitarAssetMap;

export function getOptionAsset(
  category: GuitarAssetCategory,
  option: string,
): GuitarOptionAsset {
  return (
    guitarAssetMap[category][option] ??
    makeAsset(option, categoryToThumbnailFolder(category))
  );
}

export function getRenderableThumbnailPath(
  category: GuitarAssetCategory,
  option: string,
) {
  return getOptionAsset(category, option).fallbackThumbnailPath;
}

export function getPreviewLayers(config: GuitarConfig): PreviewLayerSet {
  const bodyShape = getOptionAsset("bodyShape", config.bodyShape);
  const bodyColor = getOptionAsset("bodyColor", config.bodyColor);
  const bodyMaterial = getOptionAsset("bodyMaterial", config.bodyMaterial);
  const pickguard = getOptionAsset("pickguard", config.pickguard);
  const pickups = getOptionAsset("pickups", config.pickups);
  const bridge = getOptionAsset("bridgeType", config.bridgeType);
  const hardware = getOptionAsset("hardwareFinish", config.hardwareFinish);

  return {
    bodyBase: `${previewBase}/bodies/${bodyShape.slug}/body-base.png`,
    bodyFinish: bodyColor.previewLayerPath,
    woodGrain: bodyMaterial.previewLayerPath,
    neck: `${previewBase}/necks/${getSlug(config.neckShape)}.png`,
    fretboard: `${previewBase}/fretboards/maple.png`,
    pickguard: pickguard.previewLayerPath,
    pickups: pickups.previewLayerPath,
    bridge: bridge.previewLayerPath,
    knobs: `${previewBase}/knobs/volume-taper.png`,
    switch: `${previewBase}/switches/blade-switch.png`,
    hardware: hardware.previewLayerPath,
    shadow: `${previewBase}/bodies/${bodyShape.slug}/shadow.png`,
    glossHighlight: `${previewBase}/bodies/${bodyShape.slug}/gloss-highlight.png`,
  };
}

function categoryToThumbnailFolder(category: GuitarAssetCategory) {
  const folders: Record<GuitarAssetCategory, string> = {
    bodyShape: "body-shapes",
    bodyMaterial: "body-materials",
    bodyColor: "finishes",
    pickguard: "pickguards",
    pickups: "pickups",
    bridgeType: "bridges",
    hardwareFinish: "hardware-finishes",
    knobs: "knobs",
  };

  return folders[category];
}
