import HexTree from "@/components/HexTree";
import Wordmark from "@/components/Wordmark";
import { SITE } from "@/lib/site";

export default function Footer() {
  // Static export: the year is fixed at build time, and every deploy rebuilds.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="page-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <HexTree className="h-7 w-auto" />
          <Wordmark />
        </div>
        <p className="text-sm text-ivory-faint">
          &copy; {year} {SITE.legalName} &middot; {SITE.location}
        </p>
      </div>
    </footer>
  );
}
