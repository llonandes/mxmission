import Reveal from "@/components/Reveal";
import { PinIcon } from "@/components/Icons";
import { location, trip } from "@/lib/site";

export default function LocationMap() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    location.query
  )}&z=12&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location.query
  )}`;

  return (
    <section id="location" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-clay-500">
            Where we serve
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">
            {location.label}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{location.blurb}</p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay-50 text-clay-600">
                <PinIcon className="h-5 w-5" />
              </span>
              <span className="text-ink-soft">
                <strong className="text-ink">{trip.colonia}</strong> · {trip.destination}
              </span>
            </li>
          </ul>

          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-clay-200 px-6 py-3 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-50"
          >
            Open in Google Maps →
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-3xl border border-clay-100 shadow-sm">
            <iframe
              title={`Map of ${location.label}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full sm:h-[420px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
