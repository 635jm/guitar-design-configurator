"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GuitarPreview } from "@/components/GuitarPreview";
import { Shell } from "@/components/Shell";
import {
  buildImagePrompt,
  buildProjectJsonFileName,
  buildSummary,
  buildSummaryFileName,
  getProject,
  optionLabels,
  type GuitarConfig,
  type GuitarProject,
} from "@/lib/guitars";

const specGroups: Array<{
  title: string;
  fields: Array<keyof GuitarConfig>;
}> = [
  { title: "Body", fields: ["bodyShape", "bodyMaterial"] },
  { title: "Neck", fields: ["neckShape"] },
  { title: "Electronics", fields: ["pickups"] },
  { title: "Hardware", fields: ["bridgeType", "hardwareFinish"] },
  { title: "Finish", fields: ["bodyColor", "pickguard"] },
];

export default function ProjectSummaryPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<GuitarProject | undefined>();
  const [hasLoadedProject, setHasLoadedProject] = useState(false);
  const [copyState, setCopyState] = useState("");
  const [promptCopyState, setPromptCopyState] = useState("");

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      setProject(getProject(params.id));
      setHasLoadedProject(true);
    });

    return () => {
      active = false;
    };
  }, [params.id]);

  async function copyText(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      return successMessage;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();

      return copied
        ? successMessage
        : "Clipboard copy failed. Select the text below and copy it manually.";
    }
  }

  async function copySummary() {
    if (!project) {
      return;
    }

    setCopyState(await copyText(buildSummary(project), "Summary copied."));
  }

  async function copyPrompt() {
    if (!project) {
      return;
    }

    setPromptCopyState(
      await copyText(buildImagePrompt(project), "AI image prompt copied."),
    );
  }

  function downloadSummary() {
    if (!project) {
      return;
    }

    const blob = new Blob([buildSummary(project)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = buildSummaryFileName(project);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setCopyState("Summary downloaded.");
  }

  function downloadProjectJson() {
    if (!project) {
      return;
    }

    const blob = new Blob([JSON.stringify(project, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = buildProjectJsonFileName(project);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setCopyState("Project JSON downloaded.");
  }

  if (!hasLoadedProject) {
    return (
      <Shell>
        <section className="mx-auto max-w-2xl rounded-[28px] border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Loading project
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-950">
            Checking saved guitar summary...
          </h2>
        </section>
      </Shell>
    );
  }

  if (!project) {
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
            The project may have been deleted, or this browser may not have the
            localStorage data for this link.
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

  const summary = buildSummary(project);
  const prompt = buildImagePrompt(project);

  return (
    <Shell>
      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5">
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-600">
              Project
            </p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
                  {project.name}
                </h2>
                <p className="mt-2 text-zinc-600">{project.guitarType}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  Back to Dashboard
                </Link>
                <Link
                  href={`/projects/${project.id}/configure`}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  Back to Configurator
                </Link>
              </div>
            </div>
          </div>

          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-zinc-950">Build Specs</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Final sheet
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200">
              <table className="w-full border-collapse text-left text-sm">
                <tbody className="divide-y divide-zinc-200">
                  {specGroups.flatMap((group) =>
                    group.fields.map((field, index) => (
                      <tr
                        key={field}
                        className={
                          index === 0 ? "bg-zinc-50" : "bg-white"
                        }
                      >
                        <th className="px-4 py-3 font-medium text-zinc-500">
                          {index === 0 ? group.title : optionLabels[field]}
                        </th>
                        <td className="px-4 py-3 text-zinc-950">
                          <span className="font-semibold">
                            {project.config[field]}
                          </span>
                          {index === 0 && group.fields.length > 1 ? (
                            <span className="ml-2 text-zinc-500">
                              ({optionLabels[field]})
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <h3 className="text-lg font-semibold text-zinc-950">Notes</h3>
            <p className="mt-4 whitespace-pre-wrap rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
              {project.notes || "No builder notes added yet."}
            </p>
          </section>

          <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-zinc-950">Export</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copySummary}
                  className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Copy Summary
                </button>
                <button
                  type="button"
                  onClick={downloadSummary}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  Download TXT
                </button>
                <button
                  type="button"
                  onClick={downloadProjectJson}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  Export Project JSON
                </button>
              </div>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-6 text-zinc-700">
              {summary}
            </pre>
            {copyState ? (
              <p className="mt-4 text-sm font-medium text-emerald-600">
                {copyState}
              </p>
            ) : null}
          </section>

          <section className="rounded-[28px] border border-blue-200 bg-blue-50 p-5 shadow-[0_18px_60px_rgba(37,99,235,0.08)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-zinc-950">AI Image Prompt</h3>
              <button
                type="button"
                onClick={copyPrompt}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Copy Prompt
              </button>
            </div>
            <p className="mt-4 rounded-2xl border border-blue-100 bg-white p-4 text-sm leading-6 text-zinc-700 shadow-sm">
              {prompt}
            </p>
            {promptCopyState ? (
              <p className="mt-3 text-sm font-medium text-emerald-600">
                {promptCopyState}
              </p>
            ) : null}
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <GuitarPreview project={project} />
        </aside>
      </section>
    </Shell>
  );
}
