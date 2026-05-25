import Link from "next/link";
import Reveal from "@/components/Reveal";
import LightboxGallery from "@/components/LightboxGallery";
import { gallery } from "@/lib/site";

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-clay-500">
            From past trips
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">
            What a week looks like.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Real photos from Colonia La Morita — the building, the families, and the
            friendships that come home with us. Tap any photo to enlarge.
          </p>
        </div>
        <Link
          href="/archive"
          className="rounded-full border border-clay-200 px-5 py-2.5 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-50"
        >
          View full archive →
        </Link>
      </Reveal>

      <Reveal className="mt-12">
        <LightboxGallery items={gallery} />
      </Reveal>
    </section>
  );
}
