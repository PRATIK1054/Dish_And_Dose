'use server';
/**
 * @fileOverview Provides a daily food suggestion that is safe to consume with the user's medications.
 *
 * - getEntreeOfTheDay - A function that returns a safe food suggestion for the day.
 * - GetEntreeOfTheDayInput - The input type for the getEntreeOfTheDay function.
 * - GetEntreeOfTheDayOutput - The return type for the getEntreeOfTheDay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetEntreeOfTheDayInputSchema = z.object({
  medicationList: z
    .array(z.string())
    .describe('A list of medications the user is currently taking.'),
});
export type GetEntreeOfTheDayInput = z.infer<typeof GetEntreeOfTheDayInputSchema>;

const GetEntreeOfTheDayOutputSchema = z.object({
  entreeSuggestion: z.string().describe('A food suggestion that is safe for the user to consume with their medications.'),
});
export type GetEntreeOfTheDayOutput = z.infer<typeof GetEntreeOfTheDayOutputSchema>;

export async function getEntreeOfTheDay(input: GetEntreeOfTheDayInput): Promise<GetEntreeOfTheDayOutput> {
  return getEntreeOfTheDayFlow(input);
}

const entreeOfTheDayPrompt = ai.definePrompt({
  name: 'entreeOfTheDayPrompt',
  input: {schema: GetEntreeOfTheDayInputSchema},
  output: {schema: GetEntreeOfTheDayOutputSchema},
  prompt: `Suggest a daily food suggestion that is safe to consume with the following medications: {{{medicationList}}}. The suggestion should be a single entree.`,
});

const getEntreeOfTheDayFlow = ai.defineFlow(
  {
    name: 'getEntreeOfTheDayFlow',
    inputSchema: GetEntreeOfTheDayInputSchema,
    outputSchema: GetEntreeOfTheDayOutputSchema,
  },
  async input => {
    const {output} = await entreeOfTheDayPrompt(input);
    return output!;
  }
);
