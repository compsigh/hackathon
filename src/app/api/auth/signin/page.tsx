"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignInPage() {
  useEffect(() => {
    void signIn("google", {
      callbackUrl: "/participant",
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Redirecting to Google...</h1>
        <p className="text-gray-400">Please wait</p>
      </div>
    </div>
  );
}

