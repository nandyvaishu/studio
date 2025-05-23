
"use client";

import { SubmitFortuneForm } from '@/components/submit-fortune-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Send className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Share Your Wisdom
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          Have a fortune cookie message to share? Submit it here!
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Submit a New Fortune</CardTitle>
          <CardDescription>Your fortune might inspire someone today.</CardDescription>
        </CardHeader>
        <CardContent>
          <SubmitFortuneForm 
            onSubmitSuccess={(submittedFortune) => {
              router.push(`/?newFortune=${encodeURIComponent(submittedFortune)}`);
            }} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
