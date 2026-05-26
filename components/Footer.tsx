import Link from "next/link";
import { contacts, email, registration, trip } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-cream/90">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-xl font-bold text-cream">
              St. Mary&apos;s Mexican Mission
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
              Building homes and hope alongside families in {trip.colonia},{" "}
              {trip.destination}.
            </p>
            <p className="mt-4 text-sm font-semibold text-sun-400">{trip.dateLabel}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cream/60">
              Questions? Call us
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {contacts.map((c) => (
                <li key={c.phone}>
                  <a href={`tel:${c.phone.replace(/[^\d]/g, "")}`} className="group block">
                    <span className="font-semibold text-cream group-hover:text-sun-400">
                      {c.phone}
                    </span>
                    <span className="block text-cream/60">
                      {c.name} · {c.role}
                      {c.lang ? ` (${c.lang})` : ""}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cream/60">
              Get involved
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                {registration.open ? (
                  <Link href="/register" className="text-cream hover:text-sun-400">
                    Register for the {trip.year} trip →
                  </Link>
                ) : (
                  <Link href="/register" className="text-cream hover:text-sun-400">
                    <span className="line-through opacity-70">
                      Register for the {trip.year} trip
                    </span>{" "}
                    <span className="font-semibold text-sun-400">· Closed</span>
                  </Link>
                )}
              </li>
              <li className="text-cream/70">
                {registration.nextBatchYear} batch opens {registration.nextBatchOpens}
              </li>
              <li>
                <a href={`mailto:${email}`} className="text-cream hover:text-sun-400 break-all">
                  {email}
                </a>
              </li>
              <li>
                <Link href="/archive" className="text-cream/70 hover:text-sun-400">
                  Photo & video archive
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} Saint Mary&apos;s Mexican Mission Trip. Scholarships available — no one is turned away for cost.
        </div>
      </div>
    </footer>
  );
}
