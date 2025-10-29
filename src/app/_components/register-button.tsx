"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function RegisterButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "authenticated") {
      if (session?.user?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/participant");
      }
    } else {
      router.push("/api/auth/signin");
    }
  };

  const getButtonText = () => {
    if (status === "authenticated") {
      if (session?.user?.isAdmin) {
        return "Go to Admin Dash";
      }
      return "Go to Dashboard";
    }
    return "Register Now";
  };

  return (
    <button
      onClick={handleClick}
      className="mb-4 cursor-pointer rounded-xl border-2 border-[var(--color-compsigh)] bg-[var(--black)] px-8 py-4 text-xl font-bold text-[var(--color-light)] [text-shadow:0_0_10px_var(--color-compsigh-60)] hover:bg-[var(--color-compsigh)] hover:text-black sm:px-12 sm:py-5 sm:text-2xl"
    >
      {getButtonText()}
    </button>
  );
}
