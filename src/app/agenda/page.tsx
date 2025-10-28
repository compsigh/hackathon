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
            <span className="text-[var(--color-compsigh)]">25</span>
          </span>
        </Link>
      </div>

      <div className="container mx-auto max-w-4xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className={`mb-8 text-4xl font-bold ${ProtoMono.className}`}>
          AGENDA
        </h1>

        <div className="space-y-8">
          {/* Day 1 */}
          <div className="rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-compsigh)]">
              Friday, November 7
            </h2>
            <div className="space-y-3 text-lg">
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  6:00 PM
                </span>
                <span>Check-in & Opening Ceremony</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  7:00 PM
                </span>
                <span>Team Registration Opens</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  8:00 PM
                </span>
                <span>Hacking Begins!</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  10:00 PM
                </span>
                <span>Workshop Session</span>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-compsigh)]">
              Saturday, November 8
            </h2>
            <div className="space-y-3 text-lg">
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  9:00 AM
                </span>
                <span>Breakfast</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  12:00 PM
                </span>
                <span>Lunch</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  2:00 PM
                </span>
                <span>Workshop Session</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  6:00 PM
                </span>
                <span>Dinner</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  8:00 PM
                </span>
                <span>Mini Events & Activities</span>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-compsigh)]">
              Sunday, November 9
            </h2>
            <div className="space-y-3 text-lg">
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  9:00 AM
                </span>
                <span>Breakfast</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  12:00 PM
                </span>
                <span>Project Submissions Close</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  1:00 PM
                </span>
                <span>Demo Fair & Judging</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  4:00 PM
                </span>
                <span>Closing Ceremony & Awards</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 rounded-lg border-2 border-[var(--color-light-30)] bg-[var(--color-light-10)] p-6">
            <h3 className="mb-3 text-xl font-bold text-[var(--color-light)]">
              More Information
            </h3>
            <p className="text-[var(--color-light-50)]">
              A detailed schedule with workshop topics and special events will
              be announced closer to the event date. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
