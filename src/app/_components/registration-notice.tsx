"use client";

import Link from "next/link";

export function RegistrationNotice() {
  return (
    <>
      <div className="mb-6 rounded-lg border-2 border-(--color-compsigh) bg-(--color-compsigh)/10 p-6">
        <div className="mb-6 text-center">
          <p className="text-xl text-(--color-light)">
            <span className="text-(--color-compsigh)">→</span>{" "}
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSetHrl405TjkSfp79pg7S1rakFXk0RwVX5b2yuBXFVayLmbZA/viewform?usp=header"
              className="text-(--color-compsigh) underline decoration-(--color-compsigh) [text-shadow:0_0_10px_var(--color-compsigh-60)]"
            >
              Project and team submission here
            </Link>{" "}
            <span className="text-(--color-compsigh)">←</span>
          </p>
          <p className="mt-2 text-base text-(--color-light)">
            Submission due 11:30am • Lunch 12pm • Presentations 1pm
          </p>
        </div>
        <p className="text-lg text-(--color-light)">
          <Link
            href="/slides"
            className="text-(--color-compsigh) underline decoration-(--color-compsigh) [text-shadow:0_0_10px_var(--color-compsigh-60)]"
          >
            See the opening slides here
          </Link>
        </p>
        <p className="mt-3 text-lg text-(--color-light)">
          For any questions, you can{" "}
          <a
            href="https://www.instagram.com/compsigh.club/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-compsigh) underline decoration-(--color-compsigh) [text-shadow:0_0_10px_var(--color-compsigh-60)]"
          >
            DM compsigh on Instagram
          </a>{" "}
          or{" "}
          <a
            href="https://discord.compsigh.club"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-compsigh) underline decoration-(--color-compsigh) [text-shadow:0_0_10px_var(--color-compsigh-60)]"
          >
            chat in our Discord server
          </a>
          .
        </p>
        <p className="mt-3">
          <Link
            href="/agenda"
            className="text-lg text-(--color-compsigh) underline decoration-(--color-compsigh) [text-shadow:0_0_10px_var(--color-compsigh-60)]"
          >
            View the agenda -{'>'}
          </Link>
        </p>
      </div>
    </>
  );
}
