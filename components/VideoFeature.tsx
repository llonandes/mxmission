import Link from "next/link";
import Reveal from "@/components/Reveal";
import { videos } from "@/lib/site";

export default function VideoFeature() {
  // Feature the first video (if any); the rest live in the archive.
  const video = videos[0];
  if (!video) return null;

  const src =
    video.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.youTubeId}${
          video.start ? `?start=${video.start}` : ""
        }`
      : undefined;

  return (
    <div className="bg-ink text-cream">
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-sun-400">
              Watch
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold">
              See the trip in motion.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              A few minutes from last summer in Colonia La Morita — the building, the
              families, and the team behind it all.
            </p>
            <Link
              href="/archive"
              className="mt-6 inline-block rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              More photos & videos →
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-cream/15 shadow-lg">
              <div className="aspect-video bg-black">
                {video.kind === "youtube" ? (
                  <iframe
                    className="h-full w-full"
                    src={src}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="h-full w-full"
                    controls
                    preload="metadata"
                    poster={video.poster}
                    src={video.src}
                  />
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
