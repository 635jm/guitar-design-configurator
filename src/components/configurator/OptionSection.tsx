import { OptionGrid } from "@/components/configurator/OptionGrid";
import { optionLabels, type GuitarConfig } from "@/lib/guitars";

type OptionSectionProps = {
  field: keyof GuitarConfig;
  value: string;
  options: readonly string[];
  onChange: (field: keyof GuitarConfig, value: string) => void;
};

export function OptionSection({ field, value, options, onChange }: OptionSectionProps) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-3 shadow-[0_8px_28px_rgba(15,23,42,0.045)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-950">{optionLabels[field]}</h3>
        <span className="grid h-4 w-4 place-items-center rounded-full border border-zinc-300 text-[10px] font-semibold text-zinc-500">
          i
        </span>
      </div>
      <OptionGrid field={field} value={value} options={options} onChange={onChange} />
    </section>
  );
}
