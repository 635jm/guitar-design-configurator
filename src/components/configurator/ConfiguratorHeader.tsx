import { formatProjectDateTime, type GuitarProject } from "@/lib/guitars";
import {
  IconChevronDown,
  IconLayoutGrid,
  IconList,
  IconPencil,
  IconSearch,
} from "@tabler/icons-react";

type ConfiguratorHeaderProps = {
  draft: GuitarProject;
  savedProject?: GuitarProject;
  saveState: string;
  isDirty: boolean;
  onMetadataChange: (field: "name" | "guitarType" | "notes", value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (value: "grid" | "list") => void;
};

export function ConfiguratorHeader({
  draft,
  savedProject,
  saveState,
  isDirty,
  onMetadataChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ConfiguratorHeaderProps) {
  const statusIsError =
    saveState.includes("required") ||
    saveState.includes("Could not") ||
    saveState.includes("no longer exists");

  return (
    <section className="rounded-lg border border-zinc-200 bg-white px-4 py-4 shadow-[0_10px_32px_rgba(15,23,42,0.045)]">
      <div className="flex flex-col gap-3 min-[1180px]:flex-row min-[1180px]:items-start min-[1180px]:justify-between">
        <div className="min-w-0 flex-1">
          <label className="block">
            <span className="sr-only">Project name</span>
            <span className="flex min-w-0 items-center gap-2">
              <input
                value={draft.name}
                onChange={(event) => onMetadataChange("name", event.target.value)}
                className="min-w-0 rounded-md border border-transparent bg-transparent px-0 py-0.5 text-xl font-semibold tracking-tight text-zinc-950 outline-none transition focus:border-blue-200 focus:bg-blue-50/40"
              />
              <IconPencil aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-500" stroke={1.8} />
            </span>
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
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_148px_78px]">
        <label className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-500">
          <IconSearch aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-400" stroke={1.8} />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search components..."
            className="min-w-0 flex-1 bg-transparent text-xs text-zinc-700 outline-none placeholder:text-zinc-400"
          />
        </label>
        <label className="relative block">
          <span className="sr-only">Sort components</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="h-9 w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 pr-8 text-xs font-medium text-zinc-600 shadow-sm outline-none transition focus:border-blue-300"
          >
            <option value="default">Sort: Default</option>
            <option value="selected">Selected first</option>
            <option value="name">Name A-Z</option>
          </select>
          <IconChevronDown aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" stroke={1.8} />
        </label>
        <div className="grid h-9 grid-cols-2 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`grid place-items-center transition ${
              viewMode === "grid" ? "bg-blue-50 text-blue-700" : "text-zinc-400 hover:text-zinc-700"
            }`}
          >
            <span className="sr-only">Grid view</span>
            <IconLayoutGrid aria-hidden="true" className="h-4 w-4" stroke={1.9} />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`grid place-items-center transition ${
              viewMode === "list" ? "bg-blue-50 text-blue-700" : "text-zinc-400 hover:text-zinc-700"
            }`}
          >
            <span className="sr-only">List view</span>
            <IconList aria-hidden="true" className="h-4 w-4" stroke={1.9} />
          </button>
        </div>
      </div>
    </section>
  );
}
