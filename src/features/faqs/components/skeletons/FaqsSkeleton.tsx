import Skeleton from "@/components/ui/Skeleton";

export default function FaqsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-b border-border-subtle py-3">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
