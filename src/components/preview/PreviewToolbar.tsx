export function PreviewToolbar() {
  return (
    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-zinc-200 bg-white/90 px-4 py-2 text-xs font-medium text-zinc-500 shadow-sm backdrop-blur">
      <button type="button" className="rounded-md px-2 py-1 transition hover:bg-zinc-100">
        <span aria-hidden="true">-</span>
      </button>
      <button type="button" className="rounded-md px-2 py-1 transition hover:bg-zinc-100">
        Zoom
      </button>
      <button type="button" className="rounded-md px-2 py-1 transition hover:bg-zinc-100">
        Reset
      </button>
    </div>
  );
}
