"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RegisterCta from "@/components/RegisterCta";

const links = [
  { href: "/#about", label: "The Trip" },
  { href: "/#gallery", label: "Photos" },
  { href: "/archive", label: "Archive" },
  { href: "/#location", label: "Location" },
  { href: "/#dates", label: "Key Dates" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages with a dark hero behind the (transparent) header at the top.
  const hasDarkHero = pathname === "/" || pathname === "/archive";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid (cream bg, dark text) once scrolled, or on light-top pages. Otherwise
  // transparent with light text so links stay legible over the dark hero.
  const solid = scrolled || !hasDarkHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-clay-100"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link
          href="/"
          className={`flex items-center gap-2.5 font-display font-extrabold ${
            solid ? "text-ink" : "text-cream"
          }`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay-500 text-cream shadow-sm">
            <HomeMark />
          </span>
          <span className="leading-tight">
            <span className={`block text-sm tracking-wide ${solid ? "text-clay-600" : "text-cream/85"}`}>
              St. Mary&apos;s
            </span>
            <span className="block text-base">Mexican Mission</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                solid
                  ? "text-ink-soft hover:text-clay-600"
                  : "text-cream/90 hover:text-cream"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <RegisterCta tone="light" size="sm" />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`grid h-10 w-10 place-items-center rounded-lg md:hidden ${
            solid ? "text-ink" : "text-cream"
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-clay-100 bg-cream px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-soft hover:bg-clay-50"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2" onClick={() => setOpen(false)}>
              <RegisterCta tone="light" size="lg" block withNote />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HomeMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10.5V20h14v-9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
