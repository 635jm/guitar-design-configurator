import { OptionGrid } from "@/components/configurator/OptionGrid";
import { optionLabels, type GuitarConfig } from "@/lib/guitars";
import { IconInfoCircle } from "@tabler/icons-react";

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
        options={options}
        onChange={onChange}
        viewMode={viewMode}
      />
    </section>
  );
}
