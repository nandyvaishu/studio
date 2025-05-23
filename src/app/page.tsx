'use client';
import { useEffect, useState } from 'react';
import { FortuneDisplay } from '@/components/fortune-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Fortune = {
  id: string;
  message: string;
  style: string;
};

export default function HomePage() {
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);

  const fetchFortunes = async () => {
    try {
      const response = await fetch('/api/fortune');
      const data = await response.json();
      setFortunes(data);
      if (data.length > 0) {
        setCurrentFortune(data[Math.floor(Math.random() * data.length)]);
      }
    } catch (error) {
      console.error('Error fetching fortune:', error);
    }
  };

  const fetchAndSetFortune = async () => {
    try {
      const response = await fetch('/api/fortune');
      const data = await response.json();
      setFortunes(data);
      if (data.length > 0) {
        setCurrentFortune(data[Math.floor(Math.random() * data.length)]);
      }
    } catch (error) {
      console.error('Error fetching fortune:', error);
    }

  const generateNewFortune = () => {
    if (fortunes.length > 0) {
      setCurrentFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
    }
  };
  useEffect(() => {
    fetchFortunes();
  }, []);
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
          <CardTitle className="text-2xl text-primary">Your Daily Fortune</CardTitle>
          <CardDescription>A little piece of wisdom, just for you.</CardDescription>
        </CardHeader>
        <CardContent>
          {currentFortune ? (
            <FortuneDisplay fortune={currentFortune} />
          ) : (
            <p>Click "Generate New Fortune" to see your fortune!</p>
          )}
          <div className="mt-4">
            <Button onClick={fetchAndSetFortune}>Generate New Fortune</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
