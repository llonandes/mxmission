import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { applicationForms, registration, trip } from "@/lib/site";

export const metadata: Metadata = {
  title: registration.open
    ? "Register | Saint Mary's Mexican Mission Trip 2026"
    : "Registration Closed | Saint Mary's Mexican Mission Trip",
  description: registration.open
    ? `Reserve your spot for the ${trip.dateLabel} mission trip to ${trip.destination}.`
    : `${trip.year} registration is closed. The ${registration.nextBatchYear} batch opens ${registration.nextBatchOpens}.`,
};

export default function RegisterPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:pt-36">
        {registration.open ? (
          <>
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
          </>
        ) : (
          <ClosedNotice />
        )}

        {/* Paper application forms */}
        <div className="mt-16 rounded-3xl border border-clay-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">
            The application forms
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Want to get a head start? Open the official parish application forms
            (PDF) to view or print ahead of the {registration.nextBatchYear} season.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {applicationForms.map((f) => (
              <a
                key={f.href}
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-clay-200 px-5 py-3 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-50"
              >
                <OpenIcon /> {f.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ClosedNotice() {
  return (
    <div className="text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-clay-100 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-clay-700">
        {trip.dateLabel} · {registration.closedBadge}
      </span>
      <h1 className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl">
        <span className="line-through decoration-clay-400 decoration-4">
          Reserve your spot
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-ink-soft">
        Registration for the {trip.year} trip is now closed. Thank you to everyone
        joining us in {trip.destination} this June!
      </p>

      <div className="mx-auto mt-10 max-w-md rounded-3xl border border-clay-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-clay-500">
          Coming next
        </p>
        <p className="mt-2 font-display text-2xl font-bold text-ink">
          {registration.nextBatchYear} batch opens
          <br />
          {registration.nextBatchOpens}
        </p>
        <p className="mt-4 text-sm text-ink-soft">
          Want to be first to know when sign-ups open? Reach out to a coordinator
          and we&apos;ll keep you posted.
        </p>
        <Link
          href="/#faq"
          className="mt-6 inline-block rounded-full bg-clay-500 px-6 py-3 font-semibold text-cream transition-colors hover:bg-clay-600"
        >
          See contacts
        </Link>
      </div>
    </div>
  );
}

function OpenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path
        d="M14 5h5v5M19 5l-8 8M12 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
