import { IconRotateClockwise, IconRefresh, IconZoomIn } from "@tabler/icons-react";

type PreviewToolbarProps = {
  onRotate: () => void;
  onZoom: () => void;
  onReset: () => void;
};

export function PreviewToolbar({ onRotate, onZoom, onReset }: PreviewToolbarProps) {
  return (
    <div className="absolute inset-x-14 bottom-5 flex items-center justify-between rounded-lg border border-zinc-200 bg-white/90 px-4 py-2 text-xs font-medium text-zinc-500 shadow-sm backdrop-blur">
      <button type="button" onClick={onRotate} className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-zinc-100 hover:text-zinc-800">
        <IconRotateClockwise aria-hidden="true" className="h-4 w-4" stroke={1.7} />
        <span className="hidden lg:inline">Rotate</span>
      </button>
      <button type="button" onClick={onZoom} className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-zinc-100 hover:text-zinc-800">
        <IconZoomIn aria-hidden="true" className="h-4 w-4" stroke={1.7} />
        <span className="hidden lg:inline">Zoom</span>
      </button>
      <button type="button" onClick={onReset} className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-zinc-100 hover:text-zinc-800">
        <IconRefresh aria-hidden="true" className="h-4 w-4" stroke={1.7} />
        <span className="hidden lg:inline">Reset</span>
      </button>
    </div>
  );
}
