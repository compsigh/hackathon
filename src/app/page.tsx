"use client";

import Link from "next/link";
import Image from "next/image";
import { ProtoMono } from "./fonts";
import { FAQAccordion } from "./_components/faq-accordion";
import { PhotoGrid } from "./_components/photo-grid";
import { RegisteredCount } from "./_components/registered-count";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Logo/Brand */}
      <div className="fixed top-0 left-0 z-10 p-4">
        <a
          href="https://compsigh.club/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center space-x-3"
        >
          <Image src="/compsigh-logo-glowing.png" alt="compsigh" width={100} height={100} className="h-full w-auto" />
          <span
            className="font-tronica-mono text-xl sm:text-2xl"
            style={{
              fontFamily: "var(--font-tronica-mono)",
              color: "var(--color-compsigh)",
              textShadow: "0 0 10px var(--color-compsigh-60)"
            }}
          >
            compsigh
          </span>
        </a>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1
            className={`mb-4 text-5xl font-semibold tracking-tight sm:text-6xl md:text-8xl ${ProtoMono.className}`}
            style={{ textShadow: "0 0 20px var(--color-compsigh-60)" }}
          >
            <span className="animate-[fade_2s_linear_infinite]">►</span>DEPLOY/
            <span style={{ color: "var(--color-compsigh)" }}>25</span>
          </h1>
          <div className="mb-2 text-xl sm:text-2xl">University of San Francisco</div>
          <div className="text-lg sm:text-xl">
            Friday, November 07 - Sunday, November 09
          </div>
        </div>

        {/* Register */}
        <section id="register" className="mb-16">
          <div className="mx-auto max-w-4xl text-center">
            <button
              className="mb-4 rounded-xl px-6 py-3 text-lg font-bold sm:px-8 sm:py-4 sm:text-xl"
              style={{
                backgroundColor: "var(--black)",
                color: "var(--color-light)",
                textShadow: "0 0 10px var(--color-compsigh-60)",
                border: "2px solid var(--color-compsigh)"
              }}
            >
              Register Now
            </button>
            <RegisteredCount />
          </div>
        </section>

        {/* Description */}
        <section className="mx-auto mb-16 max-w-4xl text-center">
          <p className="mb-4 text-lg leading-relaxed sm:text-xl">
            <a
              href="https://compsigh.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-tronica-mono"
              style={{
                fontFamily: "var(--font-tronica-mono)",
                color: "var(--color-compsigh)",
              }}
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

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">FAQ</h2>
          <div className="mx-auto max-w-4xl">
            <FAQAccordion />
          </div>
        </section>

        {/* Past Events */}
        <section id="past-events" className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">Past Events</h2>
          <div className="mx-auto max-w-4xl">
            <PhotoGrid />
          </div>
        </section>

        {/* Hackathon Documentary */}
        <section id="documentary" className="mb-8">
          <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
            Hackathon Documentary
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://drive.google.com/file/d/1UwGQcq1oIux9WLPIe20gmMcmJbdlH6Yi/preview"
                  allow="autoplay"
                  className="absolute inset-0 h-full w-full rounded-lg"
                  style={{ boxShadow: "0 0 20px var(--color-compsigh-60)" }}
                ></iframe>
              </div>
            </div>
            <p className="mt-4 text-center text-sm" style={{ color: "var(--color-light-50)" }}>
              This video was made by <a href="https://hhkuo.org/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-compsigh)" }}>Hendrick Kuo</a> and contains footage of our
              most recent hackathon <a href="https://bloom.build/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-compsigh)" }}>Bloom</a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="pb-4 pt-8 text-center"
          style={{ color: "var(--color-dark-30)" }}
        >
          <p className="mb-2 text-lg">Good luck, have fun!</p>
          <div className="space-y-1 text-sm">
            <p>
              <Link
                href="https://compsigh.club/docs/about"
                className="hover:underline"
                style={{ color: "var(--color-compsigh)" }}
              >
                About compsigh
              </Link>{" "}
              •{" "}
              <Link
                href="https://compsigh.club/docs/code-of-conduct"
                className="hover:underline"
                style={{ color: "var(--color-compsigh)" }}
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
