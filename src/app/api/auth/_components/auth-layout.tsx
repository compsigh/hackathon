"use client";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-dark)]">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
