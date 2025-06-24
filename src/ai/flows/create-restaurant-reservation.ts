'use server';

/**
 * @fileOverview This file defines a Genkit flow for creating a new restaurant reservation.
 *
 * - createRestaurantReservation - A function that takes guest details and booking information and returns a confirmation.
 * - CreateRestaurantReservationInput - The input type for the createRestaurantReservation function.
 * - CreateRestaurantReservationOutput - The return type for the createRestaurantReservation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { v4 as uuidv4 } from 'uuid';

const CreateRestaurantReservationInputSchema = z.object({
  guestName: z.string().describe("The full name of the guest."),
  reservationDate: z.string().describe("The reservation date in ISO 8601 format."),
  reservationTime: z.string().describe("The reservation time (e.g., '19:00')."),
  guests: z.string().describe("The number of guests."),
});
export type CreateRestaurantReservationInput = z.infer<typeof CreateRestaurantReservationInputSchema>;

const CreateRestaurantReservationOutputSchema = z.object({
  success: z.boolean().describe("Whether the booking was successful."),
  message: z.string().describe("A confirmation message for the user."),
  bookingId: z.string().describe("The unique ID for the created reservation."),
});
export type CreateRestaurantReservationOutput = z.infer<typeof CreateRestaurantReservationOutputSchema>;

export async function createRestaurantReservation(
  input: CreateRestaurantReservationInput
): Promise<CreateRestaurantReservationOutput> {
  return createRestaurantReservationFlow(input);
}

const createRestaurantReservationFlow = ai.defineFlow(
  {
    name: 'createRestaurantReservationFlow',
    inputSchema: CreateRestaurantReservationInputSchema,
    outputSchema: CreateRestaurantReservationOutputSchema,
  },
  async (input) => {
    console.log("Processing restaurant reservation:", input);

    const bookingId = `SRN-REST-${uuidv4().slice(0, 6).toUpperCase()}`;
    
    return {
      success: true,
      message: `Restaurant booking for ${input.guestName} has been confirmed.`,
      bookingId: bookingId,
    };
  }
);
