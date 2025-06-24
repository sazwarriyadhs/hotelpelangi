import {
  Activity,
  BedDouble,
  DollarSign,
  UtensilsCrossed,
  Users,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OverviewChart } from '@/components/overview-chart';
import { Badge } from '@/components/ui/badge';

const statCards = [
  {
    title: 'Total Revenue',
    amount: '$45,231.89',
    description: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Bookings',
    amount: '+2,350',
    description: '+180.1% from last month',
    icon: Users,
  },
  {
    title: 'Occupancy Rate',
    amount: '76.5%',
    description: '+19% from last month',
    icon: BedDouble,
  },
  {
    title: 'Restaurant Covers',
    amount: '+573',
    description: '+21 from last month',
    icon: UtensilsCrossed,
  },
];

const recentActivities = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    details: 'checked in to Room 204.',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'OM',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    details: 'booked a table for 4.',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'JL',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    details: 'requested late check-out from Suite 3.',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'IN',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    details: 'paid their restaurant bill.',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'WK',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    details: 'checked out from Room 112.',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'SD',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline md:text-4xl">
          Welcome Back, Admin
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a snapshot of your property&apos;s performance today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.amount}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
           <OverviewChart />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.avatar} alt="Avatar" data-ai-hint="person face" />
                  <AvatarFallback>{activity.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
