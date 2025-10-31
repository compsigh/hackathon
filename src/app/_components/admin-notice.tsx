import Link from "next/link";

export function AdminNotice() {
  return (
    <div className="mb-6 rounded-lg border-2 border-[var(--color-compsigh)] p-4">
      <p className="text-sm text-[var(--color-light)]">
        <strong className="text-[var(--color-compsigh)]">Admin Access:</strong>{" "}
        You have admin privileges.{" "}
        <Link
          href="/admin"
          className="font-medium text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
        >
          Access admin panel →
        </Link>
      </p>
    </div>
  );
}
