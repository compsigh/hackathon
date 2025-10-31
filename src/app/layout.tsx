import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";
import { ProtoMono } from "./fonts";
import { SessionProvider } from "./session-provider";

const metadataBase = new URL("https://deploy25.com");

export const metadata: Metadata = {
  metadataBase,
  title: "DEPLOY/25",
  description:
    "compsigh's third annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people && building cool things.",
  openGraph: {
    title: "DEPLOY/25",
    description:
      "compsigh's third annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people && building cool things.",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "DEPLOY/25 - compsigh's third annual hackathon",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEPLOY/25",
    description:
      "compsigh's third annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people && building cool things.",
  },
};

const iAWriterQuattro = localFont({
  src: [
    {
      path: "../../public/iAWriterQuattroS-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/iAWriterQuattroS-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/iAWriterQuattroS-BoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-ia-writer-quattro",
});

const TronicaMono = localFont({
  src: [
    {
      path: "../../public/TronicaMono.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tronica-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${ProtoMono.variable} ${iAWriterQuattro.variable} ${TronicaMono.variable}`}
    >
      <body>
        <SessionProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
