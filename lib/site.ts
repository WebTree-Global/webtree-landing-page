/** Company facts shared by the hero, contact section, footer and metadata. */
export const SITE = {
  name: "WebTree Global",
  legalName: "Webtree Global Pte. Ltd.",
  location: "Singapore",
  email: "hello@webtree.global",
  tagline: "Strategic capital · Systematic execution",
  description:
    "A Singapore holding company for strategic capital allocation, technology and venture partnerships.",
} as const;

/** Sections linked from the header, in page order. */
export const NAV_LINKS = [
  { label: "Focus", href: "#focus" },
  { label: "Principles", href: "#principles" },
  { label: "Contact", href: "#contact" },
] as const;
