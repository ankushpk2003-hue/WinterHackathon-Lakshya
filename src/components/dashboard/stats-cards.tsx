import {
  ArrowLeftRight,
  Banknote,
  AlertTriangle,
  BadgeCheck,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const stats = [
  {
    title: 'Total Transactions',
    value: '1,234',
    icon: ArrowLeftRight,
    description: '+2.5% from last month',
  },
  {
    title: 'Total Volume',
    value: '₹6,892,345',
    icon: Banknote,
    description: '+10.1% from last month',
  },
  {
    title: 'Mutations Detected',
    value: '42',
    icon: AlertTriangle,
    description: '-5 since last hour',
    isDestructive: true,
  },
  {
    title: 'Approval Rate',
    value: '98.9%',
    icon: BadgeCheck,
    description: 'All systems healthy',
    isHealthy: true,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon
              className={`h-4 w-4 ${
                stat.isDestructive
                  ? 'text-destructive'
                  : stat.isHealthy
                  ? 'text-green-500'
                  : 'text-muted-foreground'
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="font-code text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
