import Image from "next/image";
import Reveal from "@/components/Reveal";
import { gallery } from "@/lib/site";

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
      <Reveal className="max-w-2xl">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-clay-500">
          From past trips
        </span>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink">
          What a week looks like.
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Real photos from Colonia La Morita — the building, the families, and the
          friendships that come home with us.
        </p>
      </Reveal>

      <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] lg:grid-cols-4">
        {gallery.map((photo, i) => (
          <Reveal
            key={photo.src}
            delay={i * 80}
            className={
              "span" in photo && photo.span
                ? "col-span-2 row-span-1 lg:row-span-2"
                : "col-span-1 row-span-1"
            }
          >
            <figure className="group relative h-full w-full overflow-hidden rounded-3xl bg-clay-100 shadow-sm">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium leading-snug text-cream">
                {photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
