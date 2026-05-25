// Single source of truth for all mission-trip content.
// Sourced & verified from stmarymissiontrip.com (2026 trip).

export const trip = {
  name: "Saint Mary's Mexican Mission Trip",
  year: 2026,
  destination: "Tijuana, Mexico",
  colonia: "Colonia La Morita",
  startDate: "2026-06-14",
  endDate: "2026-06-20",
  dateLabel: "June 14 – 20, 2026",
  duration: "6 nights · 5 days",
  includes: ["All meals", "Round-trip transportation", "Lodging for 6 nights"],
} as const;

export const pricing = {
  youth: { label: "Teens (8th–12th grade)", amount: 250 },
  adult: { label: "Adults (18+)", amount: 780 },
  scholarships: true,
} as const;

export const eligibility = [
  "Open to teens entering 9th grade through graduated 12th graders — you must be at least an 8th-grade graduate to attend.",
  "Open to adults 18 and older.",
  "No construction experience needed — we'll teach you everything on site.",
] as const;

// "Build a Future. Build a Home." — core pillars of the trip.
export const pillars = [
  {
    title: "Build a Home",
    body: "Working side by side with families in Colonia La Morita, we frame, raise, and finish simple homes that give a family a safe, dry place to live.",
    icon: "home",
  },
  {
    title: "Build a Future",
    body: "A home changes everything — children stay in school, parents find stable work, and a whole community grows stronger one rooftop at a time.",
    icon: "sun",
  },
  {
    title: "Build Teamwork",
    body: "Teens and adults serve shoulder to shoulder. You'll leave with new skills, lifelong friendships, and a faith put into action.",
    icon: "users",
  },
] as const;

export const includedDetails = [
  "Six nights of group lodging",
  "All meals throughout the trip",
  "Round-trip transportation from Saint Mary's",
  "Building materials and tools",
  "Experienced trip leaders & on-site guidance",
] as const;

// Prep / formation meetings leading up to the trip.
export const keyDates = [
  { date: "2026-03-19", label: "March 19", time: "7:00 PM", place: "Youth Center", note: "Info & orientation meeting" },
  { date: "2026-04-16", label: "April 16", time: "7:00 PM", place: "Youth Center", note: "Team meeting & planning" },
  { date: "2026-05-20", label: "May 20", time: "7:00 PM", place: "Serra Cottage", note: "Mandatory for adults" },
  { date: "2026-05-27", label: "May 27", time: "7:00 PM", place: "Serra Cottage", note: "Final meeting — all participants" },
  { date: "2026-06-14", label: "June 14", time: "", place: "Departure", note: "We leave for Tijuana" },
] as const;

export const contacts = [
  { name: "Afonso Almeida", role: "Trip Coordinator", phone: "(408) 482-2220", lang: "" },
  { name: "Clorete Almeida", role: "Registration", phone: "(408) 482-0554", lang: "English" },
  { name: "Fernando López", role: "Registration", phone: "(408) 931-0670", lang: "English / Español" },
] as const;

export const email = "stmp-mexico-mission-info@googlegroups.com";

// Photos from past trips (sourced from the parish's existing site).
export const heroPhoto = {
  src: "/photos/mission-1.jpeg",
  alt: "Volunteers in hard hats raising a wooden roof frame together",
};

export const gallery = [
  {
    src: "/photos/mission-6.jpg",
    alt: "The full mission team on the steps in red 'Here 2 Serve' shirts",
    caption: "Here to serve — the whole team, ready to work.",
    span: true, // featured / wider tile
  },
  {
    src: "/photos/mission-2.jpeg",
    alt: "Volunteers and a local family in front of a newly finished home",
    caption: "Handing the keys to a family, in front of their new home.",
  },
  {
    src: "/photos/mission-4.jpeg",
    alt: "Close-up of volunteers hammering a wooden floor frame",
    caption: "Hammer in hand — learning to build on site.",
  },
  {
    src: "/photos/mission-3.jpeg",
    alt: "Youth volunteers smiling with a local child, mountains behind",
    caption: "Friendships that cross the border.",
  },
  {
    src: "/photos/mission-5.jpeg",
    alt: "Volunteers preparing meals together indoors",
    caption: "Meals shared together, every day of the trip.",
  },
] as const;

// Full photo archive (everything we have, including the hero shot). Used on /archive.
export const archivePhotos = [
  {
    src: "/photos/mission-1.jpeg",
    alt: "Volunteers in hard hats raising a wooden roof frame together",
    caption: "Raising a roof, hand over hand.",
  },
  ...gallery.map(({ src, alt, caption }) => ({ src, alt, caption })),
] as const;

// Videos for the archive. The source site had no real footage (only a decorative
// graphic), so this starts empty. Add entries as { src | youTubeId, poster?, title }.
export type ArchiveVideo =
  | { kind: "file"; src: string; poster?: string; title: string }
  | { kind: "youtube"; youTubeId: string; title: string };

export const videos: ArchiveVideo[] = [];

// Official application forms hosted on the parish's existing site.
export const applicationForms = [
  {
    label: "Youth application (8th–12th grade)",
    href: "https://www.stmarymissiontrip.com/_files/ugd/b2e33f_4e06b0fe4dbf435c90e7cfe7ec522726.docx?dn=Mexican%20Mission%20youth%20application_v1.docx",
  },
  {
    label: "Adult application (18+)",
    href: "https://www.stmarymissiontrip.com/_files/ugd/b2e33f_85e727c6bec34fcb9c77dfbafcd5e0dc.docx?dn=Mexico%20Mission%20Adult%20application_v1.docx",
  },
] as const;

// Map: the mission works in Colonia La Morita, on the east side of Tijuana.
export const location = {
  query: "Colonia La Morita, Tijuana, Baja California, Mexico",
  label: "Colonia La Morita, Tijuana",
  blurb:
    "We work in Colonia La Morita, a hillside neighborhood on the east side of Tijuana — about a 30-minute drive south of the San Diego border crossing.",
};

export const faqs = [
  {
    q: "Do I need a passport?",
    a: "Yes. All participants need a valid passport (or passport card) to cross the U.S.–Mexico border. Make sure yours is current well before June.",
  },
  {
    q: "Do I need construction experience?",
    a: "Not at all. Most volunteers have never built anything before. Experienced leaders guide every step, and there's a job for every skill level.",
  },
  {
    q: "What's included in the cost?",
    a: "Your fee covers six nights of lodging, all meals, round-trip transportation, building materials, and trip leadership. Scholarships are available — just ask.",
  },
  {
    q: "Can teens attend without a parent?",
    a: "Yes. Teens 8th-grade-graduate and up may attend with the group. The May 20 meeting is mandatory for adults, and the May 27 meeting is for everyone.",
  },
  {
    q: "Is it safe?",
    a: "We travel as a supervised group, stay in secure group lodging, and have led this trip for years. Safety briefings happen at the pre-trip meetings.",
  },
] as const;
