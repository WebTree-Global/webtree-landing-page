# WebTree Global Landing Page

Single-page institutional landing site for Webtree Global Pte. Ltd.

## Stack
- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS v4 (theme tokens in `app/globals.css`)
- No animation library: entrance motion is CSS only

## Structure
```
app/
  layout.tsx              — Root layout, metadata, fonts (next/font)
  page.tsx                — Home page (Hero → About → Philosophy → Contact)
  globals.css             — Colour/type tokens, utilities, entrance animations
  icon.svg, favicon.ico,
  apple-icon.png,
  opengraph-image.png     — Generated from lib/tree-geometry.ts (see below)
components/
  Nav.tsx                 — Fixed header, anchor links, mobile menu (client)
  Footer.tsx              — Mark, wordmark, legal line
  HexTree.tsx             — The logo as SVG: static, animated, or one region highlighted
  Wordmark.tsx            — "WEBTREE GLOBAL" capitals
  SectionHeading.tsx      — Hairline + gold hexagon + title opener for each section
  home/
    Hero.tsx              — Understated: growing tree, wordmark, tagline only
    About.tsx             — About sentence + Capital / Technology / Ventures rows
    Philosophy.tsx        — Statement + three principles
    Contact.tsx           — Email, copy button, location, entity
    CopyEmailButton.tsx   — Clipboard helper (client)
lib/
  site.ts                 — Company facts and nav links
  tree-geometry.ts        — Vector geometry and growth timing of the hex-tree logo
```

## Build & Deploy
```bash
npm run build    # Static export to out/
npm run dev      # Local dev server
```
Vercel deploys `main` to production. Push design work to a branch first so
Vercel builds a preview URL for review.

## Brand
- **Colours:** warm near-black ink `#0d0b08`, ivory text, champagne gold
  `#d3c1a8` (sampled from the logo) as the only accent. Tokens are OKLCH in
  `app/globals.css`.
- **Fonts:** Spectral (light serif, statements and titles), Archivo (body;
  expanded width for capital labels).
- **Logo:** `public/webtree-logo.png` is the raster master. `lib/tree-geometry.ts`
  is its vector redraw; the icons and OG image are rendered from it.
- **Tone:** institutional, subtle, understated. The copy is fixed: keep it
  word for word (see `.impeccable.md` and `tasks/lessons.md`).
