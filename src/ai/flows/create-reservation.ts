'use server';

/**
 * @fileOverview This file defines a Genkit flow for creating a new hotel reservation.
 *
 * - createReservation - A function that takes guest details and booking information and returns a confirmation.
 * - CreateReservationInput - The input type for the createReservation function.
 * - CreateReservationOutput - The return type for the createReservation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { v4 as uuidv4 } from 'uuid';

const CreateReservationInputSchema = z.object({
  guestName: z.string().describe("The full name of the guest."),
  checkInDate: z.string().describe("The check-in date in ISO 8601 format."),
  checkOutDate: z.string().describe("The check-out date in ISO 8601 format."),
  guests: z.string().describe("The number of guests."),
  roomType: z.string().describe("The type of room being booked (e.g., 'deluxe', 'family', 'presidential')."),
});
export type CreateReservationInput = z.infer<typeof CreateReservationInputSchema>;

const CreateReservationOutputSchema = z.object({
  success: z.boolean().describe("Whether the booking was successful."),
  message: z.string().describe("A confirmation message for the user."),
  bookingId: z.string().describe("The unique ID for the created reservation."),
});
export type CreateReservationOutput = z.infer<typeof CreateReservationOutputSchema>;

export async function createReservation(
  input: CreateReservationInput
): Promise<CreateReservationOutput> {
  return createReservationFlow(input);
}

// For this example, we are not using a prompt and just simulating a booking.
// In a real application, you might use a prompt to check for conflicts,
// suggest alternatives, or confirm details with an AI agent.

const createReservationFlow = ai.defineFlow(
  {
    name: 'createReservationFlow',
    inputSchema: CreateReservationInputSchema,
    outputSchema: CreateReservationOutputSchema,
  },
  async (input) => {
    console.log("Processing reservation:", input);

    // Simulate database interaction and booking creation
    const bookingId = `SRN-${uuidv4().slice(0, 8).toUpperCase()}`;
    
    // Here you would typically add logic to save the reservation to your database.
    // For now, we'll just return a success response.
    
    return {
      success: true,
      message: `Booking for ${input.guestName} has been confirmed.`,
      bookingId: bookingId,
    };
  }
);
