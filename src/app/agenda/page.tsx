"use client";

import { Navbar } from "../_components/navbar";
import { LogoBrand } from "../_components/logo-brand";
import { ProtoMono } from "../fonts";

export default function AgendaPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <LogoBrand />
      <div className="container mx-auto max-w-4xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className={`mb-8 text-4xl font-bold ${ProtoMono.className}`}>
          AGENDA
        </h1>

        <div className="space-y-8">
          {/* Day 1 */}
          <div className="rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <h2 className="mb-2 text-2xl font-bold text-[var(--color-compsigh)]">
              Friday, November 7
            </h2>
            <p className="mb-4 text-sm text-[var(--color-light-50)]">
              Location:{" "}
              <a
                href="https://maps.app.goo.gl/LkMH8oKg763BCfg2A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
              >
                Fromm Hall - 115 - Berman Conference Room
              </a>
            </p>
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
              <div className="mt-4 border-t border-[var(--color-light-30)] pt-4 text-[var(--color-light-50)]">
                More events / meals announced soon
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <h2 className="mb-2 text-2xl font-bold text-[var(--color-compsigh)]">
              Saturday, November 8
            </h2>
            <p className="mb-4 text-sm text-[var(--color-light-50)]">
              Location:{" "}
              <a
                href="https://maps.app.goo.gl/2ZBP7sTMwhJiV7wQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
              >
                Social Hive (Harney First Floor)
              </a>
            </p>
            <div className="space-y-3 text-lg">
              <div className="text-[var(--color-light-50)]">
                More events / meals announced soon
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="rounded-lg border-2 border-[var(--color-compsigh)] bg-[var(--color-compsigh)]/10 p-6">
            <h2 className="mb-2 text-2xl font-bold text-[var(--color-compsigh)]">
              Sunday, November 9
            </h2>
            <p className="mb-4 text-sm text-[var(--color-light-50)]">
              Location:{" "}
              <a
                href="https://maps.app.goo.gl/2ZBP7sTMwhJiV7wQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
              >
                Social Hive (Harney First Floor)
              </a>
            </p>
            <div className="space-y-3 text-lg">
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  12:00 PM
                </span>
                <span>Project Submissions Close</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-[var(--color-compsigh)]">
                  12:00 PM
                </span>
                <span>Lunch</span>
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
              <div className="mt-4 border-t border-[var(--color-light-30)] pt-4 text-[var(--color-light-50)]">
                More events / meals announced soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
