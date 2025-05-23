
'use client';

import type { Fortune } from '@/app/page'; // Assuming Fortune type will be exported from page.tsx or a shared types file
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FortuneDisplayProps {
  fortune: Fortune;
}

export function FortuneDisplay({ fortune }: FortuneDisplayProps) {
  if (!fortune) {
    return <p>No fortune to display.</p>;
  }

  return (
    <>
      <p className="text-xl italic text-foreground md:text-2xl">"{fortune.message}"</p>
      <div className="mt-4">
        <Card className="shadow-sm border-border/70">
            <CardHeader className="pb-2">
                <CardTitle className="text-md font-semibold">Fortune Details</CardTitle>
                 <CardDescription>Style: {fortune.style}</CardDescription>
            </CardHeader>
            <CardContent>
                <pre className="p-3 bg-muted/50 rounded-md overflow-x-auto text-xs text-muted-foreground">
                    <code>{JSON.stringify({ id: fortune.id, message: fortune.message, style: fortune.style }, null, 2)}</code>
                </pre>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
