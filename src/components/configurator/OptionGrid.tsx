import { OptionCard } from "@/components/configurator/OptionCard";
import { type GuitarConfig } from "@/lib/guitars";

type OptionGridProps = {
  field: keyof GuitarConfig;
  value: string;
  options: readonly string[];
  onChange: (field: keyof GuitarConfig, value: string) => void;
  viewMode?: "grid" | "list";
};

export function OptionGrid({
  field,
  value,
  options,
  onChange,
  viewMode = "grid",
}: OptionGridProps) {
  return (
    <div
      className={
        viewMode === "list"
          ? "grid grid-cols-2 gap-1.5"
          : "grid grid-cols-2 gap-1.5 min-[420px]:grid-cols-3 sm:grid-cols-4"
      }
    >
      {options.map((option) => (
        <OptionCard
          key={option}
          field={field}
          option={option}
          selected={value === option}
          onSelect={() => {
            if (option !== "Show more") {
              onChange(field, option);
            }
          }}
        />
      ))}
    </div>
  );
}
