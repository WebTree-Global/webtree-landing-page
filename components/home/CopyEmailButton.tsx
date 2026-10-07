"use client";

import { useEffect, useState } from "react";

/** How long the "Copied" confirmation stays visible (ms). */
const CONFIRMATION_MS = 2000;

/** Copies an email address, for visitors who do not use a mail app. */
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), CONFIRMATION_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be refused; the address stays visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="label text-ivory-faint transition-colors duration-300 hover:text-ivory"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
