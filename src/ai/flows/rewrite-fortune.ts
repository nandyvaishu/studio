
// src/ai/flows/rewrite-fortune.ts
'use server';

/**
 * @fileOverview Rewrites a fortune in a different style.
 *
 * - rewriteFortune - A function that rewrites the fortune in a different style.
 * - RewriteFortuneInput - The input type for the rewriteFortune function.
 * - RewriteFortuneOutput - The return type for the rewriteFortune function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteFortuneInputSchema = z.object({
  fortune: z.string().describe('The original fortune message.'),
  style: z.string().describe('The style to rewrite the fortune in (e.g., humorous, philosophical, cryptic).'),
});
export type RewriteFortuneInput = z.infer<typeof RewriteFortuneInputSchema>;

const RewriteFortuneOutputSchema = z.object({
  rewrittenFortune: z.string().describe('The rewritten fortune message in the specified style.'),
});
export type RewriteFortuneOutput = z.infer<typeof RewriteFortuneOutputSchema>;

export async function rewriteFortune(input: RewriteFortuneInput): Promise<RewriteFortuneOutput> {
  return rewriteFortuneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteFortunePrompt',
  input: {schema: RewriteFortuneInputSchema},
  output: {schema: RewriteFortuneOutputSchema},
  prompt: `Rewrite the following fortune message in a {{{style}}} style:\n\nOriginal Fortune: {{{fortune}}}`,
});

const rewriteFortuneFlow = ai.defineFlow(
  {
    name: 'rewriteFortuneFlow',
    inputSchema: RewriteFortuneInputSchema,
    outputSchema: RewriteFortuneOutputSchema,
  },
  async (input): Promise<RewriteFortuneOutput> => {
    const response = await prompt(input);
    if (!response.output) {
      console.error('Genkit prompt for rewriteFortuneFlow did not return an output. Full response:', JSON.stringify(response, null, 2));
      // Include more details from the response in the error message
      throw new Error(`The AI failed to rewrite the fortune. No output was received from the model. Response details: ${JSON.stringify(response, null, 2)}`);
    }
    return response.output;
  }
);
