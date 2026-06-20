import { OptionGrid } from "@/components/configurator/OptionGrid";
import { optionLabels, type GuitarConfig } from "@/lib/guitars";
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react";

type OptionSectionProps = {
  field: keyof GuitarConfig;
  value: string;
  options: readonly string[];
  onChange: (field: keyof GuitarConfig, value: string) => void;
  viewMode?: "grid" | "list";
};

export function OptionSection({
  field,
  value,
  options,
  onChange,
  viewMode = "grid",
}: OptionSectionProps) {
  const visibleOptions =
    options.length > 4 && !options.includes("Show more")
      ? [...options.slice(0, 4), "Show more"]
      : options.slice(0, 5);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.035)]">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-zinc-950">
          {optionLabels[field]}
          <IconInfoCircle aria-hidden="true" className="h-3.5 w-3.5 text-zinc-400" stroke={1.8} />
        </h3>
        <span className="sr-only">
          {value}
        </span>
      </div>
      <OptionGrid
        field={field}
        value={value}
        options={visibleOptions}
        onChange={onChange}
        viewMode={viewMode}
      />
      {options.length > 4 ? (
        <button
          type="button"
          className="mx-auto mt-2 flex items-center gap-1 text-xs font-medium text-zinc-500 transition hover:text-blue-700"
        >
          Show more
          <IconChevronDown aria-hidden="true" className="h-3.5 w-3.5" stroke={1.8} />
        </button>
      ) : null}
    </section>
  );
}
