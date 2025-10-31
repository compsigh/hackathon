import { ProtoMono } from "../fonts";

interface EmailFieldProps {
  value: string;
}

export function EmailField({ value }: EmailFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Email</label>
      <input
        type="email"
        value={value}
        disabled
        className={`w-full cursor-not-allowed rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] px-4 py-2 text-[var(--color-light-50)] ${ProtoMono.className}`}
      />
    </div>
  );
}
