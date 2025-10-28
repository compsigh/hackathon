"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/navbar";
import { ProtoMono } from "../fonts";

export default function ParticipantPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const utils = api.useUtils();

  const { data: user, isLoading } = api.participant.getCurrentUser.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
    },
  );

  const updateName = api.participant.updateName.useMutation({
    onSuccess: () => {
      void utils.participant.getCurrentUser.invalidate();
    },
  });

  const updateGraduatingClass =
    api.participant.updateGraduatingClass.useMutation({
      onSuccess: () => {
        void utils.participant.getCurrentUser.invalidate();
      },
    });

  // Track save success state
  const [showSuccess, setShowSuccess] = useState(false);

  // Store original values from user data
  const [originalValues, setOriginalValues] = useState({
    name: "",
    graduatingClass: "CO2025" as
      | "CO2029"
      | "CO2028"
      | "CO2027"
      | "CO2026"
      | "CO2025"
      | "MASTERS",
  });

  // Store current edited values
  const [name, setName] = useState("");
  const [graduatingClass, setGraduatingClass] = useState(
    "CO2025" as
      | "CO2029"
      | "CO2028"
      | "CO2027"
      | "CO2026"
      | "CO2025"
      | "MASTERS",
  );

  // Update both original and current values when user data loads
  useEffect(() => {
    if (user) {
      const newOriginalValues = {
        name: user.name ?? "",
        graduatingClass: (user.graduatingClass ?? "CO2025") as
          | "CO2029"
          | "CO2028"
          | "CO2027"
          | "CO2026"
          | "CO2025"
          | "MASTERS",
      };
      setOriginalValues(newOriginalValues);
      setName(newOriginalValues.name);
      setGraduatingClass(newOriginalValues.graduatingClass);
    }
  }, [user]);

  // Check if any changes have been made
  const hasChanges = useMemo(() => {
    return (
      name !== originalValues.name ||
      graduatingClass !== originalValues.graduatingClass
    );
  }, [name, graduatingClass, originalValues]);

  // Handle save
  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      const promises = [];
      if (name !== originalValues.name) {
        promises.push(updateName.mutateAsync({ name }));
      }
      if (graduatingClass !== originalValues.graduatingClass) {
        promises.push(updateGraduatingClass.mutateAsync({ graduatingClass }));
      }

      await Promise.all(promises);

      // Update original values to reflect successful save
      setOriginalValues({
        name,
        graduatingClass,
      });

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  // Handle reset
  const handleReset = () => {
    setName(originalValues.name);
    setGraduatingClass(originalValues.graduatingClass);
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-2xl">Loading...</div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  if (!user) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-2xl">Error loading user data</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      {/* Logo/Brand */}
      <div className="absolute top-0 left-0 z-10 p-4">
        <Link
          href="/"
          className="flex h-10 cursor-pointer items-center space-x-3 hover:underline"
        >
          <Image
            src="/compsigh-logo-glowing.png"
            alt="deploy 25"
            width={100}
            height={100}
            className="h-full w-auto"
          />
          <span
            className={`text-xl tracking-tight [text-shadow:0_0_10px_var(--color-compsigh-60)] sm:text-2xl ${ProtoMono.className}`}
          >
            <span className="animate-[fade_2s_linear_infinite]">►</span>DEPLOY/
            <span className="text-[var(--color-compsigh)]">25</span>
          </span>
        </Link>
      </div>
      <div className="container mx-auto max-w-2xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className="mb-8 text-4xl font-bold">Participant Dashboard</h1>

        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] px-4 py-2 text-[var(--color-light)] focus:border-[var(--color-compsigh)] focus:outline-none ${ProtoMono.className}`}
              placeholder="Enter your name"
            />
          </div>

          {/* Graduating Class Field */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Graduating Class
            </label>
            <select
              value={graduatingClass}
              onChange={(e) => {
                setGraduatingClass(
                  e.target.value as
                    | "CO2029"
                    | "CO2028"
                    | "CO2027"
                    | "CO2026"
                    | "CO2025"
                    | "MASTERS",
                );
              }}
              className={`w-full cursor-pointer rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] px-4 py-2 text-[var(--color-light)] focus:border-[var(--color-compsigh)] focus:outline-none ${ProtoMono.className}`}
              style={{ colorScheme: "dark" }}
            >
              <option
                value="CO2029"
                className="bg-[var(--color-dark)] text-[var(--color-light)]"
              >
                2029
              </option>
              <option
                value="CO2028"
                className="bg-[var(--color-dark)] text-[var(--color-light)]"
              >
                2028
              </option>
              <option
                value="CO2027"
                className="bg-[var(--color-dark)] text-[var(--color-light)]"
              >
                2027
              </option>
              <option
                value="CO2026"
                className="bg-[var(--color-dark)] text-[var(--color-light)]"
              >
                2026
              </option>
              <option
                value="CO2025"
                className="bg-[var(--color-dark)] text-[var(--color-light)]"
              >
                2025
              </option>
              <option
                value="MASTERS"
                className="bg-[var(--color-dark)] text-[var(--color-light)]"
              >
                Masters
              </option>
            </select>
          </div>

          {/* Email Display (read-only) */}
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={user.email ?? ""}
              disabled
              className={`w-full cursor-not-allowed rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] px-4 py-2 text-[var(--color-light-50)] ${ProtoMono.className}`}
            />
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div
              className="rounded-lg border-2 border-green-500 bg-green-500/10 px-4 py-3 text-green-400"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">Changes saved successfully!</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className="flex-1 cursor-pointer rounded-lg border border-[hsla(38deg,100%,90%,0.5)] px-6 py-3 font-medium text-[var(--color-light)] hover:bg-[hsla(38deg,100%,90%,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={
                !hasChanges ||
                updateName.isPending ||
                updateGraduatingClass.isPending
              }
              className="flex-1 cursor-pointer rounded-xl border-2 border-[var(--color-compsigh)] bg-[var(--black)] px-6 py-3 font-medium text-[var(--color-light)] hover:bg-[var(--color-compsigh)] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateName.isPending || updateGraduatingClass.isPending
                ? "Saving..."
                : "Save"}
            </button>
          </div>

          {/* Team Registration Note */}
          <div className="mt-8 rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <p className="text-lg text-[var(--color-light)]">
              <strong className="text-[var(--color-compsigh)]">
                Team registration will open on November 7th at 6pm.
              </strong>{" "}
              Get your friends or desired teammates to register as participants!
            </p>
            <p className="mt-3">
              <Link
                href="/agenda"
                className="text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
              >
                View the agenda →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
