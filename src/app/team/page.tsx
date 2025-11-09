"use client";

import { Navbar } from "../_components/navbar";
import { LogoBrand } from "../_components/logo-brand";
import { RegistrationNotice } from "../_components/registration-notice";

export default function TeamPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <LogoBrand />
      <div className="container mx-auto max-w-2xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className="mb-8 text-4xl font-bold">Team Formation</h1>

        <RegistrationNotice />

        <div className="space-y-6">
          {/* Team formation content will go here */}
        </div>
      </div>
    </main>
  );
}

