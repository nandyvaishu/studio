
'use client';

import { useState, useEffect, useCallback } from 'react';
// REMOVED: import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ApiResponse {
  fortunes: string[];
}

export function FortuneDisplay() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // REMOVED: searchParams and router hooks

  const fetchFortune = useCallback(async () => { // REMOVED: specificFortune parameter
    setIsLoading(true);
    setError(null);
    // REMOVED: router.replace logic

    try {
      // REMOVED: if (specificFortune) block
      const response = await fetch('/api/fortune');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data: ApiResponse = await response.json();
      if (data.fortunes && data.fortunes.length > 0) {
        setFortune(data.fortunes[Math.floor(Math.random() * data.fortunes.length)]);
      } else {
        setFortune("No fortunes available at the moment.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fortune.');
      setFortune(null);
    } finally {
      setIsLoading(false);
    }
  }, []); // REMOVED: dependencies on searchParams, router

  useEffect(() => {
    // REMOVED: Logic to read newFortune from query parameters
    fetchFortune();
  }, [fetchFortune]); // REMOVED: dependency on searchParams

  const handleNewFortuneClick = () => {
    fetchFortune(); // Call without null, as specificFortune param is removed
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

