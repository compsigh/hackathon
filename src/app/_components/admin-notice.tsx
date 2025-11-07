import Link from "next/link";

export function AdminNotice() {
  return (
    <div className="mb-6 rounded-lg border-2 border-(--color-compsigh) p-4">
      <p className="text-sm text-(--color-light)">
        <strong className="text-(--color-compsigh)">Admin Access:</strong>{" "}
        You have admin privileges.{" "}
        <Link
          href="/admin"
          className="font-medium text-(--color-compsigh) hover:underline hover:decoration-(--color-compsigh)"
        >
          Access admin panel →
        </Link>
      </p>
    </div>
  );
}
