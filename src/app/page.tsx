import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { GuitarLayerStack } from "@/components/preview/GuitarLayerStack";
import { defaultConfig } from "@/lib/guitars";
import {
  IconArrowRight,
  IconBox,
  IconDeviceFloppy,
  IconFolder,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";

const workflow = [
  { label: "Choose body", value: "Stratocaster", icon: IconBox },
  { label: "Set finish", value: "Trans Black", icon: IconSettings },
  { label: "Save spec", value: "Local JSON", icon: IconDeviceFloppy },
];

const recentPresets = [
  ["Modern S Custom", "Alder / Maple / SSS"],
  ["Vintage Tele", "Ash / Roasted Maple / Black 3-Ply"],
  ["Blue Tele Custom", "Basswood / P90 / Tortoise"],
];

export default function Home() {
  return (
    <AppShell>
      <div className="grid w-full min-w-0 max-w-[calc(100vw-24px)] gap-4 sm:max-w-full xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="w-full min-w-0 max-w-[calc(100vw-24px)] overflow-hidden rounded-lg border border-zinc-200 bg-white p-5 shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:max-w-full">
          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Design studio
              </p>
              <h2 className="mt-2 max-w-full text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl md:text-4xl">
                Build polished guitar concepts from body shape to final spec.
              </h2>
              <p className="mt-3 max-w-full text-sm leading-6 text-zinc-600">
                Configure parts, compare material choices, and export a
                builder-ready project package from the same compact workspace.
              </p>
            </div>
            <div className="grid min-w-0 gap-2">
              <Link
                href="/projects/demo/configure"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)] transition hover:bg-blue-500"
              >
                Open designer
                <IconArrowRight aria-hidden="true" className="h-4 w-4" stroke={1.8} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                View projects
              </Link>
            </div>
          </div>
        </section>

        <aside className="w-full min-w-0 max-w-[calc(100vw-24px)] overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:max-w-full">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-zinc-950">Studio status</h3>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Ready
            </span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {workflow.map((item) => {
              const ItemIcon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 p-3"
                >
                  <ItemIcon aria-hidden="true" className="h-4 w-4 text-zinc-500" stroke={1.8} />
                  <p className="mt-2 text-[11px] font-medium text-zinc-500">{item.label}</p>
                  <p className="mt-1 truncate text-xs font-semibold text-zinc-950">{item.value}</p>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      <div className="mt-4 grid w-full min-w-0 max-w-[calc(100vw-24px)] gap-4 sm:max-w-full xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="grid min-w-0 gap-4 lg:grid-cols-2">
          <div className="w-full min-w-0 max-w-[calc(100vw-24px)] overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.035)] sm:max-w-full">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-zinc-950">Start points</h3>
              <Link href="/gallery" className="text-xs font-semibold text-blue-700">
                Browse gallery
              </Link>
            </div>
            <div className="mt-4 grid gap-2">
              {recentPresets.map(([name, spec]) => (
                <Link
                  key={name}
                  href="/projects/demo/configure"
                  className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm transition hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <span>
                    <span className="block font-semibold text-zinc-950">{name}</span>
                    <span className="block text-xs text-zinc-500">{spec}</span>
                  </span>
                  <IconArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-400" stroke={1.8} />
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full min-w-0 max-w-[calc(100vw-24px)] overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.035)] sm:max-w-full">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-zinc-950">Workspace</h3>
              <IconFolder aria-hidden="true" className="h-4 w-4 text-zinc-400" stroke={1.8} />
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {[
                ["Projects", "Local"],
                ["Exports", "JSON + summary"],
                ["Preview", "Interactive"],
                ["Assets", "Reference based"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                  <dt className="text-xs text-zinc-500">{label}</dt>
                  <dd className="mt-1 font-semibold text-zinc-950">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="relative min-h-[480px] overflow-hidden rounded-lg border border-zinc-200 bg-[radial-gradient(circle_at_50%_28%,#ffffff,#f4f4f5_58%,#e9ebef)] p-4 shadow-[0_10px_36px_rgba(15,23,42,0.08)]">
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white/90 px-3 text-xs font-semibold text-zinc-600 shadow-sm">
              <IconPhoto aria-hidden="true" className="h-4 w-4" stroke={1.7} />
              Featured build
            </span>
            <Link
              href="/projects/demo/configure"
              className="inline-flex h-9 items-center rounded-lg border border-zinc-200 bg-white/90 px-3 text-xs font-semibold text-zinc-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Configure
            </Link>
          </div>
          <div className="absolute inset-x-10 bottom-10 top-16">
            <GuitarLayerStack
              config={defaultConfig}
              alt="Modern black S-style guitar"
              priority
              className="scale-[1.05] transform-gpu"
              imageClassName="drop-shadow-[0_28px_24px_rgba(15,23,42,0.18)]"
            />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
