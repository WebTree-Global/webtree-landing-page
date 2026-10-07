/** "WEBTREE GLOBAL" set in wide-tracked capitals, as in the original nav. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`label whitespace-nowrap text-[0.8125rem] ${className}`}>
      <span className="font-semibold text-ivory">WebTree</span>{" "}
      <span className="font-normal text-ivory-faint">Global</span>
    </span>
  );
}
