import type { Metadata } from "next";
import Link from "next/link";
import LightboxGallery from "@/components/LightboxGallery";
import { applicationForms, archivePhotos, videos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Archive Library | Saint Mary's Mexican Mission Trip",
  description:
    "Photos and videos from past Saint Mary's mission trips to Tijuana, Mexico.",
};

export default function ArchivePage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="bg-clay-600 text-cream">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-32 sm:pt-40">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cream/70">
            Archive Library
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Moments from the mission
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/90">
            A growing collection of photos and videos from past trips to Colonia La
            Morita. Tap any photo to view it full size.
          </p>
        </div>
      </section>

      {/* Photos */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-ink">
          Photos{" "}
          <span className="text-base font-medium text-ink-soft">
            ({archivePhotos.length})
          </span>
        </h2>
        <div className="mt-8">
          <LightboxGallery items={archivePhotos} />
        </div>
      </section>

      {/* Videos */}
      <section className="border-t border-clay-100 bg-sand bg-grain">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="font-display text-2xl font-bold text-ink">
            Videos{" "}
            <span className="text-base font-medium text-ink-soft">
              ({videos.length})
            </span>
          </h2>

          {videos.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-clay-300 bg-white/60 p-10 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                No videos yet
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
                Have footage from a past trip? Drop the video files in{" "}
                <code className="rounded bg-clay-50 px-1.5 py-0.5 text-clay-700">
                  public/videos
                </code>{" "}
                (or add a YouTube link) and they&apos;ll appear here automatically.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {videos.map((v) => (
                <div
                  key={v.title}
                  className="overflow-hidden rounded-3xl border border-clay-100 bg-white shadow-sm"
                >
                  <div className="aspect-video bg-ink">
                    {v.kind === "youtube" ? (
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${v.youTubeId}${
                          v.start ? `?start=${v.start}` : ""
                        }`}
                        title={v.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        className="h-full w-full"
                        controls
                        preload="metadata"
                        poster={v.poster}
                        src={v.src}
                      />
                    )}
                  </div>
                  <p className="p-4 font-medium text-ink">{v.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application forms */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-ink">Application forms</h2>
        <p className="mt-2 max-w-xl text-ink-soft">
          The official paper forms from the parish, if you&apos;d rather print and
          fill them out by hand. (You can also{" "}
          <Link href="/register" className="font-semibold text-clay-600 hover:text-clay-700">
            register online
          </Link>
          .)
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {applicationForms.map((f) => (
            <a
              key={f.href}
              href={f.href}
              className="inline-flex items-center gap-2 rounded-full border border-clay-200 bg-white px-5 py-3 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-50"
            >
              <DownloadIcon /> {f.label}
            </a>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/" className="text-sm font-semibold text-clay-600 hover:text-clay-700">
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
