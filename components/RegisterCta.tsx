import Link from "next/link";
import { registration } from "@/lib/site";

type Props = {
  tone?: "light" | "dark"; // dark = sits on a dark/clay background
  size?: "sm" | "lg";
  withNote?: boolean; // show "2027 batch opens …" beneath
  block?: boolean; // full-width
  className?: string;
};

export default function RegisterCta({
  tone = "light",
  size = "lg",
  withNote = false,
  block = false,
  className = "",
}: Props) {
  const pad = size === "sm" ? "px-5 py-2.5 text-sm" : "px-7 py-3.5";

  // Open: a normal link to the form.
  if (registration.open) {
    const openCls =
      tone === "dark"
        ? "bg-cream text-clay-700 hover:-translate-y-0.5"
        : "bg-clay-500 text-cream hover:bg-clay-600";
    return (
      <Link
        href="/register"
        className={`rounded-full ${pad} text-center font-semibold shadow-sm transition-all ${openCls} ${
          block ? "block w-full" : "inline-block"
        } ${className}`}
      >
        {registration.ctaLabel}
      </Link>
    );
  }

  // Closed: struck-out label + "Closed" badge, optional 2027 note.
  const pillCls = tone === "dark" ? "bg-cream/15 text-cream" : "bg-clay-100 text-clay-700";
  const badgeCls = tone === "dark" ? "bg-cream/25 text-cream" : "bg-clay-500 text-cream";
  const noteCls = tone === "dark" ? "text-sun-400" : "text-clay-600";

  return (
    <span className={`inline-flex flex-col items-start gap-2 ${block ? "w-full" : ""} ${className}`}>
      <Link
        href="/register"
        title="2026 registration is closed — see 2027 details"
        className={`inline-flex items-center justify-center gap-2.5 rounded-full ${pad} font-semibold transition-opacity hover:opacity-90 ${pillCls} ${
          block ? "w-full" : ""
        }`}
      >
        <span className="line-through opacity-70">{registration.ctaLabel}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${badgeCls}`}>
          {registration.closedBadge}
        </span>
      </Link>
      {withNote && (
        <span className={`text-sm font-semibold ${noteCls}`}>
          {registration.nextBatchYear} batch opens {registration.nextBatchOpens}
        </span>
      )}
    </span>
  );
}
