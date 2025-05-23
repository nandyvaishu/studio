'use server';
/**
 * @fileOverview A Genkit flow to rewrite a given fortune cookie message in a specified style.
 *
 * - rewriteFortune - A function that takes a fortune and a style, and returns the rewritten fortune.
 * - RewriteFortuneInput - The input type for the rewriteFortune function.
 * - RewriteFortuneOutput - The return type for the rewriteFortune function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteFortuneInputSchema = z.object({
  fortune: z.string().describe('The original fortune cookie message to be rewritten.'),
  style: z.string().describe('The style in which the fortune should be rewritten (e.g., Humorous, Philosophical, Cryptic).'),
});
export type RewriteFortuneInput = z.infer<typeof RewriteFortuneInputSchema>;

const RewriteFortuneOutputSchema = z.object({
  rewrittenFortune: z.string().describe('The fortune cookie message rewritten in the specified style.'),
});
export type RewriteFortuneOutput = z.infer<typeof RewriteFortuneOutputSchema>;

export async function rewriteFortune(input: RewriteFortuneInput): Promise<RewriteFortuneOutput> {
  return rewriteFortuneFlow(input);
}

const rewriteFortunePrompt = ai.definePrompt({
  name: 'rewriteFortunePrompt',
  input: {schema: RewriteFortuneInputSchema},
  output: {schema: RewriteFortuneOutputSchema},
  prompt: `Rewrite the following fortune cookie message in a {{style}} style.
Fortune: "{{fortune}}"

Ensure the rewritten fortune is concise and captures the essence of the original, but adapted to the requested style.
`,
});

const rewriteFortuneFlow = ai.defineFlow(
  {
    name: 'rewriteFortuneFlow',
    inputSchema: RewriteFortuneInputSchema,
    outputSchema: RewriteFortuneOutputSchema,
  },
  async (input) => {
    const {output} = await rewriteFortunePrompt(input);
    if (!output) {
      throw new Error('The AI model did not return an output for rewriting the fortune.');
    }
    return output;
  }
);
