'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TransactionItem from './transaction-item';
import { mockTransactions } from '@/lib/mock-data';
import type { Transaction } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

export default function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Initialize with mock data on the client to avoid hydration errors
    setTransactions(mockTransactions);
  }, []);

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Network Health</CardTitle>
        <CardDescription>
          A real-time feed of all transactions. Mutations are highlighted.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-full">
            <div className="divide-y divide-border">
              {transactions.map((transaction, index) => (
                <TransactionItem key={transaction.id} transaction={transaction} isNew={false} />
              ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
