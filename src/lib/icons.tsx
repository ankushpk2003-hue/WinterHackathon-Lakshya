import {
  ShoppingCart,
  UtensilsCrossed,
  Plane,
  Clapperboard,
  Zap,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import type { Transaction } from './types';

export const categoryIcons: Record<Transaction['category'], LucideIcon> = {
  Retail: ShoppingCart,
  Food: UtensilsCrossed,
  Travel: Plane,
  Entertainment: Clapperboard,
  Utilities: Zap,
  Other: HelpCircle,
};
