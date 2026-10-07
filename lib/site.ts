/** Company facts and approved copy, shared by sections, footer and metadata. */
export const SITE = {
  name: "WebTree Global",
  legalName: "Webtree Global Pte. Ltd.",
  location: "Singapore",
  email: "hello@webtree.global",
  tagline: "Strategic Capital · Systematic Execution",
  description:
    "Webtree Global Pte. Ltd. — Strategic capital allocation, technology, and venture partnerships. Singapore.",
  shareDescription: "Strategic capital allocation, technology, and venture partnerships.",
} as const;

/** Sections linked from the header, in page order. */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
