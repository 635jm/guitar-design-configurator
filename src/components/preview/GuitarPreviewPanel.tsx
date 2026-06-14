import { PreviewToolbar } from "@/components/preview/PreviewToolbar";
import { GuitarPreview } from "@/components/GuitarPreview";
import { bodyColorSwatches, type GuitarProject } from "@/lib/guitars";

export function GuitarPreviewPanel({ project }: { project: GuitarProject }) {
  const { config } = project;
  const finish = bodyColorSwatches[config.bodyColor] ?? "#e5e7eb";

  return (
    <section className="relative overflow-hidden rounded-xl border border-zinc-200 bg-[radial-gradient(circle_at_50%_28%,#ffffff,#f4f4f5_54%,#eceef2)] p-3 shadow-[0_10px_36px_rgba(15,23,42,0.08)] sm:p-4 xl:min-h-[calc(100vh-180px)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <span className="h-8 w-20 rounded-md bg-white/80 shadow-sm" />
          <span className="h-8 w-9 rounded-md bg-white/65 shadow-sm" />
        </div>
        <button
          type="button"
          className="rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-xs font-semibold text-zinc-600 shadow-sm"
        >
          Fullscreen
        </button>
      </div>

      <div className="hidden md:block">
        <GuitarPreview project={project} />
      </div>

      <div className="relative h-[280px] overflow-hidden rounded-xl border border-zinc-200 bg-[radial-gradient(circle_at_50%_28%,#ffffff,#f4f4f5_54%,#eceef2)] md:hidden">
        <div className="absolute inset-x-[11%] top-[12%] bottom-[16%] grid place-items-center">
          <div className="relative h-full w-full max-w-[260px]">
            <div className="absolute left-[47%] top-[4%] h-[63%] w-[11%] rounded-full bg-[linear-gradient(90deg,#c58d4c,#f1ca8d,#b77b3d)] shadow-[18px_14px_35px_rgba(120,80,35,0.18)]" />
            <div className="absolute left-[40%] top-[1%] h-[16%] w-[20%] rounded-[56%_32%_42%_40%] bg-[linear-gradient(145deg,#d8a35f,#8f5a2c)] shadow-lg" />
            <div
              className="absolute bottom-[8%] left-[22%] h-[45%] w-[52%] rounded-[48%_34%_44%_46%/50%_38%_56%_44%] border border-black/10 shadow-[0_24px_52px_rgba(24,24,27,0.18),inset_10px_8px_20px_rgba(255,255,255,0.25),inset_-12px_-18px_24px_rgba(0,0,0,0.12)]"
              style={{ background: finish }}
            />
            <div className="absolute bottom-[21%] left-[36%] h-[20%] w-[26%] rounded-[58%_42%_44%_56%/48%_58%_42%_52%] border border-black/10 bg-white/82 shadow-md" />
            <div className="absolute bottom-[7%] left-[29%] h-[8%] w-[38%] rounded-full bg-zinc-900/10 blur-xl" />
            <div className="absolute bottom-[26%] left-[44%] flex gap-1">
              {config.pickups.split("").map((pickup, index) => (
                <span
                  key={`${pickup}-${index}`}
                  className={`rounded-sm bg-zinc-900 shadow-sm ${
                    pickup === "H" ? "h-9 w-5" : "h-9 w-2"
                  }`}
                />
              ))}
            </div>
            <div className="absolute bottom-[23%] left-[57%] h-6 w-12 rounded-md bg-[linear-gradient(135deg,#fff,#b8c0c8)] shadow-md" />
            {[23, 27, 31, 35, 39].map((bottom) => (
              <span
                key={bottom}
                className="absolute left-[28%] h-px w-[46%] bg-white/90 shadow-sm"
                style={{ bottom: `${bottom}%` }}
              />
            ))}
          </div>
        </div>
        <PreviewToolbar />
      </div>

      <div className="mt-3 hidden grid-cols-2 gap-2 text-xs lg:grid">
        {[
          ["Body", config.bodyShape],
          ["Finish", config.bodyColor],
          ["Pickups", config.pickups],
          ["Bridge", config.bridgeType],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-zinc-200 bg-white/80 p-2 shadow-sm backdrop-blur">
            <p className="font-semibold text-zinc-500">{label}</p>
            <p className="mt-1 truncate font-semibold text-zinc-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <PreviewToolbar />
      </div>
    </section>
  );
}
