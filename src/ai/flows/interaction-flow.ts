'use server';
/**
 * @fileOverview A flow for checking food-drug interactions using the Gemini API.
 *
 * - checkInteraction - A function that takes a drug name and returns potential food interactions.
 * - InteractionInput - The input type for the checkInteraction function.
 * - InteractionOutput - The return type for the checkInteraction function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const InteractionSchema = z.object({
    drugName: z.string().describe('The name of the drug.'),
    foodInteraction: z.string().describe('The food or type of food that interacts with the drug.'),
    mechanismOfAction: z.string().describe('The underlying biological or chemical reason for the interaction between the food and the drug.'),
    recommendation: z.string().describe('The recommendation to manage the interaction.'),
    severity: z.enum(['High', 'Moderate', 'Low', 'Unknown']).describe('The severity of the interaction.'),
});

const InteractionInputSchema = z.object({
  drugName: z.string().describe('The name of the drug to check for interactions.'),
  language: z.string().describe('The language for the output, e.g., "English", "Hindi".')
});

const InteractionOutputSchema = z.object({
    interactions: z.array(InteractionSchema).describe('A list of food-drug interactions found.'),
});

export type InteractionInput = z.infer<typeof InteractionInputSchema>;
export type InteractionOutput = z.infer<typeof InteractionOutputSchema>;
export type Interaction = z.infer<typeof InteractionSchema>;

export async function checkInteraction(input: InteractionInput): Promise<InteractionOutput> {
  return interactionFlow(input);
}

const interactionPrompt = ai.definePrompt({
  name: 'interactionPrompt',
  input: { schema: InteractionInputSchema },
  output: { schema: InteractionOutputSchema },
  prompt: `You are a medical expert specializing in pharmacology and food-drug interactions.
  
  For the given drug name "{{drugName}}", identify potential interactions with food.
  
  Provide a list of interactions. For each interaction, include:
  - The name of the drug.
  - The food or type of food that interacts with it.
  - The mechanism of action for the interaction.
  - A clear recommendation for the user.
  - The severity of the interaction (High, Moderate, Low, or Unknown).

  The entire response, including all fields, must be in the following language: {{language}}.
  
  If you cannot find any interactions, return an empty list. Do not invent interactions.
  Only return information based on reliable medical knowledge.`,
});

const interactionFlow = ai.defineFlow(
  {
    name: 'interactionFlow',
    inputSchema: InteractionInputSchema,
    outputSchema: InteractionOutputSchema,
  },
  async (input) => {
    const { output } = await interactionPrompt(input);
    if (!output) {
        return { interactions: [] };
    }
    return output;
  }
);
