"use client";

import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthLayout } from "../_components/auth-layout";

function SignInContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSignIn = () => {
    void signIn("google", {
      callbackUrl: "/participant",
    });
  };

  return (
    <AuthLayout>
      {error === "AccessDenied" && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-500/10 p-4">
          <p className="text-red-400">
            Please sign in with your USFCA email address (usfca.edu)
          </p>
        </div>
      )}

      <button
        onClick={handleSignIn}
        className="w-full cursor-pointer rounded-xl border-2 border-[var(--color-compsigh)] bg-[var(--color-dark)] px-8 py-4 text-xl font-bold text-[var(--color-light)] transition-colors [text-shadow:0_0_10px_var(--color-compsigh-60)] hover:bg-[var(--color-compsigh)] hover:text-[var(--color-dark)]"
      >
        Sign in with Google
      </button>
    </AuthLayout>
  );
}

export default function SignInPage() {
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
      <SignInContent />
    </Suspense>
  );
}
