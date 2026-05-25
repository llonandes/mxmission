import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";
import { applicationForms, trip } from "@/lib/site";

export const metadata: Metadata = {
  title: "Register | Saint Mary's Mexican Mission Trip 2026",
  description: `Reserve your spot for the ${trip.dateLabel} mission trip to ${trip.destination}.`,
};

export default function RegisterPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:pt-36">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-clay-500">
            {trip.dateLabel}
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Reserve your spot
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-ink-soft">
            Fill this out to claim your place on the {trip.year} trip to{" "}
            {trip.destination}. It takes about two minutes — payment and forms
            come later.
          </p>
        </div>

        <div className="mt-12">
          <RegisterForm />
        </div>

        {/* Paper application forms */}
        <div className="mt-16 rounded-3xl border border-clay-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">
            Prefer paper forms?
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            You can also download and print the official parish application forms and
            bring them to a meeting. Online registration above is the fastest way to
            hold your spot.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {applicationForms.map((f) => (
              <a
                key={f.href}
                href={f.href}
                className="inline-flex items-center gap-2 rounded-full border border-clay-200 px-5 py-3 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-50"
              >
                <DownloadIcon /> {f.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path
        d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
