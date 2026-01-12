
'use client';

import React from 'react';
import DashboardHeader from '@/components/dashboard/header';
import TransactionFeed from '@/components/dashboard/transaction-feed';

export default function TransactionsPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <TransactionFeed />
      </main>
    </div>
  );
}
