"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import {
  buildProjectsExportFileName,
  deleteProject,
  duplicateProject,
  formatProjectDateTime,
  getAllProjects,
  type GuitarProject,
} from "@/lib/guitars";
import {
  IconCode,
  IconCopy,
  IconFolder,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<GuitarProject[]>([]);
  const [hasLoadedProjects, setHasLoadedProjects] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("updated-desc");

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      setProjects(getAllProjects());
      setHasLoadedProjects(true);
    });

    return () => {
      active = false;
    };
  }, []);

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = query
      ? projects.filter((project) =>
          [
            project.name,
            project.guitarType,
            project.notes,
            project.config.bodyShape,
            project.config.bodyColor,
            project.config.pickups,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
      : projects;

    return [...filtered].sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "created-desc") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [projects, search, sortBy]);

  function handleDuplicate(id: string) {
    duplicateProject(id);
    setProjects(getAllProjects());
  }

  function handleDelete(project: GuitarProject) {
    const confirmed = window.confirm(`Delete "${project.name}"?`);

    if (!confirmed) {
      return;
    }

    deleteProject(project.id);
    setProjects(getAllProjects());
  }

  function exportAllProjects() {
    const blob = new Blob([JSON.stringify(projects, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = buildProjectsExportFileName();
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell>
      <section className="rounded-lg border border-zinc-200 bg-white px-4 py-4 shadow-[0_10px_32px_rgba(15,23,42,0.045)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              My projects
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
              Saved guitar builds
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Search, duplicate, export, or reopen local browser projects.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/projects/new"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)] transition hover:bg-blue-500"
            >
              New Project
            </Link>
            <button
              type="button"
              onClick={exportAllProjects}
              disabled={!hasLoadedProjects || projects.length === 0}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-zinc-400"
            >
              <IconCode aria-hidden="true" className="h-4 w-4" stroke={1.8} />
              Export JSON
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_180px]">
          <label className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-500">
            <IconSearch aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-400" stroke={1.8} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
              className="min-w-0 flex-1 bg-transparent text-xs text-zinc-700 outline-none placeholder:text-zinc-400"
            />
          </label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 shadow-sm outline-none transition focus:border-blue-300"
          >
            <option value="updated-desc">Recently updated</option>
            <option value="created-desc">Recently created</option>
            <option value="name-asc">Name A-Z</option>
          </select>
        </div>
      </section>

      <section className="mt-4">
        {!hasLoadedProjects ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-[0_10px_32px_rgba(15,23,42,0.045)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Loading projects
            </p>
            <h3 className="mt-3 text-xl font-semibold text-zinc-950">
              Checking saved guitar designs...
            </h3>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-lg border border-dashed border-blue-300/50 bg-white p-8 text-center shadow-[0_10px_32px_rgba(15,23,42,0.045)]">
            <IconFolder aria-hidden="true" className="mx-auto h-8 w-8 text-blue-600" stroke={1.7} />
            <h3 className="mt-3 text-xl font-semibold text-zinc-950">
              No projects yet
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-600">
              Create your first project, or open the demo designer to explore
              the full configurator surface.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/projects/new"
                className="inline-flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)] transition hover:bg-blue-500"
              >
                Add New Project
              </Link>
              <Link
                href="/projects/demo/configure"
                className="inline-flex h-10 items-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Open Demo
              </Link>
            </div>
          </div>
        ) : visibleProjects.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-200 bg-white p-8 text-center">
            <h3 className="text-xl font-semibold text-zinc-950">
              No matching projects
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Clear the search to return to the full project list.
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                className="flex min-h-72 flex-col justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.035)] transition hover:border-blue-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                        {project.guitarType}
                      </p>
                      <h3 className="mt-2 truncate text-xl font-semibold tracking-tight text-zinc-950">
                        {project.name}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] text-zinc-500">
                      {formatProjectDateTime(project.updatedAt)}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                    {project.notes || "No notes added yet."}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {[
                      ["Body", project.config.bodyShape],
                      ["Finish", project.config.bodyColor],
                      ["Pickups", project.config.pickups],
                      ["Bridge", project.config.bridgeType],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                        <dt className="text-xs text-zinc-500">{label}</dt>
                        <dd className="mt-1 truncate font-semibold text-zinc-950">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-semibold">
                  <Link
                    href={`/projects/${project.id}/configure`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-center text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:bg-blue-500"
                  >
                    Configure
                  </Link>
                  <Link
                    href={`/projects/${project.id}/summary`}
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-center text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Summary
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(project.id)}
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                  >
                    <IconCopy aria-hidden="true" className="h-4 w-4" stroke={1.8} />
                    Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-red-600 shadow-sm transition hover:border-red-300"
                  >
                    <IconTrash aria-hidden="true" className="h-4 w-4" stroke={1.8} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
