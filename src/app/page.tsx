"use client";

import Link from "next/link";
import { ProtoMono } from "./fonts";
import { Navbar } from "./_components/navbar";
import { PhotoGrid } from "./_components/photo-grid";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-16 text-center">
          <h1
            className={`mb-4 text-5xl font-semibold tracking-tight [text-shadow:0_0_20px_var(--color-compsigh-60)] sm:text-6xl md:text-8xl ${ProtoMono.className}`}
          >
            <span className="animate-[fade_2s_linear_infinite]">►</span>DEPLOY/
            <span className="text-[var(--color-compsigh)]">25</span>
          </h1>
          <div className="mb-2 text-xl sm:text-2xl">
            University of San Francisco
          </div>
          <div className="text-lg sm:text-xl">
            Friday, November 07 - Sunday, November 09
          </div>
        </div>

        <section className="mx-auto mb-16 max-w-4xl text-center">
          <p className="mb-4 text-lg leading-relaxed sm:text-xl">
            <a
              href="https://compsigh.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-tronica-mono cursor-pointer text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
            >
              compsigh
            </a>
            &apos;s third annual hackathon, and our biggest event of the
            semester.
          </p>
          <p className="text-lg leading-relaxed sm:text-xl">
            A hype weekend for meeting cool people && building cool things.
          </p>
        </section>

        <section id="past-events" className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
            Past Events
          </h2>
          <div className="mx-auto max-w-4xl">
            <PhotoGrid />
          </div>
        </section>

        <footer className="pt-8 pb-4 text-center text-[var(--color-dark-30)]">
          <p className="mb-2 text-lg">Good luck, have fun!</p>
          <div className="space-y-1 text-sm">
            <p>
              <Link
                href="https://compsigh.club/docs/about"
                className="cursor-pointer text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
              >
                About compsigh
              </Link>{" "}
              •{" "}
              <Link
                href="https://compsigh.club/docs/code-of-conduct"
                className="cursor-pointer text-[var(--color-compsigh)] hover:underline hover:decoration-[var(--color-compsigh)]"
              >
                Code of Conduct
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
