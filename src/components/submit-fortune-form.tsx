'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

export function SubmitFortuneForm() {
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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Submitted fortune:', newFortune); // In a real app, send this to a backend

    toast({
      title: "Fortune Submitted!",
      description: "Thank you for sharing your wisdom. (This is a demo submission)",
    });

    setNewFortune('');
    setIsSubmitting(false);
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
