type IconProps = { className?: string };

const base = "currentColor";

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" stroke={base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10.5V20h14v-9.5" stroke={base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5" stroke={base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" stroke={base} strokeWidth="1.8" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" stroke={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.2" stroke={base} strokeWidth="1.8" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke={base} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 19a5.5 5.5 0 0 0-2.2-4.4" stroke={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke={base} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke={base} strokeWidth="1.8" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke={base} strokeWidth="1.8" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7" stroke={base} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.6 12 20 12 20Z" stroke={base} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export const iconMap = {
  home: HomeIcon,
  sun: SunIcon,
  users: UsersIcon,
} as const;
