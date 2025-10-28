"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function RegisterButton() {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "authenticated") {
      router.push("/participant");
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mb-4 cursor-pointer rounded-xl border-2 border-[var(--color-compsigh)] bg-[var(--black)] px-8 py-4 text-xl font-bold text-[var(--color-light)] [text-shadow:0_0_10px_var(--color-compsigh-60)] hover:bg-[var(--color-compsigh)] hover:text-black sm:px-12 sm:py-5 sm:text-2xl"
    >
      {status === "authenticated" ? "Go to Dashboard" : "Register Now"}
    </button>
  );
}
