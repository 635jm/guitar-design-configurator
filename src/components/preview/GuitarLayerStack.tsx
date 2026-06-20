/* eslint-disable @next/next/no-img-element */
import { getPreviewLayers } from "@/lib/guitar-assets";
import { type GuitarConfig } from "@/lib/guitars";

type GuitarLayerStackProps = {
  config: GuitarConfig;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

const layerOrder = [
  "shadow",
  "body",
  "neck",
  "pickguard",
  "pickups",
  "bridge",
  "knobs",
  "strings",
  "gloss",
] as const;

export function GuitarLayerStack({
  config,
  alt,
  priority = false,
  className = "",
  imageClassName = "",
}: GuitarLayerStackProps) {
  const layers = getPreviewLayers(config);

  return (
    <div className={`relative h-full w-full ${className}`} aria-label={alt} role="img">
      {layerOrder.map((layer) => {
        const src = layers[layer];

        if (!src) {
          return null;
        }

        return (
          <img
            key={layer}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-contain ${imageClassName}`}
            loading={priority ? "eager" : "eager"}
            decoding="sync"
            draggable={false}
          />
        );
      })}
    </div>
  );
}
