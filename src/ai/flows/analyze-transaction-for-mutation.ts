'use server';

/**
 * @fileOverview Analyzes a transaction for potential fraudulent mutations based on a user's past transaction history.
 *
 * - analyzeTransactionForMutation - A function that analyzes a transaction for mutations.
 * - AnalyzeTransactionInput - The input type for the analyzeTransactionForMutation function.
 * - AnalyzeTransactionOutput - The return type for the analyzeTransactionForMutation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTransactionInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  amount: z.number().describe('The transaction amount.'),
  location: z.string().describe('The transaction location.'),
  timestamp: z.string().describe('The transaction timestamp.'),
  category: z.string().describe('The transaction category.'),
  lastTenTransactions: z.array(z.object({
    amount: z.number(),
    location: z.string(),
    timestamp: z.string(),
    category: z.string(),
  })).describe('The user\'s last 10 transactions.'),
});
export type AnalyzeTransactionInput = z.infer<typeof AnalyzeTransactionInputSchema>;

const AnalyzeTransactionOutputSchema = z.object({
  isMutation: z.boolean().describe('Whether the transaction represents a genetic mutation (fraud).'),
  confidence: z.number().describe('The confidence level of the mutation detection (0-1).'),
  reason: z.string().describe('The reason for the mutation detection.'),
});
export type AnalyzeTransactionOutput = z.infer<typeof AnalyzeTransactionOutputSchema>;

export async function analyzeTransactionForMutation(input: AnalyzeTransactionInput): Promise<AnalyzeTransactionOutput> {
  return analyzeTransactionForMutationFlow(input);
}

const analyzeTransactionPrompt = ai.definePrompt({
  name: 'analyzeTransactionPrompt',
  input: {schema: AnalyzeTransactionInputSchema},
  output: {schema: AnalyzeTransactionOutputSchema},
  prompt: `You are a financial fraud detection expert. You will analyze a new transaction to determine if it represents a "genetic mutation" (fraudulent activity) based on the user\'s past spending behavior.

New Transaction:
Amount: {{{amount}}}
Location: {{{location}}}
Timestamp: {{{timestamp}}}
Category: {{{category}}}

Last 10 Transactions:
{{#each lastTenTransactions}}
- Amount: {{{amount}}}, Location: {{{location}}}, Timestamp: {{{timestamp}}}, Category: {{{category}}}
{{/each}}

Does this new transaction represent a "Genetic Mutation" based on this user\'s spending rhythm, geography, and timing? Answer only in JSON: { isMutation: boolean, confidence: number, reason: string }`,
});

const analyzeTransactionForMutationFlow = ai.defineFlow(
  {
    name: 'analyzeTransactionForMutationFlow',
    inputSchema: AnalyzeTransactionInputSchema,
    outputSchema: AnalyzeTransactionOutputSchema,
  },
  async input => {
    const {output} = await analyzeTransactionPrompt(input);
    return output!;
  }
);
