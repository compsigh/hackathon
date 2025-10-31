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
        </div>
      </div>
    </main>
  );
}
