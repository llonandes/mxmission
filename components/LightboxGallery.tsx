"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type Photo = { src: string; alt: string; caption?: string; span?: boolean };

export default function LightboxGallery({
  items,
  featureFirst = false,
}: {
  items: readonly Photo[];
  featureFirst?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  // Keyboard nav + scroll lock while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  const current = open === null ? null : items[open];

  return (
    <>
      <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
        {items.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-3xl bg-clay-100 shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-clay-300 ${
              (photo.span || (featureFirst && i === 0))
                ? "col-span-2 row-span-1 lg:row-span-2"
                : "col-span-1 row-span-1"
            }`}
            aria-label={`Enlarge photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-transparent" />
            {photo.caption && (
              <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium leading-snug text-cream">
                {photo.caption}
              </span>
            )}
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/40 text-cream opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <ExpandIcon />
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          <NavButton side="left" onClick={(e) => { e.stopPropagation(); go(-1); }} />
          <NavButton side="right" onClick={(e) => { e.stopPropagation(); go(1); }} />

          <figure
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="rounded-2xl object-contain"
                priority
              />
            </div>
            {current.caption && (
              <figcaption className="mt-4 max-w-2xl text-center text-sm text-cream/90">
                {current.caption}
                <span className="ml-2 text-cream/50">
                  ({(open ?? 0) + 1} / {items.length})
                </span>
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden>
        <path
          d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
