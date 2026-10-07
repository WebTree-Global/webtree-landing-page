# Design references: recent.design and designeer.xyz

Date: 2026-10-07. Purpose: find techniques for the WebTree tree journey
(parallax silhouette, pinned tree, region highlights) and check the overall
direction against current work. Screenshots were taken at 1440 x 900 and
are not stored in the repository (third-party sites).

## The galleries
- **recent.design**: daily curated feed (Design, Websites, OG Images, Apps).
  About 99 websites; only 4 in Finance (Aave, Topology, Increase, No.10).
- **designeer.xyz**: a link directory of galleries, components, tools and
  132 "Design Engineers", not a site gallery.

## Sites studied
| Site | What is notable | Technique for WebTree |
| --- | --- | --- |
| topology.vc | Dark panels, light 300-weight display, numbered small labels; Principles title pinned left, items stacked right | Pinned statement beside stacked items (**applied** to Philosophy) |
| block.xyz | Holding company; hovering a sub-brand dissolves 3x3 cells with random 0–0.28s delays | Light a region part by part (**applied**, ordered by growth, not random) |
| y-n10.com | Family office; fixed WebGL world, fixed section index | Fixed index; not applied (the tree annotations already act as one) |
| press.stripe.com | Warm near-black like ours, Ivar serif, tick rail for position | Tick rail; not applied, for the same reason |
| heartaerospace.com | Sticky wordmark crossed by content; background absorbs it | Native sticky, no scroll-jacking (**applied**) |
| manifesto.endel.io | Hairline line art on black | Hairline drawing; glow not applied (anti-reference) |
| iteration.design | Very restrained serif page | Confirms the quiet hero |
| narrowdesign.com | Scroll-jacked spiral; ships a vertigo warning | Pitfall to avoid |
| system.studio | Edge-to-edge outlined wordmark, 0.75px stroke, 30% opacity | Hairline silhouette; **offered as an option**, the filled silhouette is kept |

## Pitfalls seen
Scroll-jacking (Topology, Narrow Design), very long WebGL scroll (No.10),
headings overlapping art (Endel).
