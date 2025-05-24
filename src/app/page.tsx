
'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { FortuneDisplay } from '@/components/fortune-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Define Fortune type, can be moved to a shared types file if used elsewhere
export type Fortune = {
  id: string;
  message: string;
  style: string;
};

export default function HomePage() {
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [isLoadingFortunes, setIsLoadingFortunes] = useState(true);
  const searchParams = useSearchParams();

  const fetchFortunes = useCallback(async () => {
    setIsLoadingFortunes(true);
    try {
      const response = await fetch('/api/fortune', { cache: 'no-store' }); // Ensure fresh data
      const responseData = await response.json();
      const data: string[] = responseData.fortunes;

      const mappedFortunes: Fortune[] = data.map((msg, index) => ({
        id: `api-fortune-${index}-${Date.now()}`,
        message: msg,
        style: 'Classy Wisdom'
      }));
      setFortunes(mappedFortunes);

      const newFortuneParam = searchParams.get('newFortune');
      if (newFortuneParam) {
        const submittedFortuneObj: Fortune = {
          id: `submitted-${Date.now()}`,
          message: newFortuneParam,
          style: 'Freshly Added'
        };
        setCurrentFortune(submittedFortuneObj);
      } else if (mappedFortunes.length > 0) {
        setCurrentFortune(mappedFortunes[Math.floor(Math.random() * mappedFortunes.length)]);
      } else {
        setCurrentFortune(null);
      }
    } catch (error) {
      console.error('Error fetching fortunes:', error);
      setCurrentFortune(null); // Handle error state
    } finally {
      setIsLoadingFortunes(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchFortunes();
  }, [fetchFortunes]);

  const generateNewFortune = () => {
    if (fortunes.length > 0) {
      const newRandomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      // Clear the newFortune query param from URL without navigation if we want to prevent re-showing submitted one on refresh
      // For now, just set a new random one. A refresh with query param would show submitted one again.
      // window.history.replaceState({}, '', '/'); // Optional: to clean URL
      setCurrentFortune(newRandomFortune);
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Welcome to FortuneVerse!
        </h1>
        <p className="mt-3 text-base text-foreground/80 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
          Discover your daily fortune, explore AI-powered style transformations, or share your own wisdom with the world.
        </p>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            {currentFortune ? `Your Fortune` : 'Your Daily Fortune'}
          </CardTitle>
          <CardDescription>
            {currentFortune ? `Style: ${currentFortune.style}` : 'A little piece of wisdom, just for you.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingFortunes && !currentFortune && (
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2 mt-2" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          )}
          {!isLoadingFortunes && !currentFortune && fortunes.length === 0 && (
            <p>No fortunes available. Try submitting one to get started!</p>
          )}
          {!isLoadingFortunes && !currentFortune && fortunes.length > 0 && (
             <p>Click "Generate New Fortune" to see your wisdom!</p>
          )}
          
          {currentFortune && <FortuneDisplay fortune={currentFortune} />}
          
          <div className="mt-6">
            <Button 
              onClick={generateNewFortune} 
              disabled={isLoadingFortunes || fortunes.length === 0}
            >
              Generate New Fortune
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
