
import { Suspense } from 'react';
import { FortunePageContent } from '@/components/fortune-page-content';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // For skeleton structure

function HomePageSkeleton() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <Skeleton className="h-12 w-3/4 mx-auto mb-3 rounded-md" /> {/* Title */}
        <Skeleton className="h-6 w-full max-w-xl mx-auto rounded-md" /> {/* Subtitle */}
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-1/2 mb-2 rounded-md" /> {/* CardTitle skeleton */}
          <Skeleton className="h-5 w-3/4 rounded-md" /> {/* CardDescription skeleton */}
        </CardHeader>
        <CardContent>
          <div className="space-y-2"> {/* Skeleton for fortune display */}
            <Skeleton className="h-8 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-1/2 mt-2 rounded-md" />
          </div>
          <div className="mt-6">
            <Skeleton className="h-10 w-40 rounded-md" /> {/* Button skeleton */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <FortunePageContent />
    </Suspense>
  );
}
