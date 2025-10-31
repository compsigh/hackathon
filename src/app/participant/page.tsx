"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/navbar";
import { ProtoMono } from "../fonts";

export default function ParticipantPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const utils = api.useUtils();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

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

  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasShareAPI, setHasShareAPI] = useState(false);
  const confettiTriggeredRef = useRef<string | null>(null);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const [originalValues, setOriginalValues] = useState({
    name: "",
    graduatingClass: null as
      | "CO2029"
      | "CO2028"
      | "CO2027"
      | "CO2026"
      | "CO2025"
      | "MASTERS"
      | null,
  });

  const [name, setName] = useState("");
  const [graduatingClass, setGraduatingClass] = useState(
    null as
      | "CO2029"
      | "CO2028"
      | "CO2027"
      | "CO2026"
      | "CO2025"
      | "MASTERS"
      | null,
  );

  useEffect(() => {
    if (user) {
      const newOriginalValues = {
        name: user.name ?? "",
        graduatingClass: (user.graduatingClass ?? null) as
          | "CO2029"
          | "CO2028"
          | "CO2027"
          | "CO2026"
          | "CO2025"
          | "MASTERS"
          | null,
      };
      setTimeout(() => {
        setOriginalValues(newOriginalValues);
        setName(newOriginalValues.name);
        setGraduatingClass(newOriginalValues.graduatingClass);
      }, 0);
    }
  }, [user]);

  useEffect(() => {
    // Check if Web Share API is available
    setHasShareAPI(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const handleFirstVisit = useEffectEvent(() => {
    // void markParticipantPageVisited.mutateAsync().catch(() => {
    //   // Silently handle errors
    // });
    const count = 3000;
    const topCenter = { x: 0.5, y: 0 }; // Top edge center
    const numberOfEmitters = 24; // Number of emitters along bottom edge
    
    // Place emitters evenly along the bottom edge
    for (let i = 0; i < numberOfEmitters; i++) {
      // Calculate x position along bottom edge (0 to 1)
      const emitterX = i / (numberOfEmitters - 1);
      const emitterY = 1; // Bottom edge
      
      // Calculate angle from emitter to top center
      // Confetti angles: 0° = right, 90° = up, 180° = left, 270° = down
      const dx = topCenter.x - emitterX;
      const dy = topCenter.y - emitterY;
      const angleToTop = Math.atan2(-dy, dx) * (180 / Math.PI); // Negative dy because y increases downward
      
      void confetti({
        particleCount: Math.floor(count / numberOfEmitters),
        angle: angleToTop,
        spread: 30,
        startVelocity: 70,
        origin: { x: emitterX, y: emitterY },
        decay: 0.92,
        scalar: 1,
      });
    }
  });

  useEffect(() => {
    if (!user) return;
    
    const hasVisited = user.hasVisitedParticipantPage ?? false;
    const alreadyTriggered = confettiTriggeredRef.current === user.id;
    
    if (!hasVisited && !alreadyTriggered) {
      confettiTriggeredRef.current = user.id;
      handleFirstVisit();
    }
    
    if (confettiTriggeredRef.current && confettiTriggeredRef.current !== user.id) {
      confettiTriggeredRef.current = null;
    }
  }, [user]);

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
        if (graduatingClass !== null) {
          promises.push(updateGraduatingClass.mutateAsync({ graduatingClass }));
        }
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

      // Trigger confetti on successful save
      const getSaveButtonOrigin = () => {
        if (saveButtonRef.current) {
          const rect = saveButtonRef.current.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;
          return { x, y };
        }
        return { x: 0.5, y: 0.6 };
      };

      void confetti({
        particleCount: 50,
        spread: 70,
        startVelocity: 20,
        origin: getSaveButtonOrigin(),
      });
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  // Handle reset
  const handleReset = () => {
    setName(originalValues.name);
    setGraduatingClass(originalValues.graduatingClass);
  };

  // Handle share
  const handleShare = async () => {
    const url = "https://deploy.compsigh.club";
    
    // Get button position for confetti origin
    const getButtonOrigin = () => {
      if (shareButtonRef.current) {
        const rect = shareButtonRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        return { x, y };
      }
      return { x: 0.5, y: 0.6 };
    };
    
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "DEPLOY/25 - CompSigh Hackathon",
          text: "Join me at DEPLOY/25! Register as a participant.",
          url: url,
        });
        // Trigger confetti on successful share
        void confetti({
          particleCount: 50,
          spread: 70,
          startVelocity: 20,
          origin: getButtonOrigin(),
        });
      } catch (error) {
        // User cancelled or error occurred, silently handle
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      // Fallback to clipboard copy (desktop)
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        // Trigger confetti on successful copy
        void confetti({
          particleCount: 50,
          spread: 70,
          startVelocity: 20,
          origin: getButtonOrigin(),
        });
      } catch (error) {
        console.error("Failed to copy:", error);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          // eslint-disable-next-line deprecation/deprecation -- Fallback for older browsers that don't support Clipboard API
          document.execCommand("copy");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          // Trigger confetti on successful copy
          void confetti({
            particleCount: 50,
            spread: 70,
            startVelocity: 20,
            origin: getButtonOrigin(),
          });
        } catch (err) {
          console.error("Fallback copy failed:", err);
        }
        document.body.removeChild(textArea);
      }
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-2xl">Loading...</div>
      </main>
    );
  }

  if (status === "unauthenticated") {
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

          {/* You're in! Notice */}
          <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-500/10 px-4 py-3 text-green-400">
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
              <span className="font-medium text-lg">You're registered! We'll see you at the event!</span>
            </div>
          </div>

          {/* Team Registration Note */}
          <div className="mb-6 rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <p className="text-lg text-[var(--color-light)]">
              <strong className="text-[var(--color-compsigh)]">
                Team registration will open on November 7th at 6pm.
              </strong>
            </p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-lg text-[var(--color-light)]">
                Get your friends to register!
              </p>
              <button
                ref={shareButtonRef}
                onClick={handleShare}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-medium transition-all duration-200 ${
                  copied
                    ? "border border-[var(--color-compsigh)] bg-[var(--color-compsigh)] text-black active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                    : "border border-[var(--color-compsigh)] bg-[var(--black)] text-[var(--color-compsigh)] hover:bg-[var(--color-compsigh)] hover:text-[var(--color-light)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                }`}
              >
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                {copied ? "Yay!" : hasShareAPI ? "Share" : "Copy"}
              </button>
            </div>
            <p className="mt-3">
              <Link
                href="/agenda"
                className="text-lg text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
              >
                View the agenda →
              </Link>
            </p>
          </div>

          {/* Admin Notice */}
          {session?.user?.isAdmin && (
            <div className="mb-6 rounded-lg border-2 border-[var(--color-compsigh)] p-4">
                <p className="text-sm text-[var(--color-light)]">
                  <strong className="text-[var(--color-compsigh)]">
                    Admin Access:
                  </strong>{" "}
                  You have admin privileges.{" "}
                  <Link
                    href="/admin"
                    className="font-medium text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
                  >
                    Access admin panel →
                  </Link>
                </p>
              </div>
          )}

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
              value={graduatingClass ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setGraduatingClass(
                  value === "" ? null : (value as
                    | "CO2029"
                    | "CO2028"
                    | "CO2027"
                    | "CO2026"
                    | "CO2025"
                    | "MASTERS"),
                );
              }}
              className={`w-full cursor-pointer rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] px-4 py-2 text-[var(--color-light)] focus:border-[var(--color-compsigh)] focus:outline-none ${ProtoMono.className}`}
              style={{ colorScheme: "dark" }}
            >
              <option
                value=""
                disabled
                className="bg-[var(--color-dark)] text-[var(--color-light-50)]"
              >
                Select a class
              </option>
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
              ref={saveButtonRef}
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

          {/* Success Message */}
          {showSuccess && (
            <div
              className="mt-4 rounded-lg border-2 border-green-500 bg-green-500/10 px-4 py-3 text-green-400"
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

        </div>
      </div>
    </main>
  );
}
