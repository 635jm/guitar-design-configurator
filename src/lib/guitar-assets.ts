import { type GuitarConfig } from "@/lib/guitars";

export type AssetPath = `/${string}`;

export type GuitarAssetCategory =
  | "bodyShape"
  | "bodyMaterial"
  | "neckMaterial"
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
  shadow: AssetPath;
  body: AssetPath;
  neck?: AssetPath;
  pickguard?: AssetPath;
  pickups?: AssetPath;
  bridge?: AssetPath;
  knobs?: AssetPath;
  strings: AssetPath;
  gloss: AssetPath;
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
const visualizerBase = "/assets/visualizer";

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
  C: "c",
  D: "d",
  "Modern C": "modern-c",
  V: "v",
  U: "u",
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
  "Sonic Blue": "sonic-blue",
  "Trans Black": "trans-black",
  "Deep Ocean Blue": "deep-ocean-blue",
  "Custom Color": "custom-color",
  White: "white",
  "White 1-Ply": "white-1-ply",
  Tortoise: "tortoise",
  "Black 3-Ply": "black-3-ply",
  "Tortoise 4-Ply": "tortoise-4-ply",
  "Mint Green": "mint-green",
  "Mint Green 3-Ply": "mint-green-3-ply",
  Pearl: "pearl",
  None: "none",
  "Single Coil SSS": "single-coil-sss",
  SSS: "sss",
  HSS: "hss",
  HH: "hh",
  P90: "p90",
  HSH: "hsh",
  Hardtail: "hardtail",
  "Tune-o-matic": "tune-o-matic",
  "2-Point Tremolo": "2-point-tremolo",
  "6-Saddle Tremolo": "6-saddle-tremolo",
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
  "Satin Gold": "satin-gold",
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

const assetPath = (path: string) => path as AssetPath;

function makeAsset(
  label: string,
  thumbnailFolder: string,
  previewFolder?: string,
): GuitarOptionAsset {
  const slug = getSlug(label);

  return {
    label,
    slug,
    thumbnailPath: assetPath(`${thumbnailBase}/${thumbnailFolder}/${slug}.svg`),
    previewLayerPath: previewFolder
      ? assetPath(`${previewBase}/${previewFolder}/${slug}.png`)
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
    thumbnailPath: assetPath(`${thumbnailBase}/body-shapes/${slug}.svg`),
    previewLayerPath: assetPath(`${previewBase}/bodies/${slug}/body-base.png`),
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
  bodyShape: makeBodyShapeAssetGroup(["Stratocaster", "Telecaster"]),
  bodyMaterial: makeAssetGroup(
    ["Alder", "Ash", "Mahogany", "Basswood"],
    "body-materials",
    "materials",
  ),
  neckMaterial: makeAssetGroup(
    ["Maple", "Roasted Maple", "Mahogany", "Wenge"],
    "body-materials",
    "materials",
  ),
  bodyColor: makeAssetGroup(
    ["Sonic Blue", "Olympic White", "Trans Black", "Deep Ocean Blue"],
    "finishes",
    "finishes",
  ),
  pickguard: makeAssetGroup(
    [
      "White 1-Ply",
      "Black 3-Ply",
      "Tortoise 4-Ply",
      "Mint Green 3-Ply",
      "None",
    ],
    "pickguards",
    "pickguards",
  ),
  pickups: makeAssetGroup(
    ["Single Coil SSS", "HSS", "HH", "P90"],
    "pickups",
    "pickups",
  ),
  bridgeType: makeAssetGroup(
    [
      "2-Point Tremolo",
      "Hardtail",
      "6-Saddle Tremolo",
      "Tune-o-matic",
    ],
    "bridges",
    "bridges",
  ),
  hardwareFinish: makeAssetGroup(
    [
      "Chrome",
      "Nickel",
      "Gold",
      "Black",
      "Satin Gold",
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
  return `${visualizerBase}/thumbnails/${categoryToVisualizerThumbnailFolder(category)}/${getSlug(option)}.png` as AssetPath;
}

export function getPreviewLayers(config: GuitarConfig): PreviewLayerSet {
  const bodyShape = getSlug(config.bodyShape);
  const bodyColor = getSlug(config.bodyColor);
  const neckMaterial = getSlug(config.neckMaterial);
  const pickguard = getSlug(config.pickguard);
  const pickups = getSlug(config.pickups);
  const bridge = getSlug(config.bridgeType);
  const hardware = getSlug(config.hardwareFinish);
  const knobs = getSlug(config.knobs);
  const base = `${visualizerBase}/layers/${bodyShape}`;

  return {
    shadow: assetPath(`${base}/shadow.png`),
    body: assetPath(`${base}/body/${bodyColor}.png`),
    neck: assetPath(`${base}/neck/${neckMaterial}.png`),
    pickguard: assetPath(`${base}/pickguard/${pickguard}.png`),
    pickups: assetPath(`${base}/pickups/${pickups}.png`),
    bridge: assetPath(`${base}/bridge/${bridge}-${hardware}.png`),
    knobs: assetPath(`${base}/knobs/${knobs}-${hardware}.png`),
    strings: assetPath(`${base}/strings.png`),
    gloss: assetPath(`${base}/gloss.png`),
  };
}

function categoryToThumbnailFolder(category: GuitarAssetCategory) {
  const folders: Record<GuitarAssetCategory, string> = {
    bodyShape: "body-shapes",
    bodyMaterial: "body-materials",
    neckMaterial: "body-materials",
    bodyColor: "finishes",
    pickguard: "pickguards",
    pickups: "pickups",
    bridgeType: "bridges",
    hardwareFinish: "hardware-finishes",
    knobs: "knobs",
  };

  return folders[category];
}

function categoryToVisualizerThumbnailFolder(category: GuitarAssetCategory) {
  const folders: Record<GuitarAssetCategory, string> = {
    bodyShape: "body-shapes",
    bodyMaterial: "body-materials",
    neckMaterial: "neck-materials",
    bodyColor: "finishes",
    pickguard: "pickguards",
    pickups: "pickups",
    bridgeType: "bridges",
    hardwareFinish: "hardware-finishes",
    knobs: "knobs",
  };

  return folders[category];
}
