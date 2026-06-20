"use client";

import Image from "next/image";
import { useState } from "react";
import { PreviewToolbar } from "@/components/preview/PreviewToolbar";
import { type GuitarProject } from "@/lib/guitars";
import { IconBox, IconMaximize, IconMinimize } from "@tabler/icons-react";

export function GuitarPreviewPanel({ project }: { project: GuitarProject }) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "detail">("3d");

  function resetPreview() {
    setRotation(0);
    setZoom(1);
    setViewMode("3d");
  }

  const panelClass = isExpanded
    ? "fixed inset-3 z-50 min-h-[calc(100dvh-24px)]"
    : "relative min-h-[360px] md:h-[calc(100dvh-162px)] md:min-h-[520px]";

  return (
    <section
      className={`${panelClass} overflow-hidden rounded-xl border border-zinc-200 bg-[radial-gradient(circle_at_50%_28%,#ffffff,#f4f4f5_58%,#e9ebef)] p-4 shadow-[0_10px_36px_rgba(15,23,42,0.08)]`}
      aria-label={`${project.name} preview`}
    >
      <div className="relative z-10 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setViewMode(viewMode === "3d" ? "detail" : "3d")}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white/90 px-3 text-xs font-semibold text-zinc-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        >
          <IconBox aria-hidden="true" className="h-4 w-4" stroke={1.7} />
          <span className="hidden lg:inline">{viewMode === "3d" ? "3D View" : "Detail View"}</span>
        </button>
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white/90 px-3 text-xs font-semibold text-zinc-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        >
          {isExpanded ? (
            <IconMinimize aria-hidden="true" className="h-4 w-4" stroke={1.7} />
          ) : (
            <IconMaximize aria-hidden="true" className="h-4 w-4" stroke={1.7} />
          )}
          <span className="hidden lg:inline">{isExpanded ? "Exit" : "Fullscreen"}</span>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-20 top-12 grid place-items-center md:bottom-16 md:top-12">
        <div
          className="relative h-full w-full max-w-[320px] transition-transform duration-300 ease-out"
          style={{
            transform: `rotate(${rotation}deg) scale(${zoom})`,
          }}
        >
          <Image
            src="/assets/reference/guitar-clean-2.png"
            alt={`${project.config.bodyColor} ${project.config.bodyShape} guitar preview`}
            fill
            priority
            sizes="(min-width: 1280px) 340px, 280px"
            className={`object-contain drop-shadow-[0_28px_24px_rgba(15,23,42,0.18)] transition duration-300 ${
              viewMode === "detail" ? "contrast-110 saturate-110" : ""
            }`}
          />
        </div>
      </div>

      <PreviewToolbar
        onRotate={() => setRotation((value) => value + 8)}
        onZoom={() => setZoom((value) => (value >= 1.16 ? 1 : Number((value + 0.08).toFixed(2))))}
        onReset={resetPreview}
      />
    </section>
  );
}
