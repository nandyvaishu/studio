import { StyleShifterForm } from '@/components/style-shifter-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function ShifterPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          AI Fortune Shifter
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          Transform fortunes into new styles with the power of AI.
        </p>
      </header>
      
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Rewrite a Fortune</CardTitle>
          <CardDescription>Enter a fortune, pick a style, and see the magic happen!</CardDescription>
        </CardHeader>
        <CardContent>
          <StyleShifterForm />
        </CardContent>
      </Card>
    </div>
  );
}
