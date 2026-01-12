export type Transaction = {
  id: string;
  user: {
    name: string;
    avatarFallback: string;
  };
  amount: number;
  location: string;
  timestamp: Date;
  category: 'Retail' | 'Food' | 'Travel' | 'Entertainment' | 'Utilities' | 'Other';
  type: 'Credit' | 'Debit';
  status: 'Healthy' | 'Mutation';
  confidence?: number;
  reason?: string;
};
