'use client';

import {
  Check,
  X,
  ArrowDownLeft,
  ArrowUpRight,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { categoryIcons } from '@/lib/icons';
import type { Transaction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type TransactionItemProps = {
  transaction: Transaction;
  isNew: boolean;
};

export default function TransactionItem({ transaction, isNew }: TransactionItemProps) {
  const { toast } = useToast();
  const [highlight, setHighlight] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const handleAction = (action: 'Approved' | 'Blocked') => {
    toast({
      title: `Transaction ${action}`,
      description: `Transaction ID ${transaction.id} has been ${action.toLowerCase()}.`,
    });
  };

  const isMutation = transaction.status === 'Mutation';
  const CategoryIcon = categoryIcons[transaction.category] || categoryIcons.Other;

  const TransactionContent = () => (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <CategoryIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <Avatar className="hidden h-10 w-10 sm:flex">
          <AvatarFallback>{transaction.user.avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="font-medium">{transaction.location}</p>
          <p className="text-sm text-muted-foreground">
            {transaction.user.name} &middot;{' '}
            {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="ml-auto text-right">
        <p
          className={cn(
            'font-code text-base font-semibold',
            transaction.type === 'Credit' ? 'text-green-600' : 'text-foreground'
          )}
        >
          {transaction.type === 'Credit' ? '+' : '-'}
          ₹{transaction.amount.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
        </p>
        <Badge
          variant={isMutation ? 'destructive' : 'secondary'}
          className={cn(
            'mt-1',
            !isMutation && 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400'
          )}
        >
          {transaction.status}
        </Badge>
      </div>
       <div className="hidden items-center justify-center md:flex">
         {transaction.type === 'Credit' ? (
           <ArrowUpRight className="h-5 w-5 text-green-500" />
         ) : (
           <ArrowDownLeft className="h-5 w-5 text-red-500" />
         )}
       </div>
    </div>
  );

  return (
    <div className={cn('transition-all duration-1000', highlight ? 'bg-primary/5' : 'bg-transparent')}>
      {isMutation ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={transaction.id} className="border-b-0">
            <AccordionTrigger className="hover:no-underline [&[data-state=open]>div]:bg-destructive/10">
              <TransactionContent />
            </AccordionTrigger>
            <AccordionContent className="bg-destructive/5 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-semibold">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    {transaction.reason} (Confidence:{' '}
                    <span className="font-code font-medium text-destructive">
                      {(transaction.confidence! * 100).toFixed(0)}%
                    </span>
                    )
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction('Approved')}
                    className="bg-background hover:bg-muted"
                  >
                    <Check className="mr-2 h-4 w-4 text-green-500" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction('Blocked')}
                  >
                    <X className="mr-2 h-4 w-4" /> Block
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <TransactionContent />
      )}
    </div>
  );
}
