import type { Transaction } from '@/lib/types';

let transactionId = 1;

const users = [
  { name: 'Ankush PK' },
  { name: 'Ankush PK' },
  { name: 'Ankush PK' },
  { name: 'Ankush PK' },
  { name: 'Ankush PK' },
];

const locations = ['Mumbai, MH', 'Delhi, DL', 'Bengaluru, KA', 'Chennai, TN', 'Online'];
const categories: Transaction['category'][] = ['Retail', 'Food', 'Travel', 'Entertainment', 'Utilities', 'Other'];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const createRandomTransaction = (): Transaction => {
  const user = getRandom(users);
  
  // Explicitly typing this variable ensures the status 'Healthy' is accepted
  const baseTransaction: Transaction = {
    id: `txn_${transactionId++}`,
    user: {
      name: user.name,
      avatarFallback: user.name.split(' ').map(n => n[0]).join(''),
    },
    amount: parseFloat((Math.random() * 5000 + 500).toFixed(2)),
    location: getRandom(locations),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7)),
    category: getRandom(categories.filter(c => c !== 'Other')) as Transaction['category'],
    type: (Math.random() > 0.8 ? 'Credit' : 'Debit') as 'Credit' | 'Debit',
    status: 'Healthy' as const, // Fixed: Cast as literal type
  };

  return baseTransaction;
};

// Create specific mutation examples
const mutationHighAmount: Transaction = {
  id: 'txn_mutation_1',
  user: { name: 'Ankush PK', avatarFallback: 'AP' },
  amount: 185000.00,
  location: 'Bengaluru, KA',
  timestamp: new Date(Date.now() - 1000 * 60 * 5),
  category: 'Retail',
  type: 'Debit',
  status: 'Mutation' as const, // Fixed: Cast as literal type
  confidence: 0.98,
  reason: "Drastic spending increase: Amount is 30x the user's average transaction value.",
};

const mutationUnusualLocation: Transaction = {
  id: 'txn_mutation_2',
  user: { name: 'Ankush PK', avatarFallback: 'AG' },
  amount: 4500.00,
  location: 'Kolkata, WB',
  timestamp: new Date(Date.now() - 1000 * 60 * 30),
  category: 'Food',
  type: 'Debit',
  status: 'Mutation' as const,
  confidence: 0.92,
  reason: "Unusual location: User's typical spending is in Delhi and Mumbai.",
};

const mutationUnusualCategory: Transaction = {
  id: 'txn_mutation_3',
  user: { name: 'Ankush PK', avatarFallback: 'RM' },
  amount: 22000.00,
  location: 'Online',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  category: 'Other',
  type: 'Debit',
  status: 'Mutation' as const,
  confidence: 0.85,
  reason: "Unusual purchase category. User primarily spends on Food and Travel.",
};

export const mockTransactions: Transaction[] = [
  mutationHighAmount,
  createRandomTransaction(),
  mutationUnusualLocation,
  createRandomTransaction(),
  createRandomTransaction(),
  mutationUnusualCategory,
  ...Array.from({ length: 9 }, createRandomTransaction)
].sort(
  (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
);