'use client';

import React from 'react';
import DashboardHeader from '@/components/dashboard/header';
import StatsCards from '@/components/dashboard/stats-cards';
import TransactionFeed from '@/components/dashboard/transaction-feed';

export default function DashboardPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <StatsCards />
        <TransactionFeed />
      </main>
    </div>
  );
}
