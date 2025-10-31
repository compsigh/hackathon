"use client";

import Link from "next/link";
import { useRef } from "react";
import { useShare } from "./hooks/use-share";
import { useConfetti } from "./hooks/use-confetti";

export function RegistrationNotice() {
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const { share, copied, hasShareAPI } = useShare();
  const { triggerFromElement } = useConfetti();

  const handleShare = async () => {
    const success = await share(
      "https://deploy.compsigh.club",
      "DEPLOY/25 - CompSigh Hackathon",
      "Join me at DEPLOY/25! Register as a participant.",
    );
    if (success) {
      triggerFromElement(shareButtonRef.current);
    }
  };

  return (
    <>
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
          <span className="text-lg font-medium">
            You're registered! We'll see you at the event!
          </span>
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
    </>
  );
}

