"use client";

import Link from "next/link";
import Image from "next/image";
import { ProtoMono } from "./fonts";
import { FAQAccordion } from "./_components/faq-accordion";
import { PhotoGrid } from "./_components/photo-grid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="h-10 flex items-center space-x-3">
            <Image src="/compsigh-logo-glowing.png" alt="compsigh" width={100} height={100} className="h-full w-auto" />
            <a
              href="https://compsigh.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-tronica-mono text-2xl "
              style={{
                fontFamily: "var(--font-tronica-mono)",
                color: "var(--color-compsigh)",
                textShadow: "0 0 10px var(--color-compsigh-60)"
              }}
            >
              compsigh
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1
            className={`mb-4 text-6xl font-semibold tracking-tight sm:text-8xl ${ProtoMono.className}`}
            style={{ textShadow: "0 0 20px var(--color-compsigh-60)" }}
          >
            <span className="animate-[fade_2s_linear_infinite]">►</span>DEPLOY/
            <span style={{ color: "var(--color-compsigh)" }}>25</span>
          </h1>
          <div className="mb-2 text-2xl">University of San Francisco</div>
          <div className="text-xl" style={{ color: "var(--color-dark-30)" }}>
            Friday, November 07 – Sunday, November 09
          </div>
        </div>

        {/* Register */}
        <section id="register" className="mb-16">
          <h2 className="mb-8 text-center text-4xl font-bold">Register</h2>
          <div className="mx-auto flex max-w-4xl flex-col items-center space-y-8">
            {/* Registration Button */}
            <div className="text-center">
              <button
                className="rounded-xl px-8 py-4 text-xl font-bold transition-colors duration-200 hover:opacity-80"
                style={{
                  backgroundColor: "var(--color-compsigh)",
                  color: "var(--color-light)",
                }}
              >
                Register Now
              </button>
              <p className="mt-4" style={{ color: "var(--color-dark-30)" }}>
                Registration will open soon!
              </p>
            </div>
          </div>
        </section>

        {/* Description */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="text-xl leading-relaxed">
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
          <p className="text-xl leading-relaxed">
            A hype weekend for meeting cool people && building cool things.
          </p>
        </div>

        {/* About */}
        <section id="about" className="mb-16">
          <h2 className="mb-8 text-center text-4xl font-bold">About</h2>
          <div className="mx-auto max-w-4xl space-y-6 text-lg">
            <p>
              Whether it&apos;s your first-ever hackathon, or you&apos;re a
              seasoned hacker, we hope you&apos;ll enjoy the event! To get the
              most out of the experience, here are some pieces of advice
              compsigh members have contributed:
            </p>
            <div className="space-y-4">
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: "var(--color-light-10)" }}
              >
                <p>
                  <strong>
                    Don&apos;t be afraid to mess up or not having something
                    functioning
                  </strong>{" "}
                  as long as you take something away from it!
                </p>
              </div>
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: "var(--color-light-10)" }}
              >
                <p>
                  <strong>Go in with a plan to learn, and have fun.</strong>{" "}
                  It&apos;s a good place to network, meet new people, and
                  explore different opportunities as well.
                </p>
              </div>
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: "var(--color-light-10)" }}
              >
                <p>
                  <strong>Document your process!</strong> Not just for the
                  presentations, but for the camera roll too. :)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="mb-8 text-center text-4xl font-bold">FAQ</h2>
          <div className="mx-auto max-w-4xl">
            <FAQAccordion />
          </div>
        </section>

        {/* Past Events */}
        <section id="past-events" className="mb-16">
          <h2 className="mb-8 text-center text-4xl font-bold">Past Events</h2>
          <div className="mx-auto max-w-4xl">
            <PhotoGrid />
          </div>
        </section>

        {/* Hackathon Documentary */}
        <section id="documentary" className="mb-16">
          <h2 className="mb-8 text-center text-4xl font-bold">
            Hackathon Documentary
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center">
              <iframe
                src="https://drive.google.com/file/d/1UwGQcq1oIux9WLPIe20gmMcmJbdlH6Yi/preview"
                width="640"
                height="480"
                allow="autoplay"
                className="rounded-lg"
                style={{ boxShadow: "0 0 20px var(--color-compsigh-60)" }}
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm" style={{ color: "var(--color-light-50)" }}>
                This video was made by Hendrick Kuo and contains footage of our
                most recent hackathon Bloom
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-8 text-center"
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
