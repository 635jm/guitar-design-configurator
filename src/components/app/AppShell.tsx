import { Sidebar } from "@/components/app/Sidebar";
import { TopNav } from "@/components/app/TopNav";

type AppShellProps = {
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
};

export function AppShell({ children, bottomBar }: AppShellProps) {
  return (
    <main className="h-dvh min-h-screen overflow-hidden bg-[#f1f2f4] p-0 text-zinc-950 md:p-2 xl:p-3">
      <div className="mx-auto flex h-full w-full overflow-hidden bg-white shadow-[0_18px_70px_rgba(15,23,42,0.12)] md:max-w-[1500px] md:rounded-[12px] md:border md:border-zinc-200/80">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa]">
          <TopNav />
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-4 md:px-5 lg:px-6">
            {children}
          </div>
          {bottomBar ? (
            <div className="shrink-0 border-t border-zinc-200 bg-white/95 px-5 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.04)] backdrop-blur">
              {bottomBar}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
