'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal room pricing based on real-time demand, seasonality, and competitor rates.
 *
 * - suggestOptimalPricing - A function that takes demand, seasonality, and competitor rates as input and returns a suggested price.
 * - SuggestOptimalPricingInput - The input type for the suggestOptimalPricing function.
 * - SuggestOptimalPricingOutput - The return type for the suggestOptimalPricing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalPricingInputSchema = z.object({
  demand: z
    .string()
    .describe("The current demand for rooms (e.g., 'high', 'medium', 'low')."),
  seasonality: z
    .string()
    .describe("The current season or time of year (e.g., 'summer', 'winter', 'holiday')."),
  competitorRates: z
    .string()
    .describe("A summary of competitor room rates (e.g., 'Competitor A: $100, Competitor B: $120')."),
});
export type SuggestOptimalPricingInput = z.infer<typeof SuggestOptimalPricingInputSchema>;

const SuggestOptimalPricingOutputSchema = z.object({
  suggestedPrice: z
    .number()
    .describe("The suggested optimal room price based on demand, seasonality, and competitor rates."),
  reasoning: z
    .string()
    .describe("The reasoning behind the suggested price."),
});
export type SuggestOptimalPricingOutput = z.infer<typeof SuggestOptimalPricingOutputSchema>;

export async function suggestOptimalPricing(
  input: SuggestOptimalPricingInput
): Promise<SuggestOptimalPricingOutput> {
  return suggestOptimalPricingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalPricingPrompt',
  input: {schema: SuggestOptimalPricingInputSchema},
  output: {schema: SuggestOptimalPricingOutputSchema},
  prompt: `You are an experienced hotel revenue manager. Based on the current demand, seasonality, and competitor rates, suggest an optimal room price.

Demand: {{{demand}}}
Seasonality: {{{seasonality}}}
Competitor Rates: {{{competitorRates}}}

Consider all these factors carefully to suggest a price that maximizes revenue while remaining competitive. Explain the reasoning behind your suggestion.

Output the suggested price as a number.
`,
});

const suggestOptimalPricingFlow = ai.defineFlow(
  {
    name: 'suggestOptimalPricingFlow',
    inputSchema: SuggestOptimalPricingInputSchema,
    outputSchema: SuggestOptimalPricingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
