'use client';

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
import { useTranslation } from '@/hooks/use-translation';
import { useSettings } from '@/hooks/use-settings';
import { formatCurrency } from '@/lib/utils';

const recentActivities = [
  {
    name: 'Olivia Martin',
    detailsKey: 'dashboard.recentActivities.olivia',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'OM',
  },
  {
    name: 'Jackson Lee',
    detailsKey: 'dashboard.recentActivities.jackson',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'JL',
  },
  {
    name: 'Isabella Nguyen',
    detailsKey: 'dashboard.recentActivities.isabella',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'IN',
  },
  {
    name: 'William Kim',
    detailsKey: 'dashboard.recentActivities.william',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'WK',
  },
  {
    name: 'Sofia Davis',
    detailsKey: 'dashboard.recentActivities.sofia',
    avatar: 'https://placehold.co/40x40.png',
    avatarFallback: 'SD',
  },
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const { currency } = useSettings();

  const statCards = [
    {
      titleKey: 'dashboard.totalRevenue',
      amount: currency === 'IDR' ? 678478335 : 45231.89,
      descriptionKey: 'dashboard.totalRevenueDesc',
      icon: DollarSign,
    },
    {
      titleKey: 'dashboard.bookings',
      amount: '+2,350',
      descriptionKey: 'dashboard.bookingsDesc',
      icon: Users,
    },
    {
      titleKey: 'dashboard.occupancyRate',
      amount: '76.5%',
      descriptionKey: 'dashboard.occupancyRateDesc',
      icon: BedDouble,
    },
    {
      titleKey: 'dashboard.restaurantCovers',
      amount: '+573',
      descriptionKey: 'dashboard.restaurantCoversDesc',
      icon: UtensilsCrossed,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline md:text-4xl">
          {t('dashboard.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('dashboard.description')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t(card.titleKey)}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof card.amount === 'number' ? formatCurrency(card.amount, currency) : card.amount}
              </div>
              <p className="text-xs text-muted-foreground">
                {t(card.descriptionKey)}
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
              {t('dashboard.recentActivity')}
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
                    {t(activity.detailsKey)}
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
