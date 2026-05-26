import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import VideoFeature from "@/components/VideoFeature";
import LocationMap from "@/components/LocationMap";
import RegisterCta from "@/components/RegisterCta";
import {
  CalendarIcon,
  CheckIcon,
  HeartIcon,
  PinIcon,
  iconMap,
} from "@/components/Icons";
import {
  contacts,
  deposit,
  eligibility,
  faqs,
  heroPhoto,
  includedDetails,
  keyDates,
  pillars,
  pricing,
  registration,
  requiredDocs,
  trip,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <Gallery />
      <VideoFeature />
      <Impact />
      <Details />
      <LocationMap />
      <Dates />
      <Faq />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-clay-700 text-cream">
      <Image
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(106,43,28,0.94) 0%, rgba(163,56,27,0.82) 42%, rgba(219,90,44,0.40) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-grain opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-32 sm:pt-40">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <PinIcon className="h-4 w-4" /> {trip.colonia}, {trip.destination}
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Build a home.
            <br />
            Build a future.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
            For one week each summer, Saint Mary&apos;s travels to Tijuana to
            build simple homes alongside families who need them most. Come serve,
            grow, and be changed.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
            <RegisterCta tone="dark" size="lg" withNote />
            <Link
              href="#about"
              className="rounded-full border border-cream/40 px-7 py-3.5 text-center font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Learn more
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <Stat icon={<CalendarIcon className="h-5 w-5" />} label="When" value={trip.dateLabel} />
            <Stat icon={<HeartIcon className="h-5 w-5" />} label="Duration" value={trip.duration} />
            <Stat icon={<CheckIcon className="h-5 w-5" />} label="Open to" value="Teens & adults" />
          </dl>
        </div>
      </div>
      <div className="relative h-10 bg-cream [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream/15 text-cream">
        {icon}
      </span>
      <div>
        <dt className="text-xs uppercase tracking-wider text-cream/70">{label}</dt>
        <dd className="font-semibold">{value}</dd>
      </div>
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-20 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-bold uppercase tracking-[0.18em] text-clay-500">
      {children}
    </span>
  );
}

function Pillars() {
  return (
    <Section id="about">
      <Reveal className="max-w-2xl">
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink">
          One week. Three things worth building.
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          No construction experience needed — every volunteer learns on site, and
          there&apos;s a job for every pair of hands.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = iconMap[p.icon];
          return (
            <Reveal key={p.title} delay={i * 120}>
              <article className="group h-full rounded-3xl border border-clay-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-clay-50 text-clay-500 transition-colors group-hover:bg-clay-500 group-hover:text-cream">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Impact() {
  return (
    <div className="bg-teal-600 text-cream">
      <Section id="impact">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>
              <span className="text-sun-400">Making a difference</span>
            </Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold">
              A roof changes everything.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/90">
              In Colonia La Morita, a safe home means children can stay in school,
              parents can hold steady work, and families can put down roots. Every
              house we raise together is built to last — and built with love.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-cream/90">
              Volunteers leave with calloused hands, new friendships, and a faith
              put into action. Most say it&apos;s the most meaningful week of their
              year.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <ImpactStat number="6" unit="nights" caption="serving side by side" />
              <ImpactStat number="100%" unit="meals & travel" caption="included in your fee" />
              <ImpactStat number="8th+" unit="grade" caption="teens welcome to serve" />
              <ImpactStat number="0" unit="turned away" caption="scholarships available" />
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}

function ImpactStat({ number, unit, caption }: { number: string; unit: string; caption: string }) {
  return (
    <div className="rounded-2xl bg-cream/10 p-6 backdrop-blur">
      <div className="font-display text-4xl font-extrabold text-sun-400">{number}</div>
      <div className="text-sm font-semibold uppercase tracking-wide text-cream/80">{unit}</div>
      <p className="mt-2 text-sm text-cream/70">{caption}</p>
    </div>
  );
}

function Details() {
  return (
    <Section id="details">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Cost & details</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">
            What it costs to come.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Your fee covers everything for the week. Don&apos;t let cost stop you —
            scholarships are available for anyone who needs one.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <PriceCard tier={pricing.youth.label} amount={pricing.youth.amount} />
            <PriceCard tier={pricing.adult.label} amount={pricing.adult.amount} featured />
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-clay-200 bg-clay-50 p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay-500 font-display text-sm font-bold text-cream">
              ${deposit.amount}
            </span>
            <p className="text-sm text-ink-soft">
              A <strong className="text-clay-700">${deposit.amount} deposit</strong>{" "}
              holds your spot and counts toward your total fee. It&apos;s refundable
              until{" "}
              <strong className="text-clay-700">{deposit.nonRefundableAfter}</strong>,
              non-refundable after.
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            {eligibility.map((e) => (
              <li key={e} className="flex gap-3 text-sm text-ink-soft">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl border border-clay-100 bg-white p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold text-ink">
              Your fee includes
            </h3>
            <ul className="mt-5 space-y-3">
              {includedDetails.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-600/10 text-teal-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-ink-soft">{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-clay-100 pt-6">
              <h4 className="font-display text-base font-bold text-ink">
                What you&apos;ll need to turn in
              </h4>
              <ul className="mt-4 space-y-2.5">
                {requiredDocs.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm text-ink-soft">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <RegisterCta tone="light" size="lg" block withNote />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function PriceCard({ tier, amount, featured }: { tier: string; amount: number; featured?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        featured ? "border-clay-300 bg-clay-50" : "border-clay-100 bg-white"
      }`}
    >
      <p className="text-sm font-medium text-ink-soft">{tier}</p>
      <p className="mt-2 font-display text-4xl font-extrabold text-ink">${amount}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">all-inclusive</p>
    </div>
  );
}

function Dates() {
  return (
    <div className="bg-sand bg-grain">
      <Section id="dates">
        <Reveal className="max-w-2xl">
          <Eyebrow>Key dates</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">
            Mark your calendar.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Pre-trip meetings help us prepare as a team. The May 20 meeting is
            mandatory for adults; May 27 is for everyone going.
          </p>
        </Reveal>

        <ol className="mt-12 space-y-4">
          {keyDates.map((d, i) => (
            <Reveal key={d.date} delay={i * 80}>
              <li className="flex items-center gap-5 rounded-2xl border border-clay-100 bg-white p-5 shadow-sm">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-clay-500 text-cream">
                  <CalendarIcon className="h-7 w-7" />
                </div>
                <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div>
                    <p className="font-display text-lg font-bold text-ink">{d.label}</p>
                    <p className="text-sm text-ink-soft">{d.note}</p>
                  </div>
                  <p className="text-sm font-medium text-clay-600">
                    {d.time ? `${d.time} · ` : ""}
                    {d.place}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <Eyebrow>Good to know</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">
            Questions, answered.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Still unsure? Call one of our coordinators — we&apos;d love to talk it
            through.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {contacts.map((c) => (
              <li key={c.phone}>
                <a href={`tel:${c.phone.replace(/[^\d]/g, "")}`} className="font-semibold text-clay-600 hover:text-clay-700">
                  {c.phone}
                </a>
                <span className="text-ink-soft">
                  {" "}— {c.name}
                  {c.lang ? ` (${c.lang})` : ""}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="divide-y divide-clay-100 rounded-3xl border border-clay-100 bg-white px-6 shadow-sm">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display font-semibold text-ink marker:content-none">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay-50 text-clay-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ClosingCta() {
  return (
    <div className="bg-clay-600">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center text-cream">
        <Reveal>
          {registration.open ? (
            <>
              <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
                Will you join us this summer?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-cream/90">
                Spots fill up. Reserve yours for {trip.dateLabel} and start
                preparing for a week you&apos;ll never forget.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
                The {trip.year} trip is full.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-cream/90">
                Registration for {trip.dateLabel} is now closed — thank you to
                everyone joining us. The {registration.nextBatchYear} batch opens{" "}
                {registration.nextBatchOpens}; check back then to claim your spot.
              </p>
            </>
          )}
          <div className="mt-8 flex justify-center">
            <RegisterCta tone="dark" size="lg" withNote />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
