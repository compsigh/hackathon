"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../_components/navbar";
import { ProtoMono } from "../fonts";

export default function AgendaPage() {
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
            <span className="text-(--color-compsigh)">25</span>
          </span>
        </Link>
      </div>

      <div className="container mx-auto max-w-4xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className={`mb-8 text-4xl font-bold ${ProtoMono.className}`}>
          AGENDA
        </h1>

        <div className="space-y-8">
          {/* Day 1 */}
          <div className="rounded-lg border-2 border-(--color-compsigh) bg-(--color-compsigh)/10 p-6">
            <h2 className="mb-2 text-2xl font-bold text-(--color-compsigh)">
              Friday, November 7
            </h2>
            <p className="mb-4 text-sm text-(--color-light-50)">
              Location:{" "}
              <a
                href="https://maps.app.goo.gl/LkMH8oKg763BCfg2A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-compsigh) hover:underline hover:decoration-(--color-compsigh)"
              >
                Fromm Hall - 115 - Berman Conference Room
              </a>
            </p>
            <div className="space-y-3 text-lg">
              <div className="flex gap-4">
                <span className="font-bold text-(--color-compsigh)">
                  6:00 PM
                </span>
                <span>Check-in & Opening Ceremony</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-(--color-compsigh)">
                  8:00 PM
                </span>
                <span>Registration Due & Hacking Begins!</span>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-lg border-2 border-(--color-compsigh) bg-(--color-compsigh)/10 p-6">
            <h2 className="mb-2 text-2xl font-bold text-(--color-compsigh)">
              Saturday, November 8
            </h2>
            <p className="mb-4 text-sm text-(--color-light-50)">
              Location:{" "}
              <a
                href="https://maps.app.goo.gl/2ZBP7sTMwhJiV7wQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-compsigh) hover:underline hover:decoration-(--color-compsigh)"
              >
                Social Hive (Harney First Floor)
              </a>
            </p>
            <div className="space-y-3 text-lg">
              <div className="flex gap-4">
                <span className="font-bold text-(--color-compsigh)">
                  12:00 PM
                </span>
                <span>Snacks, Drink, & Project Help</span>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="rounded-lg border-2 border-(--color-compsigh) bg-(--color-compsigh)/10 p-6">
            <h2 className="mb-2 text-2xl font-bold text-(--color-compsigh)">
              Sunday, November 9
            </h2>
            <p className="mb-4 text-sm text-(--color-light-50)">
              Location:{" "}
              <a
                href="https://maps.app.goo.gl/2ZBP7sTMwhJiV7wQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-compsigh) hover:underline hover:decoration-(--color-compsigh)"
              >
                Social Hive (Harney First Floor)
              </a>
            </p>
            <div className="space-y-3 text-lg">
              <div className="flex gap-4">
                <span className="font-bold text-(--color-compsigh)">
                  11:30 AM
                </span>
                <span>Project & Team Formation Submission</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-(--color-compsigh)">
                  12:00 PM
                </span>
                <span>Sun Lunch - Bread n Chu</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-(--color-compsigh)">
                  1:00 PM
                </span>
                <span>Presentations & Judging</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-(--color-compsigh)">
                  3:00 PM
                </span>
                <span>Closing Ceremony & Awards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
