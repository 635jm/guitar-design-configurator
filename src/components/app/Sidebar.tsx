import Link from "next/link";

const navItems = [
  { label: "Designer", href: "#", icon: "M4 13.5 13.5 4l2.5 2.5L6.5 16H4v-2.5Z" },
  { label: "My Projects", href: "/", icon: "M3 6h6l2 2h10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" },
  { label: "Gallery", href: "#", icon: "M4 5h16v14H4V5Zm3 10 3-4 2 3 2-2 3 3" },
  { label: "Components", href: "#", icon: "M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 8L4 7m8 4 8-4m-8 4v10" },
  { label: "Settings", href: "#", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M3 12h3m12 0h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" },
];

function Icon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-[194px] shrink-0 border-r border-zinc-200 bg-white px-4 py-5 lg:flex lg:flex-col">
      <Link href="/" className="mb-5 flex items-center gap-3 rounded-xl px-1">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-white shadow-sm">
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
          <span className="block truncate text-sm font-semibold text-zinc-950">
            Guitar Design
          </span>
          <span className="block truncate text-xs text-zinc-500">
            Configurator
          </span>
        </span>
      </Link>

      <Link
        href="/projects/new"
        className="flex h-[86px] flex-col items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm font-semibold text-zinc-800 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-blue-200 hover:text-blue-700"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="mt-2">New Project</span>
      </Link>

      <nav className="mt-6 grid gap-2 text-sm font-medium text-zinc-600">
        {navItems.map((item) => {
          const active = item.label === "Designer";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              <Icon path={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
        <p className="font-semibold text-zinc-900">Saved Locally</p>
        <p className="mt-1">All projects are saved only in this browser.</p>
        <Link href="/" className="mt-3 inline-flex font-semibold text-blue-700">
          Learn more
        </Link>
      </div>
    </aside>
  );
}
