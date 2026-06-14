import { formatProjectDateTime, type GuitarProject } from "@/lib/guitars";

type ConfiguratorHeaderProps = {
  draft: GuitarProject;
  savedProject?: GuitarProject;
  saveState: string;
  isDirty: boolean;
  onMetadataChange: (field: "name" | "guitarType" | "notes", value: string) => void;
};

export function ConfiguratorHeader({
  draft,
  savedProject,
  saveState,
  isDirty,
  onMetadataChange,
}: ConfiguratorHeaderProps) {
  const statusIsError =
    saveState.includes("required") ||
    saveState.includes("Could not") ||
    saveState.includes("no longer exists");

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-3 shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <label className="block">
            <span className="sr-only">Project name</span>
            <input
              value={draft.name}
              onChange={(event) => onMetadataChange("name", event.target.value)}
              className="w-full rounded-md border border-transparent bg-transparent px-1 py-1 text-xl font-semibold tracking-tight text-zinc-950 outline-none transition focus:border-blue-200 focus:bg-blue-50/40 sm:text-2xl"
            />
          </label>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>
              {savedProject
                ? `Last saved ${formatProjectDateTime(savedProject.updatedAt)}`
                : "Loaded from local browser storage"}
            </span>
            <span
              className={`font-semibold ${
                statusIsError ? "text-red-600" : isDirty ? "text-blue-600" : "text-emerald-600"
              }`}
            >
              {saveState === "Saved" ? "Saved" : saveState}
            </span>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[170px_1fr] xl:w-[430px]">
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-zinc-500">Type</span>
            <input
              value={draft.guitarType}
              onChange={(event) => onMetadataChange("guitarType", event.target.value)}
              className="h-9 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-800 outline-none focus:border-blue-300 focus:bg-white"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-zinc-500">Builder notes</span>
            <input
              value={draft.notes}
              onChange={(event) => onMetadataChange("notes", event.target.value)}
              placeholder="Target tone, preferences, constraints..."
              className="h-9 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-blue-300 focus:bg-white"
            />
          </label>
        </div>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_160px_96px]">
        <div className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-400">
          <svg
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m21 21-4.3-4.3" />
            <circle cx="11" cy="11" r="7" />
          </svg>
          <span className="truncate">Search components...</span>
        </div>
        <button
          type="button"
          className="flex h-10 items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 shadow-sm"
        >
          <span>Sort: Default</span>
          <svg
            aria-hidden="true"
            className="h-4 w-4 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div className="grid h-10 grid-cols-2 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <button type="button" className="grid place-items-center bg-blue-50 text-blue-700">
            <span className="sr-only">Grid view</span>
            <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2h5v5H2V2Zm7 0h5v5H9V2ZM2 9h5v5H2V9Zm7 0h5v5H9V9Z" />
            </svg>
          </button>
          <button type="button" className="grid place-items-center text-zinc-400">
            <span className="sr-only">List view</span>
            <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 3h12v2H2V3Zm0 4h12v2H2V7Zm0 4h12v2H2v-2Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
