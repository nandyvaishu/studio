import { FortuneDisplay } from '@/components/fortune-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
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
          <FortuneDisplay />
        </CardContent>
      </Card>
    </div>
  );
}
