
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
// Removed direct import of addFortune: import { addFortune } from '@/lib/fortunes';

interface SubmitFortuneFormProps {
  onSubmitSuccess?: (submittedFortune: string) => void;
}

export function SubmitFortuneForm({ onSubmitSuccess }: SubmitFortuneFormProps) {
  const [newFortune, setNewFortune] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFortune.trim()) {
      toast({
        title: "Empty Fortune",
        description: "Please write a fortune before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const trimmedFortune = newFortune.trim();

    try {
      const response = await fetch('/api/fortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fortune: trimmedFortune }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit fortune');
      }

      // const responseData = await response.json(); // Contains { message: '...', fortune: '...' }

      toast({
        title: "Fortune Submitted!",
        description: "It's now in the mix and you'll be redirected.",
      });

      setNewFortune('');
      onSubmitSuccess?.(trimmedFortune);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="newFortune">Your Fortune Message</Label>
        <Textarea
          id="newFortune"
          value={newFortune}
          onChange={(e) => setNewFortune(e.target.value)}
          placeholder="Enter your fortune here... e.g., 'A kind word can change someone's entire day.'"
          rows={4}
          className="resize-none"
          disabled={isSubmitting}
        />
         <p className="text-xs text-muted-foreground">
          Fortunes should be concise and generally positive or thought-provoking.
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto gap-2">
        <Send className={`h-4 w-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
        {isSubmitting ? 'Submitting...' : 'Submit Fortune'}
      </Button>
    </form>
  );
}
