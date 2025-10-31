import { ProtoMono } from "../fonts";

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
  hasChanges: boolean;
}

export function NameField({ value, onChange, hasChanges }: NameFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Name</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border ${
            hasChanges ? "border-red-500" : "border-[var(--color-light-30)]"
          } bg-[var(--color-dark)] px-4 py-2 pr-40 text-[var(--color-compsigh)] focus:border-[var(--color-compsigh)] focus:outline-none ${ProtoMono.className}`}
          placeholder="Enter your name"
        />
        {hasChanges && (
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-red-500 bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
            Unsaved changes
          </span>
        )}
      </div>
    </div>
  );
}

