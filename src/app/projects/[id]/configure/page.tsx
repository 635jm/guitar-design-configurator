"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GuitarPreview } from "@/components/GuitarPreview";
import { OptionGroup } from "@/components/OptionGroup";
import { Shell } from "@/components/Shell";
import {
  formatProjectDateTime,
  getProject,
  guitarPresets,
  guitarOptions,
  updateProject,
  type GuitarProject,
  type GuitarConfig,
} from "@/lib/guitars";

const presetNames = Object.keys(guitarPresets);
const presetDescriptions: Record<string, string> = {
  "Classic Strat": "Balanced vintage clarity",
  "Vintage Tele": "Twangy workhorse bite",
  "Modern Metal": "Dark high-output power",
  "Jazz Custom": "Warm offset character",
};

const optionSections: Array<{
  title: string;
  description: string;
  fields: Array<keyof GuitarConfig>;
}> = [
  {
    title: "Body",
    description: "Choose the main silhouette and construction material.",
    fields: ["bodyShape", "bodyMaterial"],
  },
  {
    title: "Neck",
    description: "Set the feel of the playing surface.",
    fields: ["neckShape"],
  },
  {
    title: "Electronics",
    description: "Pick the pickup layout that drives the voice.",
    fields: ["pickups"],
  },
  {
    title: "Hardware",
    description: "Match the bridge and metal finish to the build.",
    fields: ["bridgeType", "hardwareFinish"],
  },
  {
    title: "Finish",
    description: "Select the visible body color or finish treatment.",
    fields: ["bodyColor"],
  },
  {
    title: "Pickguard",
    description: "Add contrast, texture, or keep the body uncovered.",
    fields: ["pickguard"],
  },
];

export default function ConfigureProjectPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<GuitarProject | undefined>();
  const [draft, setDraft] = useState<GuitarProject | undefined>();
  const [hasLoadedProject, setHasLoadedProject] = useState(false);
  const [saveState, setSaveState] = useState("Saved");

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      const found = getProject(params.id);
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

  function applyPreset(presetName: string) {
    if (!draft) {
      return;
    }

    setDraft({
      ...draft,
      config: { ...guitarPresets[presetName] },
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

  if (!hasLoadedProject) {
    return (
      <Shell>
        <section className="mx-auto max-w-2xl rounded-[28px] border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Loading project
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-950">
            Checking saved guitar design...
          </h2>
        </section>
      </Shell>
    );
  }

  if (!draft) {
    return (
      <Shell>
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
      </Shell>
    );
  }

  return (
    <Shell>
      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5">
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-600">
                  Configurator
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
                  {draft.name}
                </h2>
                <p className="mt-2 text-zinc-600">{draft.guitarType}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  Back to Dashboard
                </Link>
                <Link
                  href={`/projects/${draft.id}/summary`}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  View Summary
                </Link>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!isDirty}
                  className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 disabled:shadow-none"
                >
                  Save
                </button>
              </div>
            </div>
            <p
              className={`mt-4 text-sm font-medium ${
                saveState.includes("required") ||
                saveState.includes("Could not") ||
                saveState.includes("no longer exists")
                  ? "text-red-600"
                  : isDirty
                    ? "text-blue-600"
                    : "text-emerald-600"
              }`}
            >
              {saveState === "Saved"
                ? "Saved. Your latest changes are stored in this browser."
                : saveState}
            </p>
            {project ? (
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                Last updated {formatProjectDateTime(project.updatedAt)}
              </p>
            ) : null}
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-zinc-800">
                  Project name
                </span>
                <input
                  value={draft.name}
                  onChange={(event) => updateMetadata("name", event.target.value)}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 shadow-sm placeholder:text-zinc-400"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-zinc-800">
                  Guitar type
                </span>
                <input
                  value={draft.guitarType}
                  onChange={(event) =>
                    updateMetadata("guitarType", event.target.value)
                  }
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 shadow-sm placeholder:text-zinc-400"
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-semibold text-zinc-800">
                  Builder notes
                </span>
                <textarea
                  value={draft.notes}
                  onChange={(event) => updateMetadata("notes", event.target.value)}
                  rows={4}
                  placeholder="Target tone, player preferences, references, constraints..."
                  className="resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 shadow-sm placeholder:text-zinc-400"
                />
              </label>
            </div>
          </div>

          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                Apply preset
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Replace the current draft with a starter direction, then save
                when it feels right.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {presetNames.map((presetName) => {
                const preset = guitarPresets[presetName];
                const selected =
                  draft.config.bodyShape === preset.bodyShape &&
                  draft.config.bodyColor === preset.bodyColor &&
                  draft.config.pickups === preset.pickups &&
                  draft.config.bridgeType === preset.bridgeType &&
                  draft.config.hardwareFinish === preset.hardwareFinish &&
                  draft.config.bodyMaterial === preset.bodyMaterial &&
                  draft.config.neckShape === preset.neckShape &&
                  draft.config.pickguard === preset.pickguard;

                return (
                  <button
                    key={presetName}
                    type="button"
                    onClick={() => applyPreset(presetName)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500/15"
                        : "border-zinc-200 bg-white text-zinc-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
                    }`}
                  >
                    <span className="block text-sm font-semibold">
                      {presetName}
                    </span>
                    <span
                      className={`mt-2 block text-xs leading-5 ${
                        selected ? "text-blue-700" : "text-zinc-600"
                      }`}
                    >
                      {presetDescriptions[presetName]}
                    </span>
                    <span
                      className={`mt-2 block text-xs leading-5 ${
                        selected ? "text-blue-700" : "text-zinc-500"
                      }`}
                    >
                      {preset.bodyShape} / {preset.bodyColor} / {preset.pickups}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {optionSections.map((section) => (
            <section
              key={section.title}
              className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
            >
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                  {section.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {section.description}
                </p>
              </div>
              <div className="grid gap-4">
                {section.fields.map((field) => (
                  <OptionGroup
                    key={field}
                    field={field}
                    value={draft.config[field]}
                    options={guitarOptions[field]}
                    onChange={updateConfig}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <GuitarPreview project={draft} />
        </aside>
      </section>
    </Shell>
  );
}
