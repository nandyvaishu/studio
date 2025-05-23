
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface FortuneResponse {
  fortune: string;
}

export function FortuneDisplay() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchFortune = useCallback(async (specificFortune?: string | null) => {
    setIsLoading(true);
    setError(null);
    // Clear the query parameter from URL if we are fetching a new random fortune
    // or if a specific one was displayed and now we fetch another.
    if (searchParams.has('newFortune') && !specificFortune) {
      router.replace('/', { scroll: false });
    }

    try {
      if (specificFortune) {
        setFortune(specificFortune);
      } else {
        const response = await fetch('/api/fortune');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: FortuneResponse = await response.json();
        setFortune(data.fortune);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fortune.');
      setFortune(null);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const newFortuneFromQuery = searchParams.get('newFortune');
    if (newFortuneFromQuery) {
      fetchFortune(newFortuneFromQuery);
    } else {
      fetchFortune();
    }
  }, [fetchFortune, searchParams]); // searchParams dependency added to refetch if it changes externally.

  const handleNewFortuneClick = () => {
    // When "New Fortune" is clicked, always fetch a random one, ignoring any query param.
    fetchFortune(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Today's Wisdom</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[80px]">
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          )}
          {error && (
            <div className="flex items-center space-x-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
          {fortune && !isLoading && (
            <p className="text-lg italic text-foreground">"{fortune}"</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleNewFortuneClick} disabled={isLoading} variant="outline" className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            New Fortune
          </Button>
        </CardFooter>
      </Card>

      {fortune && !isLoading && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">JSON Output</CardTitle>
            <CardDescription>For easy parsing or integration.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm text-muted-foreground">
              <code>{JSON.stringify({ fortune }, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
