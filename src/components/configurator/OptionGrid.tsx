import { OptionCard } from "@/components/configurator/OptionCard";
import { type GuitarConfig } from "@/lib/guitars";

type OptionGridProps = {
  field: keyof GuitarConfig;
  value: string;
  options: readonly string[];
  onChange: (field: keyof GuitarConfig, value: string) => void;
};

export function OptionGrid({ field, value, options, onChange }: OptionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 min-[390px]:grid-cols-3 sm:grid-cols-4 xl:grid-cols-5">
      {options.map((option) => (
        <OptionCard
          key={option}
          field={field}
          option={option}
          selected={value === option}
          onSelect={() => onChange(field, option)}
        />
      ))}
    </div>
  );
}
