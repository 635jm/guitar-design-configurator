import { Sidebar } from "@/components/app/Sidebar";
import { TopNav } from "@/components/app/TopNav";

type AppShellProps = {
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
};

export function AppShell({ children, bottomBar }: AppShellProps) {
  return (
    <main className="h-dvh min-h-screen overflow-hidden bg-[#f4f5f7] p-0 text-zinc-950 sm:p-3">
      <div className="mx-auto flex h-full w-full overflow-hidden bg-white shadow-[0_18px_70px_rgba(15,23,42,0.10)] sm:max-w-[1540px] sm:rounded-[18px] sm:border sm:border-zinc-200/80">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa]">
          <TopNav />
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 sm:px-5 sm:py-4 xl:px-6">
            {children}
          </div>
          {bottomBar ? (
            <div className="shrink-0 border-t border-zinc-200 bg-white/95 px-3 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.04)] backdrop-blur sm:px-5 xl:px-6">
              {bottomBar}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
