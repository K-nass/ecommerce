import Skeleton from "@/components/ui/Skeleton";

export default function ContactFormSkeleton() {
  return (
    <div className="space-y-6 max-w-lg">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-12 w-32" />
    </div>
  );
}
