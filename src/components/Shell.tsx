import Link from "next/link";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_transparent_34%),linear-gradient(135deg,_#ffffff,_#f5f5f7_48%,_#eef2f7)] px-4 py-5 text-zinc-950 sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
        <header className="rounded-[28px] border border-zinc-200/80 bg-white/90 px-5 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur md:flex md:items-center md:justify-between">
          <Link href="/" className="group block">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              Guitar Design
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
              Configurator Studio
            </h1>
          </Link>
          <nav className="mt-4 flex flex-wrap gap-3 text-sm font-medium md:mt-0">
            <Link
              href="/"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-zinc-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Dashboard
            </Link>
            <Link
              href="/projects/new"
              className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              New Project
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </main>
  );
}
