'use server';

/**
 * @fileOverview This file defines a Genkit flow that analyzes a transaction
 * against a user's past transaction history to determine if it represents a
 * financial "Genetic Mutation" and provides a reason for the determination.
 *
 * - provideReasonForMutation - Analyzes a transaction and provides a reason
 *   if it's flagged as a mutation.
 * - ProvideReasonForMutationInput - The input type for the
 *   provideReasonForMutation function.
 * - ProvideReasonForMutationOutput - The return type for the
 *   provideReasonForMutation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideReasonForMutationInputSchema = z.object({
  transaction: z.object({
    userId: z.string().describe('The ID of the user.'),
    amount: z.number().describe('The transaction amount.'),
    location: z.string().describe('The location of the transaction.'),
    timestamp: z.string().describe('The timestamp of the transaction.'),
    category: z.string().describe('The category of the transaction.'),
  }).describe('The new transaction to analyze.'),
  pastTransactions: z.array(z.object({
    userId: z.string().describe('The ID of the user.'),
    amount: z.number().describe('The transaction amount.'),
    location: z.string().describe('The location of the transaction.'),
    timestamp: z.string().describe('The timestamp of the transaction.'),
    category: z.string().describe('The category of the transaction.'),
  })).describe('The 10 most recent transactions for the user.'),
});
export type ProvideReasonForMutationInput = z.infer<typeof ProvideReasonForMutationInputSchema>;

const ProvideReasonForMutationOutputSchema = z.object({
  isMutation: z.boolean().describe('Whether the transaction is a mutation.'),
  confidence: z.number().describe('The confidence level of the mutation determination (0-1).'),
  reason: z.string().describe('The reason for the mutation determination.'),
});
export type ProvideReasonForMutationOutput = z.infer<typeof ProvideReasonForMutationOutputSchema>;

export async function provideReasonForMutation(input: ProvideReasonForMutationInput): Promise<ProvideReasonForMutationOutput> {
  return provideReasonForMutationFlow(input);
}

const provideReasonForMutationPrompt = ai.definePrompt({
  name: 'provideReasonForMutationPrompt',
  input: {schema: ProvideReasonForMutationInputSchema},
  output: {schema: ProvideReasonForMutationOutputSchema},
  prompt: `You are a financial DNA sequencing expert. Analyze the following transaction to determine if it represents a "Genetic Mutation" based on the user's spending rhythm, geography, and timing compared to their past 10 transactions.

New Transaction:
{{json transaction}}

Past Transactions:
{{json pastTransactions}}

Respond ONLY in JSON format:
{
  "isMutation": boolean, // true if the transaction is a mutation, false otherwise
  "confidence": number, // The confidence level of the mutation determination (0-1)
  "reason": string // A clear and concise reason for the determination.
}
`,
});

const provideReasonForMutationFlow = ai.defineFlow(
  {
    name: 'provideReasonForMutationFlow',
    inputSchema: ProvideReasonForMutationInputSchema,
    outputSchema: ProvideReasonForMutationOutputSchema,
  },
  async input => {
    const {output} = await provideReasonForMutationPrompt(input);
    return output!;
  }
);
