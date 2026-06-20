 "use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  IconBox,
  IconCloud,
  IconEdit,
  IconExternalLink,
  IconFolder,
  IconPhoto,
  IconPlus,
  IconSettings,
} from "@tabler/icons-react";

const navItems = [
  { label: "Designer", href: "/projects/demo/configure", icon: IconEdit },
  { label: "My Projects", href: "/projects", icon: IconFolder },
  { label: "Gallery", href: "/gallery", icon: IconPhoto },
  { label: "Components", href: "#", icon: IconBox },
  { label: "Settings", href: "#", icon: IconSettings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[74px] shrink-0 border-r border-zinc-200 bg-white px-3 py-5 md:flex md:flex-col xl:w-[180px] xl:px-4">
      <Link href="/" className="mb-5 flex items-center justify-center gap-3 rounded-xl px-0 xl:justify-start xl:px-1">
        <span className="grid h-10 w-10 place-items-center">
          <Image src="/assets/reference/brand-mark.png" alt="" width={42} height={42} className="h-10 w-10 object-contain" />
        </span>
        <span className="hidden min-w-0 xl:block">
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
        className="flex h-12 flex-col items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm font-semibold text-zinc-800 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-blue-200 hover:text-blue-700 xl:h-[86px]"
        title="New Project"
      >
        <IconPlus aria-hidden="true" className="h-5 w-5" stroke={1.9} />
        <span className="mt-2 hidden xl:block">New Project</span>
      </Link>

      <nav className="mt-5 grid gap-2 text-sm font-medium text-zinc-600 xl:mt-6">
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const ItemIcon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-center gap-3 rounded-lg px-3 py-3 transition xl:justify-start ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-zinc-50 hover:text-zinc-950"
              }`}
              title={item.label}
            >
              <ItemIcon aria-hidden="true" className="h-5 w-5 xl:h-4 xl:w-4" stroke={1.8} />
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600 xl:block">
        <p className="flex items-center gap-2 font-semibold text-zinc-900">
          <IconCloud aria-hidden="true" className="h-4 w-4 text-zinc-500" stroke={1.7} />
          Saved Locally
        </p>
        <p className="mt-1">All projects are saved only in this browser.</p>
        <Link href="/" className="mt-3 inline-flex items-center gap-1 font-semibold text-blue-700">
          Learn more
          <IconExternalLink aria-hidden="true" className="h-3 w-3" stroke={1.8} />
        </Link>
      </div>
    </aside>
  );
}
