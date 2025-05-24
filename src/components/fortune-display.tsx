
'use client';

import type { Fortune } from '@/types';
import { CardDescription } from '@/components/ui/card';

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
      {fortune.style && (
        <CardDescription className="mt-2 text-sm">
          Style: {fortune.style}
        </CardDescription>
      )}
    </>
  );
}
