import type { Metadata, Viewport } from "next";
import { Archivo, Spectral } from "next/font/google";
import "@/app/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

/* Variable width axis: body text uses the normal width, labels the
   expanded cut (see the `label` utility in globals.css). */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/* Vercel sets the production domain at build time; local builds fall back
   to the project's default domain. */
const siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "webtree-landing-page.vercel.app"}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${SITE.name}`,
    default: `${SITE.name} — Strategic capital, technology and ventures`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0b08",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${archivo.variable}`}>
      <body>
        <a
          href="#main"
          className="label sr-only z-[60] bg-gold px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
