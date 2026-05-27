import {
  bodyColorSwatches,
  optionLabels,
  type GuitarConfig,
} from "@/lib/guitars";

type OptionGroupProps = {
  field: keyof GuitarConfig;
  value: string;
  options: readonly string[];
  onChange: (field: keyof GuitarConfig, value: string) => void;
};

export function OptionGroup({
  field,
  value,
  options,
  onChange,
}: OptionGroupProps) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-zinc-950">{optionLabels[field]}</h3>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          {value}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          const swatch = field === "bodyColor" ? bodyColorSwatches[option] : undefined;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(field, option)}
              className={`flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500/15"
                  : "border-zinc-200 bg-white text-zinc-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
              }`}
            >
              {swatch ? (
                <span
                  className="h-4 w-4 rounded-full border border-black/20"
                  style={{ background: swatch }}
                />
              ) : null}
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}
