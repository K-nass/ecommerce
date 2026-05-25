import { cn } from "@/lib/utils";

type BannerArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const rotationClass = direction === "left" ? "rotate-180" : "";

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-5 w-5 text-white", rotationClass)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M8 4l8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BannerArrows({
  onPrevious,
  onNext,
  className,
  previousLabel = "Previous banner",
  nextLabel = "Next banner",
}: BannerArrowsProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-20", className)}>
      <button
        type="button"
        onClick={onPrevious}
        aria-label={previousLabel}
        className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2.5 transition hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2.5 transition hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
