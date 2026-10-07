"""Render the favicon, SVG icon, apple icon and Open Graph image.

All four are drawn from lib/tree-geometry.ts, so they match the site's logo.
Run from anywhere after changing the logo geometry, the brand colours or the
headline:

    pip install pillow
    python3 scripts/render-brand-assets.py

The OG image needs Spectral and Archivo. The script downloads them once from
the Google Fonts repository into scripts/.fonts/ (git-ignored).
"""
import math, re, urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parent.parent
FONT_DIR = REPO / 'scripts' / '.fonts'
FONT_URLS = {
    'Spectral-Light.ttf': 'https://github.com/google/fonts/raw/main/ofl/spectral/Spectral-Light.ttf',
    'Archivo.ttf': 'https://github.com/google/fonts/raw/main/ofl/archivo/Archivo%5Bwdth,wght%5D.ttf',
}
FONT_DIR.mkdir(parents=True, exist_ok=True)
for name, url in FONT_URLS.items():
    if not (FONT_DIR / name).exists():
        urllib.request.urlretrieve(url, FONT_DIR / name)
src = open(REPO / 'lib' / 'tree-geometry.ts').read()
BRANCHES = [[tuple(map(float, p.split(','))) for p in pts.split()]
            for pts in re.findall(r'points: "([^"]+)"', src)]
LEAVES = [(float(cx), float(cy), float(r), o) for cx, cy, r, o in
          re.findall(r'cx: ([\d.]+), cy: ([\d.]+), r: (\d+), orientation: "(\w+)"', src)]
STROKE = 7
INK, GOLD, IVORY, IVORY_MUTED, IVORY_FAINT, LINE = '#0d0b08', '#d3c1a8', '#efebe2', '#c0baaf', '#9b9489', '#312d27'

def hex_pts(cx, cy, r, o):
    start = 0 if o == 'flat' else 30
    return [(cx + r*math.cos(math.radians(start + 60*i)), cy + r*math.sin(math.radians(start + 60*i))) for i in range(6)]

def draw_tree(img, x0, y0, scale, colour=GOLD):
    d = ImageDraw.Draw(img)
    for pl in BRANCHES:
        d.line([(x0 + x*scale, y0 + y*scale) for x, y in pl], fill=colour, width=max(1, round(STROKE*scale)), joint='curve')
    for cx, cy, r, o in LEAVES:
        d.polygon([(x0 + x*scale, y0 + y*scale) for x, y in hex_pts(cx, cy, r, o)], fill=colour)

# ── Square icons: gold tree on an ink rounded square. ──
def icon(size, ss=8, radius_frac=0.22, pad_frac=0.12):
    S = size*ss
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(img).rounded_rectangle([0, 0, S-1, S-1], radius=round(S*radius_frac), fill=INK)
    # tree content spans x 10..410, y 14..446 in the 420x460 box
    content_h = 432; content_w = 400
    scale = S*(1 - 2*pad_frac) / content_h
    x0 = (S - content_w*scale)/2 - 10*scale
    y0 = (S - content_h*scale)/2 - 14*scale
    draw_tree(img, x0, y0, scale)
    return img.resize((size, size), Image.LANCZOS)

icon(180, radius_frac=0).save(REPO / 'app' / 'apple-icon.png')  # iOS applies its own mask
icon(48).save(REPO / 'app' / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])

# SVG icon with the same geometry
def fmt(n): return ('%.2f' % n).rstrip('0').rstrip('.')
pad = 0.12; size = 512; scale = size*(1 - 2*pad)/432
x0 = (size - 400*scale)/2 - 10*scale; y0 = (size - 432*scale)/2 - 14*scale
parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">',
         f'<rect width="{size}" height="{size}" rx="{round(size*0.22)}" fill="{INK}"/>',
         f'<g transform="translate({fmt(x0)} {fmt(y0)}) scale({fmt(scale)})">',
         f'<g fill="none" stroke="{GOLD}" stroke-width="{STROKE}">']
for pl in BRANCHES:
    parts.append('<polyline points="' + ' '.join(f'{fmt(x)},{fmt(y)}' for x, y in pl) + '"/>')
parts.append(f'</g><g fill="{GOLD}">')
for cx, cy, r, o in LEAVES:
    parts.append('<polygon points="' + ' '.join(f'{fmt(x)},{fmt(y)}' for x, y in hex_pts(cx, cy, r, o)) + '"/>')
parts.append('</g></g></svg>')
open(REPO / 'app' / 'icon.svg', 'w').write(''.join(parts) + '\n')

# ── Open Graph image, 1200 x 630: the hero in miniature (mark, wordmark, tagline). ──
W, H, SS = 1200, 630, 2
og = Image.new('RGB', (W*SS, H*SS), INK)
d = ImageDraw.Draw(og)
def font(path, size, wdth=None, wght=None):
    f = ImageFont.truetype(path, size*SS)
    if wdth is not None:
        f.set_variation_by_axes([wdth, wght])
    return f

def tracked_width(text, f, tracking_em, size):
    gap = tracking_em*size*SS
    return sum(d.textlength(ch, font=f) for ch in text) + gap*(len(text) - 1)

def tracked_centred(y, text, f, fill, tracking_em, size):
    """Draw letter-spaced text centred on the canvas; y is the top in output px."""
    x = (W*SS - tracked_width(text, f, tracking_em, size)) / 2
    for ch in text:
        d.text((x, y*SS), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + tracking_em*size*SS

TREE_H = 190
scale = TREE_H*SS/432
draw_tree(og, (W*SS - 400*scale)/2 - 10*scale, 70*SS - 14*scale, scale)
tracked_centred(300, 'WEBTREE', font(FONT_DIR / 'Spectral-Light.ttf', 104), IVORY, 0.08, 104)
tracked_centred(436, 'GLOBAL', font(FONT_DIR / 'Archivo.ttf', 24, wdth=115, wght=500), IVORY_FAINT, 0.42, 24)
tracked_centred(520, 'STRATEGIC CAPITAL · SYSTEMATIC EXECUTION', font(FONT_DIR / 'Archivo.ttf', 15, wdth=115, wght=500), IVORY_MUTED, 0.16, 15)
og.resize((W, H), Image.LANCZOS).save(REPO / 'app' / 'opengraph-image.png', optimize=True)
open(REPO / 'app' / 'opengraph-image.alt.txt', 'w').write('WebTree Global — Strategic Capital · Systematic Execution\n')
print(f'Rendered icons and OG image from {len(BRANCHES)} branches and {len(LEAVES)} leaves.')
