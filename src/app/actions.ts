"use server";

import { suggestOptimalPricing, SuggestOptimalPricingOutput } from "@/ai/flows/suggest-optimal-pricing";
import { z } from "zod";

const formSchema = z.object({
  demand: z.string().min(1, "Demand is required."),
  seasonality: z.string().min(1, "Seasonality is required."),
  competitorRates: z.string().min(1, "Competitor rates are required."),
});

type State = {
  data: SuggestOptimalPricingOutput | null;
  error: string | null;
};

export async function getPricingSuggestion(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = formSchema.safeParse({
    demand: formData.get("demand"),
    seasonality: formData.get("seasonality"),
    competitorRates: formData.get("competitorRates"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: "Invalid form data. Please ensure all fields are filled out.",
    };
  }

  try {
    const result = await suggestOptimalPricing(validatedFields.data);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "An unexpected error occurred while fetching the pricing suggestion. Please try again later.",
    };
  }
}
