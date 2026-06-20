 "use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  IconChevronDown,
  IconFolder,
  IconHelpCircle,
  IconLayoutDashboard,
  IconStar,
} from "@tabler/icons-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: IconLayoutDashboard },
  { label: "Projects", href: "/projects", icon: IconFolder },
  { label: "Templates", href: "#", icon: IconStar },
  { label: "Help", href: "#", icon: IconHelpCircle },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="flex min-h-[68px] shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-2 sm:px-5 xl:px-6">
      <Link href="/" className="flex min-w-0 items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center border-r border-zinc-200 pr-4 md:hidden">
          <Image src="/assets/reference/brand-mark.png" alt="" width={38} height={38} className="h-9 w-9 object-contain" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold tracking-tight text-zinc-950 sm:text-lg md:text-base xl:text-xl">
            Guitar Design Configurator
          </span>
          <span className="hidden text-xs text-zinc-500 sm:block md:hidden lg:block">
            Customize and manage your guitar build projects.
          </span>
        </span>
      </Link>

      <nav className="hidden min-w-0 items-center gap-3 text-sm font-medium text-zinc-500 lg:flex xl:gap-5">
        {navItems.map((item) => {
          const ItemIcon = item.icon;

          return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex min-w-0 items-center gap-2 transition hover:text-zinc-950 ${
              item.href === "/"
                ? pathname === "/"
                  ? "text-blue-700"
                  : ""
                : pathname.startsWith(item.href)
                  ? "text-blue-700"
                  : ""
            }`}
          >
            <ItemIcon aria-hidden="true" className="h-4 w-4" stroke={1.7} />
            <span className="hidden xl:inline">{item.label}</span>
          </Link>
          );
        })}
      </nav>

      <div className="hidden shrink-0 items-center gap-2 border-l border-zinc-200 pl-3 sm:flex">
        <Image src="/assets/reference/avatar.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover shadow-inner" />
        <IconChevronDown aria-hidden="true" className="h-4 w-4 text-zinc-400" stroke={1.8} />
      </div>
    </header>
  );
}
