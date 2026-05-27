"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { createProject, guitarPresets } from "@/lib/guitars";

const presetNames = Object.keys(guitarPresets);
const presetDescriptions: Record<string, string> = {
  "Classic Strat": "Bright, familiar, and versatile with a clean vintage lean.",
  "Vintage Tele": "Simple, twangy, and workhorse-ready with classic bite.",
  "Modern Metal": "Dark, aggressive, and high-output for heavy riffing.",
  "Jazz Custom": "Warm, expressive, and offset-inspired with smooth character.",
};

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [guitarType, setGuitarType] = useState("Electric Guitar");
  const [notes, setNotes] = useState("");
  const [presetName, setPresetName] = useState("Classic Strat");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    const { project, result } = createProject({
      name,
      guitarType,
      notes,
      config: guitarPresets[presetName],
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push(`/projects/${project.id}/configure`);
  }

  return (
    <Shell>
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-600">
            New Project
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
            Name the build before choosing the parts.
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            Start with the instrument type and any workshop notes. The
            configurator will apply a starter preset that you can refine.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-800">
                Project name
              </span>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                placeholder="Offset baritone prototype"
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 shadow-sm placeholder:text-zinc-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-800">
                Guitar type
              </span>
              <input
                value={guitarType}
                onChange={(event) => setGuitarType(event.target.value)}
                placeholder="Electric Guitar"
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 shadow-sm placeholder:text-zinc-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-zinc-800">Notes</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={6}
                placeholder="Target tone, player preferences, scale ideas, reference guitars..."
                className="resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 shadow-sm placeholder:text-zinc-400"
              />
            </label>

            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-950">
                Choose a starter preset
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Templates set the first draft only. You can change every detail.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {presetNames.map((name) => {
                  const preset = guitarPresets[name];
                  const selected = presetName === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setPresetName(name);
                        setError("");
                      }}
                      className={`rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500/15"
                          : "border-zinc-200 bg-white text-zinc-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
                      }`}
                    >
                      <span className="block text-base font-semibold">{name}</span>
                      <span
                        className={`mt-2 block text-sm leading-5 ${
                          selected ? "text-blue-700" : "text-zinc-600"
                        }`}
                      >
                        {presetDescriptions[name]}
                      </span>
                      <span
                        className={`mt-2 block text-xs leading-5 ${
                          selected ? "text-blue-700" : "text-zinc-500"
                        }`}
                      >
                        {preset.bodyShape} / {preset.bodyColor} /{" "}
                        {preset.pickups}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Create Project
              </button>
              <Link
                href="/"
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-center font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Cancel / Back to Dashboard
              </Link>
            </div>
          </div>
        </form>
      </section>
    </Shell>
  );
}
