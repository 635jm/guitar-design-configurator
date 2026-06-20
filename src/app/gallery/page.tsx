import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import {
  IconArrowRight,
  IconBolt,
  IconGuitarPick,
  IconPalette,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";

const galleryItems = [
  {
    name: "Modern S Custom",
    spec: "Trans Black / Black 3-Ply / SSS",
    tone: "Balanced, glassy, studio-ready",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    name: "Vintage Tele",
    spec: "Ash / Nickel / Hardtail",
    tone: "Twangy, simple, bright",
    accent: "bg-amber-50 text-amber-800",
  },
  {
    name: "Jazz Offset",
    spec: "Tortoise / P90 / Bigsby",
    tone: "Warm, expressive, smooth",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "Modern Metal",
    spec: "Matte Black / HH / Floyd Rose",
    tone: "Tight, fast, high-output",
    accent: "bg-zinc-100 text-zinc-800",
  },
];

const filters = ["All", "S-style", "Vintage", "Offset", "High gain"];

export default function GalleryPage() {
  return (
    <AppShell>
      <section className="rounded-lg border border-zinc-200 bg-white px-4 py-4 shadow-[0_10px_32px_rgba(15,23,42,0.045)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Gallery
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
              Build references and starter looks
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Browse polished directions, then open the designer to customize a
              working project.
            </p>
          </div>
          <Link
            href="/projects/demo/configure"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)] transition hover:bg-blue-500"
          >
            Open designer
            <IconArrowRight aria-hidden="true" className="h-4 w-4" stroke={1.8} />
          </Link>
        </div>

        <div className="mt-4 grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-500">
            <IconSearch aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-400" stroke={1.8} />
            <input
              placeholder="Search gallery..."
              className="min-w-0 flex-1 bg-transparent text-xs text-zinc-700 outline-none placeholder:text-zinc-400"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`h-9 rounded-lg border px-3 text-xs font-semibold transition ${
                  index === 0
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="grid gap-3 md:grid-cols-2">
          {galleryItems.map((item, index) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.035)] transition hover:border-blue-200"
            >
              <div className="relative h-48 bg-[radial-gradient(circle_at_50%_28%,#ffffff,#f4f4f5_58%,#e9ebef)]">
                <Image
                  src="/assets/reference/guitar-clean-2.png"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`object-contain object-center p-4 drop-shadow-[0_18px_18px_rgba(15,23,42,0.14)] ${
                    index === 1 ? "hue-rotate-[18deg]" : index === 2 ? "sepia-[0.25]" : index === 3 ? "grayscale" : ""
                  }`}
                />
                <span className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-semibold ${item.accent}`}>
                  Template
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-950">{item.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{item.spec}</p>
                  </div>
                  <IconGuitarPick aria-hidden="true" className="h-5 w-5 shrink-0 text-zinc-400" stroke={1.8} />
                </div>
                <p className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
                  {item.tone}
                </p>
                <Link
                  href="/projects/demo/configure"
                  className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  Customize
                  <IconArrowRight aria-hidden="true" className="h-4 w-4" stroke={1.8} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <aside className="grid gap-4 self-start">
          <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.035)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-zinc-950">Gallery tools</h3>
              <IconSparkles aria-hidden="true" className="h-4 w-4 text-blue-600" stroke={1.8} />
            </div>
            <div className="mt-4 grid gap-2">
              {[
                [IconPalette, "Compare finishes", "See color and pickguard pairings."],
                [IconBolt, "Tone routes", "Group builds by output and feel."],
                [IconGuitarPick, "Starter specs", "Open a template in the designer."],
              ].map(([Icon, title, copy]) => {
                const ToolIcon = Icon as typeof IconPalette;

                return (
                  <div key={title as string} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                    <ToolIcon aria-hidden="true" className="h-4 w-4 text-zinc-500" stroke={1.8} />
                    <p className="mt-2 text-sm font-semibold text-zinc-950">{title as string}</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">{copy as string}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
