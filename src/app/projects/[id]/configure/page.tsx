"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { ConfiguratorHeader } from "@/components/configurator/ConfiguratorHeader";
import { OptionSection } from "@/components/configurator/OptionSection";
import { GuitarPreviewPanel } from "@/components/preview/GuitarPreviewPanel";
import {
  buildProjectJsonFileName,
  defaultConfig,
  formatProjectDateTime,
  getProject,
  guitarOptions,
  updateProject,
  type GuitarProject,
  type GuitarConfig,
} from "@/lib/guitars";
import { IconCode, IconDeviceFloppy, IconFileText } from "@tabler/icons-react";

const optionFields: Array<keyof GuitarConfig> = [
  "bodyShape",
  "neckShape",
  "bodyMaterial",
  "neckMaterial",
  "bodyColor",
  "pickguard",
  "pickups",
  "bridgeType",
  "hardwareFinish",
  "knobs",
];

function createDemoProject(): GuitarProject {
  const now = new Date().toISOString();

  return {
    id: "demo",
    name: "Modern S Custom",
    guitarType: "Electric Guitar",
    notes: "Medium thickness with modern playability.",
    createdAt: now,
    updatedAt: now,
    config: { ...defaultConfig },
  };
}

export default function ConfigureProjectPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<GuitarProject | undefined>(() =>
    params.id === "demo" ? createDemoProject() : undefined,
  );
  const [draft, setDraft] = useState<GuitarProject | undefined>(() =>
    params.id === "demo" ? createDemoProject() : undefined,
  );
  const [hasLoadedProject, setHasLoadedProject] = useState(params.id === "demo");
  const [saveState, setSaveState] = useState("Saved");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (params.id === "demo") {
      return;
    }

    let active = true;

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      const found = getProject(params.id) ?? (params.id === "demo" ? createDemoProject() : undefined);
      setProject(found);
      setDraft(found ? { ...found, config: { ...found.config } } : undefined);
      setHasLoadedProject(true);
    });

    return () => {
      active = false;
    };
  }, [params.id]);

  const isDirty = useMemo(() => {
    if (!project || !draft) {
      return false;
    }

    return JSON.stringify(project) !== JSON.stringify(draft);
  }, [project, draft]);

  const canSave = Boolean(draft && (isDirty || draft.id === "demo"));

  function updateConfig(field: keyof GuitarConfig, value: string) {
    if (!draft) {
      return;
    }

    setDraft({
      ...draft,
      config: {
        ...draft.config,
        [field]: value,
      },
    });
    setSaveState("Unsaved changes");
  }

  function updateMetadata(field: "name" | "guitarType" | "notes", value: string) {
    if (!draft) {
      return;
    }

    setDraft({
      ...draft,
      [field]: value,
    });
    setSaveState("Unsaved changes");
  }

  function handleSave() {
    if (!draft) {
      return;
    }

    if (!draft.name.trim()) {
      setSaveState("Project name is required.");
      return;
    }

    if (draft.id === "demo") {
      setProject({ ...draft, updatedAt: new Date().toISOString() });
      setSaveState("Saved locally for this prototype.");
      return;
    }

    const { project: saved, result } = updateProject({
      ...draft,
      name: draft.name.trim(),
      guitarType: draft.guitarType.trim() || "Electric Guitar",
      notes: draft.notes.trim(),
    });

    if (result.ok) {
      setProject(saved);
      setDraft(saved);
    }

    setSaveState(result.ok ? "Saved" : result.message);
  }

  function downloadProjectJson() {
    if (!draft) {
      return;
    }

    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = buildProjectJsonFileName(draft);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setSaveState("Project JSON exported.");
  }

  const optionSet = useMemo(() => {
    const query = search.trim().toLowerCase();

    return Object.fromEntries(
      optionFields.map((field) => {
        const selected = draft?.config[field];
        let options = [...guitarOptions[field]];

        if (query) {
          options = options.filter((option) =>
            `${field} ${option}`.toLowerCase().includes(query),
          );
        }

        if (sortBy === "selected" && selected) {
          options.sort((a, b) => Number(b === selected) - Number(a === selected));
        } else if (sortBy === "name") {
          options.sort((a, b) => a.localeCompare(b));
        }

        return [field, options];
      }),
    ) as Record<keyof GuitarConfig, string[]>;
  }, [draft, search, sortBy]);

  if (!hasLoadedProject) {
    return (
      <AppShell>
        <section className="mx-auto max-w-2xl rounded-[28px] border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Loading project
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-950">
            Checking saved guitar design...
          </h2>
        </section>
      </AppShell>
    );
  }

  if (!draft) {
    return (
      <AppShell>
        <section className="mx-auto max-w-2xl rounded-[28px] border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Missing project
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-950">
            Project not found
          </h2>
          <p className="mt-3 text-zinc-600">
            It may have been deleted, or this browser may not have the saved
            localStorage project data for this link.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Back to Dashboard
          </Link>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell
      bottomBar={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-zinc-500 sm:text-sm">
            {project ? `Last updated ${formatProjectDateTime(project.updatedAt)}` : "Local draft"}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <Link
              href={`/projects/${draft.id}/summary`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-3 text-center text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:min-w-32 sm:px-6"
            >
              <IconFileText aria-hidden="true" className="hidden h-4 w-4 sm:block" stroke={1.8} />
              Summary
            </Link>
            <button
              type="button"
              onClick={downloadProjectJson}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:min-w-36 sm:px-6"
            >
              <IconCode aria-hidden="true" className="hidden h-4 w-4 sm:block" stroke={1.8} />
              Export JSON
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 disabled:shadow-none sm:min-w-32 sm:px-7"
            >
              <IconDeviceFloppy aria-hidden="true" className="hidden h-4 w-4 sm:block" stroke={1.8} />
              Save
            </button>
          </div>
        </div>
      }
    >
      <section className="grid gap-4 md:grid-cols-[minmax(0,1fr)_330px] lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_470px]">
        <div className="grid min-w-0 gap-3">
          <ConfiguratorHeader
            draft={draft}
            savedProject={project}
            saveState={saveState}
            isDirty={isDirty}
            onMetadataChange={updateMetadata}
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <div className="grid gap-3 min-[1180px]:grid-cols-2">
            {optionFields.filter((field) => optionSet[field].length > 0).map((field) => (
              <OptionSection
                key={field}
                field={field}
                value={draft.config[field]}
                options={optionSet[field]}
                onChange={updateConfig}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>

        <aside className="min-w-0 md:sticky md:top-3 md:self-start">
          <GuitarPreviewPanel project={draft} />
        </aside>
      </section>
    </AppShell>
  );
}
