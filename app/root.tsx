import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";

import "./styles/globals.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DEPLOY/25" },
    {
      name: "description",
      content:
        "compsigh's third annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people && building cool things.",
    },
    { property: "og:title", content: "DEPLOY/25" },
    {
      property: "og:description",
      content:
        "compsigh's third annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people && building cool things.",
    },
    { property: "og:image", content: "/opengraph-image.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "DEPLOY/25" },
    {
      name: "twitter:description",
      content:
        "compsigh's third annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people && building cool things.",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{message}</h1>
        <p className="mt-4 text-lg text-(--color-light-50)">{details}</p>
      </div>
    </main>
  );
}
