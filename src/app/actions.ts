"use server";

import { suggestOptimalPricing, SuggestOptimalPricingOutput } from "@/ai/flows/suggest-optimal-pricing";
import { createReservation, CreateReservationOutput } from "@/ai/flows/create-reservation";
import { z } from "zod";

const pricingFormSchema = z.object({
  demand: z.string().min(1, "Demand is required."),
  seasonality: z.string().min(1, "Seasonality is required."),
  competitorRates: z.string().min(1, "Competitor rates are required."),
});

type PricingState = {
  data: SuggestOptimalPricingOutput | null;
  error: string | null;
};

export async function getPricingSuggestion(
  prevState: PricingState,
  formData: FormData
): Promise<PricingState> {
  const validatedFields = pricingFormSchema.safeParse({
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


const bookingFormSchema = z.object({
  guestName: z.string().min(1, "booking.error.guestNameRequired"),
  checkInDate: z.string().min(1, "booking.error.checkInRequired"),
  checkOutDate: z.string().min(1, "booking.error.checkOutRequired"),
  guests: z.string().min(1, "booking.error.guestsRequired"),
  roomType: z.string().min(1, "booking.error.roomTypeRequired"),
});

type BookingState = {
  data: CreateReservationOutput | null;
  error: string | null;
  message: string | null;
};

export async function createBookingAction(
  prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  const validatedFields = bookingFormSchema.safeParse({
    guestName: formData.get("guestName"),
    checkInDate: formData.get("checkInDate"),
    checkOutDate: formData.get("checkOutDate"),
    guests: formData.get("guests"),
    roomType: formData.get("roomType"),
  });

  if (!validatedFields.success) {
    // Get first error message
    const firstError = validatedFields.error.errors[0].message;
    return {
      data: null,
      error: firstError,
      message: null,
    };
  }
  
  if (new Date(validatedFields.data.checkInDate) >= new Date(validatedFields.data.checkOutDate)) {
      return {
          data: null,
          error: "booking.error.invalidDateRange",
          message: null
      }
  }

  try {
    const result = await createReservation(validatedFields.data);
    if(result.success) {
        return { data: result, error: null, message: result.message };
    } else {
        return { data: null, error: result.message, message: null };
    }
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "booking.error.unexpected",
      message: null,
    };
  }
}
