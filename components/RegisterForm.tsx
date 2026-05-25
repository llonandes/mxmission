"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckIcon } from "@/components/Icons";
import { pricing } from "@/lib/site";

type ParticipantType = "youth" | "adult" | "";

type FormState = {
  participantType: ParticipantType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string; // youth only
  emergencyName: string;
  emergencyPhone: string;
  medicalNotes: string;
  needsScholarship: boolean;
  speaksSpanish: boolean;
  agree: boolean;
};

const initial: FormState = {
  participantType: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  grade: "",
  emergencyName: "",
  emergencyPhone: "",
  medicalNotes: "",
  needsScholarship: false,
  speaksSpanish: false,
  agree: false,
};

const steps = ["Who's going", "Your info", "Safety", "Review"] as const;

export default function RegisterForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return data.participantType !== "";
      case 1:
        return (
          data.firstName.trim() &&
          data.lastName.trim() &&
          /^\S+@\S+\.\S+$/.test(data.email) &&
          data.phone.trim() &&
          (data.participantType === "adult" || data.grade.trim())
        );
      case 2:
        return data.emergencyName.trim() && data.emergencyPhone.trim();
      case 3:
        return data.agree;
      default:
        return false;
    }
  }, [step, data]);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) return <SuccessCard name={data.firstName} />;

  const fee =
    data.participantType === "youth"
      ? pricing.youth.amount
      : data.participantType === "adult"
        ? pricing.adult.amount
        : null;

  return (
    <div className="mx-auto max-w-2xl">
      <Stepper step={step} />

      <div className="mt-8 rounded-3xl border border-clay-100 bg-white p-6 shadow-sm sm:p-8">
        {step === 0 && (
          <Fieldset
            title="Who's going on the trip?"
            hint="Pick the option that describes the participant."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <ChoiceCard
                active={data.participantType === "youth"}
                onClick={() => update("participantType", "youth")}
                title="Teen"
                sub="8th–12th grade · $250"
              />
              <ChoiceCard
                active={data.participantType === "adult"}
                onClick={() => update("participantType", "adult")}
                title="Adult"
                sub="18 and older · $780"
              />
            </div>
          </Fieldset>
        )}

        {step === 1 && (
          <Fieldset title="Tell us about you" hint="We'll use this to follow up about the trip.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First name" value={data.firstName} onChange={(v) => update("firstName", v)} />
              <Input label="Last name" value={data.lastName} onChange={(v) => update("lastName", v)} />
              <Input label="Email" type="email" value={data.email} onChange={(v) => update("email", v)} />
              <Input label="Phone" type="tel" value={data.phone} onChange={(v) => update("phone", v)} />
              {data.participantType === "youth" && (
                <Input
                  label="Current grade"
                  value={data.grade}
                  onChange={(v) => update("grade", v)}
                  placeholder="e.g. 10th"
                />
              )}
            </div>
            <Checkbox
              checked={data.speaksSpanish}
              onChange={(v) => update("speaksSpanish", v)}
              label="I speak Spanish (helpful on the build site!)"
            />
          </Fieldset>
        )}

        {step === 2 && (
          <Fieldset title="Safety & emergency contact" hint="Required so we can keep everyone safe.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Emergency contact name" value={data.emergencyName} onChange={(v) => update("emergencyName", v)} />
              <Input label="Emergency contact phone" type="tel" value={data.emergencyPhone} onChange={(v) => update("emergencyPhone", v)} />
            </div>
            <Textarea
              label="Allergies or medical notes (optional)"
              value={data.medicalNotes}
              onChange={(v) => update("medicalNotes", v)}
              placeholder="Anything our leaders should know"
            />
            <Checkbox
              checked={data.needsScholarship}
              onChange={(v) => update("needsScholarship", v)}
              label="I'd like to ask about a scholarship"
            />
          </Fieldset>
        )}

        {step === 3 && (
          <Fieldset title="Review & confirm" hint="Double-check everything looks right.">
            <dl className="divide-y divide-clay-100 rounded-2xl bg-clay-50 px-5">
              <Review label="Participant" value={data.participantType === "youth" ? "Teen" : "Adult"} />
              <Review label="Name" value={`${data.firstName} ${data.lastName}`} />
              <Review label="Email" value={data.email} />
              <Review label="Phone" value={data.phone} />
              {data.participantType === "youth" && <Review label="Grade" value={data.grade} />}
              <Review label="Emergency contact" value={`${data.emergencyName} · ${data.emergencyPhone}`} />
              {data.medicalNotes && <Review label="Medical notes" value={data.medicalNotes} />}
              <Review label="Scholarship requested" value={data.needsScholarship ? "Yes" : "No"} />
              {fee !== null && <Review label="Trip fee" value={`$${fee} (all-inclusive)`} />}
            </dl>

            <Checkbox
              checked={data.agree}
              onChange={(v) => update("agree", v)}
              label="I understand this reserves my spot and a coordinator will contact me about payment, forms, and my passport."
            />
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}
          </Fieldset>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`text-sm font-semibold text-ink-soft transition-colors hover:text-ink ${
              step === 0 ? "invisible" : ""
            }`}
          >
            ← Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              disabled={!stepValid}
              onClick={() => setStep((s) => s + 1)}
              className="rounded-full bg-clay-500 px-7 py-3 font-semibold text-cream transition-colors hover:bg-clay-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              disabled={!stepValid || submitting}
              onClick={submit}
              className="rounded-full bg-clay-500 px-7 py-3 font-semibold text-cream transition-colors hover:bg-clay-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Submitting…" : "Submit registration"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-ink-soft">
        Prefer to talk to someone first?{" "}
        <Link href="/#faq" className="font-semibold text-clay-600 hover:text-clay-700">
          See our contacts →
        </Link>
      </p>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2">
      {steps.map((label, i) => (
        <li key={label} className="flex flex-1 flex-col gap-2">
          <div
            className={`h-1.5 rounded-full transition-colors ${
              i <= step ? "bg-clay-500" : "bg-clay-100"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              i <= step ? "text-clay-600" : "text-ink-soft/60"
            }`}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Fieldset({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-ink-soft">{hint}</p>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function ChoiceCard({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl border-2 p-5 text-left transition-all ${
        active
          ? "border-clay-500 bg-clay-50 shadow-sm"
          : "border-clay-100 bg-white hover:border-clay-200"
      }`}
    >
      <span>
        <span className="block font-display text-lg font-bold text-ink">{title}</span>
        <span className="block text-sm text-ink-soft">{sub}</span>
      </span>
      <span
        className={`grid h-6 w-6 place-items-center rounded-full border-2 ${
          active ? "border-clay-500 bg-clay-500 text-cream" : "border-clay-200"
        }`}
      >
        {active && <CheckIcon className="h-4 w-4" />}
      </span>
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-clay-200 bg-cream/40 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-clay-400 focus:bg-white focus:ring-2 focus:ring-clay-200"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-clay-200 bg-cream/40 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-clay-400 focus:bg-white focus:ring-2 focus:ring-clay-200"
      />
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-clay-300 text-clay-500 focus:ring-clay-300"
      />
      <span className="text-sm leading-relaxed text-ink-soft">{label}</span>
    </label>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function SuccessCard({ name }: { name: string }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal-600/10 text-teal-600">
        <CheckIcon className="h-10 w-10" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-ink">
        You&apos;re on the list{name ? `, ${name}` : ""}!
      </h2>
      <p className="mt-4 text-lg text-ink-soft">
        Thank you for signing up. A trip coordinator will reach out soon about
        payment, the application forms, and your passport. Watch your email and
        phone.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/#dates"
          className="rounded-full bg-clay-500 px-6 py-3 font-semibold text-cream transition-colors hover:bg-clay-600"
        >
          See the key dates
        </Link>
        <Link
          href="/"
          className="rounded-full border border-clay-200 px-6 py-3 font-semibold text-ink transition-colors hover:bg-clay-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
