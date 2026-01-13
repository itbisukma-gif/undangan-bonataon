'use server';

/**
 * @fileOverview Generates design drafts for invitations based on event details and user preferences.
 *
 * - generateDesignDrafts - A function that generates invitation design drafts.
 * - GenerateDesignDraftsInput - The input type for the generateDesignDrafts function.
 * - GenerateDesignDraftsOutput - The return type for the generateDesignDrafts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDesignDraftsInputSchema = z.object({
  eventDetails: z
    .string()
    .describe('Details about the event, including type, date, time, and location.'),
  userPreferences: z
    .string()
    .describe('User preferences for the invitation design, including colors, fonts, and themes.'),
});
export type GenerateDesignDraftsInput = z.infer<typeof GenerateDesignDraftsInputSchema>;

const GenerateDesignDraftsOutputSchema = z.object({
  designDrafts: z.array(
    z.object({
      description: z.string().describe('The description of the design draft.'),
      imageUrl: z.string().describe('URL of the generated design draft image.'),
    })
  ).describe('Array of generated invitation design drafts.'),
});
export type GenerateDesignDraftsOutput = z.infer<typeof GenerateDesignDraftsOutputSchema>;

export async function generateDesignDrafts(input: GenerateDesignDraftsInput): Promise<GenerateDesignDraftsOutput> {
  return generateDesignDraftsFlow(input);
}

const generateDesignDraftsPrompt = ai.definePrompt({
  name: 'generateDesignDraftsPrompt',
  input: {schema: GenerateDesignDraftsInputSchema},
  output: {schema: GenerateDesignDraftsOutputSchema},
  prompt: `You are an AI design assistant that generates invitation design drafts based on event details and user preferences.

  Analyze the event details and user preferences to create visually appealing and relevant design drafts.
  Provide a variety of design options, each with a description and an image URL. Focus on mobile-optimized designs.

  Event Details: {{{eventDetails}}}
  User Preferences: {{{userPreferences}}}
  
  Return three design drafts.`, // Asking for three design drafts
});

const generateDesignDraftsFlow = ai.defineFlow(
  {
    name: 'generateDesignDraftsFlow',
    inputSchema: GenerateDesignDraftsInputSchema,
    outputSchema: GenerateDesignDraftsOutputSchema,
  },
  async input => {
    const {output} = await generateDesignDraftsPrompt(input);
    return output!;
  }
);
