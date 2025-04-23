import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left sidebar skeleton */}
      <div className="w-80 border-r">
        <div className="flex items-center justify-between border-b p-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="p-4">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="mb-4 flex items-start">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="ml-3 flex-1">
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Middle section skeleton */}
      <div className="flex flex-1 flex-col border-r">
        <div className="flex items-center border-b p-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="ml-2">
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex-1 p-4">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className={`mb-4 flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                {i % 2 === 0 && <Skeleton className="mr-2 h-8 w-8 rounded-full" />}
                <div className="w-2/3">
                  <Skeleton className="mb-1 h-24 rounded-lg" />
                  <div className="flex justify-end">
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="border-t p-4">
          <div className="flex items-center">
            <Skeleton className="mr-2 h-8 w-8 rounded-full" />
            <Skeleton className="mr-2 h-8 w-8 rounded-full" />
            <Skeleton className="mx-2 h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right sidebar skeleton */}
      <div className="w-96">
        <Skeleton className="h-40 w-full" />
        <div className="p-4">
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="mb-4 h-4 w-64" />

          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="mb-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Skeleton className="mb-1 h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex-1">
                    <Skeleton className="mb-1 h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            ))}

          <Skeleton className="mb-4 h-4 w-full" />

          <div className="grid grid-cols-2 gap-2">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
          </div>

          <Skeleton className="mb-4 mt-4 h-4 w-full" />

          <div className="flex gap-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
