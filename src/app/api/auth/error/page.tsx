"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { AuthLayout } from "../_components/auth-layout";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSignIn = () => {
    void signIn("google", {
      callbackUrl: "/participant",
    });
  };

  return (
    <AuthLayout>
      {/* Title */}
      <h1 className="mb-6 text-center text-4xl font-bold text-[var(--color-light)]">
        Access Denied
      </h1>

      {/* Error Message */}
      <div className="mb-8 rounded-lg border-2 border-red-500 bg-red-500/10 p-6">
        <p className="text-center text-lg text-red-400">
          Please sign in with your USFCA email address (usfca.edu)
        </p>
      </div>

      {/* Instructions */}
      <div className="mb-8 text-left">
        <p className="mb-4 text-lg text-[var(--color-light)]">
          Only University of San Francisco (usfca.edu) email addresses are
          allowed to register for DEPLOY/25.
        </p>
      </div>

      {/* Sign In Button */}
      <button
        onClick={handleSignIn}
        className="w-full cursor-pointer rounded-xl border-2 border-[var(--color-compsigh)] bg-[var(--color-dark)] px-8 py-4 text-xl font-bold text-[var(--color-light)] transition-colors [text-shadow:0_0_10px_var(--color-compsigh-60)] hover:bg-[var(--color-compsigh)] hover:text-[var(--color-dark)]"
      >
        Try Again with USFCA Email
      </button>
    </AuthLayout>
  );
}

export default function ErrorPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout>
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-[var(--color-light)]">
              Loading...
            </h1>
          </div>
        </AuthLayout>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
