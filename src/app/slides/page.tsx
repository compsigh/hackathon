"use client";

import { Navbar } from "../_components/navbar";
import { LogoBrand } from "../_components/logo-brand";

export default function SlidesPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <LogoBrand />
      <div className="container mx-auto max-w-2xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className="mb-8 text-4xl font-bold">Opening Slides</h1>

        <div className="mb-8">
          <a
            href="https://docs.google.com/presentation/d/1RnjAnCRLowswGDFjCqZ-3mb78EgJa5mRryrbCIFLotY/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-(--color-compsigh) underline decoration-(--color-compsigh) hover:decoration-(--color-compsigh) [text-shadow:0_0_10px_var(--color-compsigh-60)]"
          >
            Link to Google Slides
          </a>
        </div>

        <div>
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vTZcmvibxiu9IflIyYq5F6o6AbK6EccsGkwtzI83pNB_GV4dGwBxQ5imxaJZEtWGNEZiMSD-MUAln8a/pubembed?start=false&loop=false&delayms=3000"
            width="1868"
            height="1080"
            className="w-full"
            style={{ aspectRatio: "1868/1080", maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </main>
  );
}

