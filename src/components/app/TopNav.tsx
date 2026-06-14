import Link from "next/link";

const navItems = ["Dashboard", "Projects", "Templates", "Help"];

export function TopNav() {
  return (
    <header className="flex min-h-[68px] shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-white px-3 py-3 sm:h-[76px] sm:px-5 xl:px-6">
      <Link href="/" className="flex min-w-0 items-center gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-white shadow-sm lg:hidden">
          <svg
            aria-hidden="true"
            className="h-6 w-6 text-zinc-950"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
            viewBox="0 0 24 24"
          >
            <path d="M12 3 5 5.8v5.6c0 4.4 2.9 7.5 7 9.6 4.1-2.1 7-5.2 7-9.6V5.8L12 3Z" />
            <path d="M9 8h6l-3 3 3 3H9" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold tracking-tight text-zinc-950 sm:text-lg">
            Guitar Design Configurator
          </span>
          <span className="hidden text-xs text-zinc-500 sm:block">
            Customize and manage your guitar build projects.
          </span>
        </span>
      </Link>

      <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-500 md:flex xl:gap-6">
        {navItems.map((item) => (
          <Link
            key={item}
            href={item === "Dashboard" || item === "Projects" ? "/" : "#"}
            className="transition hover:text-zinc-950"
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        <span className="h-9 w-9 rounded-full bg-[linear-gradient(135deg,#f4d7bd,#7b4b34)] shadow-inner" />
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
      </div>
    </header>
  );
}
