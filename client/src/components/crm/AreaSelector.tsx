type AreaSelectorProps = {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  options: string[];
};

export default function AreaSelector({
  label = "Area",
  value,
  onChange,
  options,
}: AreaSelectorProps) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b867f]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="rounded-xl border border-[#efe5d8] bg-white px-3 py-2 text-sm font-semibold text-[#2a2927]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
