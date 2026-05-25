import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";
import { trip } from "@/lib/site";

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
      </section>
    </div>
  );
}
