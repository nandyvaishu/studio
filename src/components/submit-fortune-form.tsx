
'use client';

import { useState } from 'react';
// useRouter is no longer needed here
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { addFortune } from '@/lib/fortunes';

interface SubmitFortuneFormProps {
  onSubmitSuccess?: () => void;
}

export function SubmitFortuneForm({ onSubmitSuccess }: SubmitFortuneFormProps) {
  const [newFortune, setNewFortune] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // router is removed

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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const trimmedFortune = newFortune.trim();
    addFortune(trimmedFortune);

    toast({
      title: "Fortune Submitted!",
      description: "It's now in the mix for random generation.", // Reverted toast message
    });

    setNewFortune('');
    setIsSubmitting(false);

    // router.push is removed, onSubmitSuccess is called instead
    onSubmitSuccess?.();
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

