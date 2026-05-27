"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import {
  buildProjectsExportFileName,
  deleteProject,
  duplicateProject,
  formatProjectDateTime,
  getAllProjects,
  type GuitarProject,
} from "@/lib/guitars";

export default function Home() {
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
    <Shell>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-600">
            Project Dashboard
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
            Build guitar concepts from body shape to final spec.
          </h2>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-600">
          <p>
            Create builder-ready design projects, compare hardware and finish
            choices, then generate a clean summary and AI image prompt.
          </p>
          <p className="mt-3 rounded-xl bg-zinc-50 p-3 text-sm text-zinc-600">
            Projects are saved in this browser. Clearing browser storage or
            switching devices/browsers may hide or remove projects.
          </p>
          <Link
            href="/projects/new"
            className="mt-5 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Add Project
          </Link>
        </div>
      </section>

      {projects.length > 0 ? (
        <section className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 lg:grid-cols-[1fr_220px_220px]">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Search projects
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, body shape, or pickups..."
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-500"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950"
            >
              <option value="updated-desc">Recently updated</option>
              <option value="created-desc">Recently created</option>
              <option value="name-asc">Name A-Z</option>
            </select>
          </label>
          <div className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Backup
            </span>
            <button
              type="button"
              onClick={exportAllProjects}
              disabled={!hasLoadedProjects || projects.length === 0}
              className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:border-blue-300 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-500"
            >
              Export All JSON
            </button>
            <p className="text-xs leading-5 text-zinc-500">
              Keep a copy before clearing browser storage.
            </p>
          </div>
        </section>
      ) : null}

      {!hasLoadedProjects ? (
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-2xl shadow-zinc-200/70">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Loading projects
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-950">
            Checking saved guitar designs...
          </h3>
        </section>
      ) : projects.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-blue-300/40 bg-zinc-50 p-8 text-center shadow-2xl shadow-zinc-200/70">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            No projects yet
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-950">
            Create your first guitar design.
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-600">
            Start with a name and instrument type, then use the configurator to
            choose the body, neck, electronics, hardware, finish, and pickguard.
            Projects are saved in this browser.
          </p>
          <Link
            href="/projects/new"
            className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Add New Project
          </Link>
        </section>
      ) : visibleProjects.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            No matching projects
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-950">
            Try a different search term.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-zinc-600">
            Your saved designs are still here. Clear the search to return to the
            full dashboard.
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-6 rounded-full border border-zinc-200 px-5 py-3 font-semibold text-zinc-950 transition hover:border-blue-300"
          >
            Clear Search
          </button>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="group flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.07)] transition hover:border-blue-300/60 hover:shadow-[0_24px_80px_rgba(37,99,235,0.12)]"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                      {project.guitarType}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
                      {project.name}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
                    {formatProjectDateTime(project.updatedAt)}
                  </span>
                </div>
                <p className="mt-4 line-clamp-2 text-sm text-zinc-600">
                  {project.notes || "No notes added yet."}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                    <dt className="text-zinc-500">Body</dt>
                    <dd className="mt-1 font-semibold text-zinc-950">
                      {project.config.bodyShape}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                    <dt className="text-zinc-500">Finish</dt>
                    <dd className="mt-1 font-semibold text-zinc-950">
                      {project.config.bodyColor}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                    <dt className="text-zinc-500">Pickups</dt>
                    <dd className="mt-1 font-semibold text-zinc-950">
                      {project.config.pickups}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                    <dt className="text-zinc-500">Bridge</dt>
                    <dd className="mt-1 font-semibold text-zinc-950">
                      {project.config.bridgeType}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 text-sm font-semibold">
                <Link
                  href={`/projects/${project.id}/configure`}
                  className="rounded-full bg-blue-600 px-4 py-2 text-center text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Configure
                </Link>
                <Link
                  href={`/projects/${project.id}/summary`}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-center text-zinc-700 transition hover:border-blue-300"
                >
                  Summary
                </Link>
                <button
                  type="button"
                  onClick={() => handleDuplicate(project.id)}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-zinc-700 transition hover:border-blue-300"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project)}
                  className="rounded-full border border-red-200 px-4 py-2 text-red-600 transition hover:border-red-300"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </Shell>
  );
}
