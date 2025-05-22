'use client';

import { useState } from 'react';
import { rewriteFortune, type RewriteFortuneInput } from '@/ai/flows/rewrite-fortune';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, AlertTriangle, RotateCcw } from 'lucide-react';

const availableStyles = ['Humorous', 'Philosophical', 'Cryptic', 'Poetic', 'Sarcastic', 'Formal', 'Childlike'];

export function StyleShifterForm() {
  const [originalFortune, setOriginalFortune] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(availableStyles[0]);
  const [rewrittenFortune, setRewrittenFortune] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalFortune.trim()) {
      toast({
        title: "Input Missing",
        description: "Please enter a fortune to rewrite.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setRewrittenFortune(null);

    try {
      const input: RewriteFortuneInput = {
        fortune: originalFortune,
        style: selectedStyle,
      };
      const result = await rewriteFortune(input);
      setRewrittenFortune(result.rewrittenFortune);
      toast({
        title: "Fortune Rewritten!",
        description: `Style: ${selectedStyle}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to rewrite fortune.';
      setError(errorMessage);
      toast({
        title: "Error Rewriting Fortune",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalFortune('');
    setSelectedStyle(availableStyles[0]);
    setRewrittenFortune(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="originalFortune">Original Fortune</Label>
        <Textarea
          id="originalFortune"
          value={originalFortune}
          onChange={(e) => setOriginalFortune(e.target.value)}
          placeholder="Enter the fortune you want to transform..."
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="styleSelect">Choose a Style</Label>
        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
          <SelectTrigger id="styleSelect">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            {availableStyles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto flex-grow gap-2">
          <Wand2 className={`h-4 w-4 ${isLoading ? 'animate-ping' : ''}`} />
          {isLoading ? 'Shifting Style...' : 'Shift Style'}
        </Button>
         <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading} className="w-full sm:w-auto gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-destructive p-3 bg-destructive/10 rounded-md">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {rewrittenFortune && (
        <Card className="mt-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary">Rewritten Fortune ({selectedStyle})</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic">"{rewrittenFortune}"</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
