
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, CreditCard } from 'lucide-react';

type IntegrationId = 'booking-com' | 'expedia' | 'agoda' | 'airbnb' | 'trip-com' | 'traveloka';
type PaymentMethodId = 'credit-card' | 'midtrans' | 'xendit' | 'paypal' | 'stripe' | 'pay-at-hotel';

const travelPortals: { id: IntegrationId; name: string; description: string }[] = [
    { id: 'booking-com', name: 'Booking.com', description: 'Global travel fare aggregator.' },
    { id: 'expedia', name: 'Expedia Group', description: 'Online travel shopping company.' },
    { id: 'agoda', name: 'Agoda', description: 'Online travel agency for hotels.' },
    { id: 'airbnb', name: 'Airbnb', description: 'Vacation rentals and experiences.' },
    { id: 'trip-com', name: 'Trip.com', description: 'Global travel service provider.' },
    { id: 'traveloka', name: 'Traveloka', description: 'Southeast Asian travel company.' },
];

const paymentMethods: { id: PaymentMethodId; name: string; description: string }[] = [
    { id: 'credit-card', name: 'Credit/Debit Cards', description: 'Accept Visa, MasterCard, etc.' },
    { id: 'midtrans', name: 'Midtrans Gateway', description: 'Indonesian payment gateway.' },
    { id: 'xendit', name: 'Xendit Gateway', description: 'Indonesian payment gateway.' },
    { id: 'paypal', name: 'PayPal', description: 'International online payments.' },
    { id: 'stripe', name: 'Stripe', description: 'Global online payment processing.' },
    { id: 'pay-at-hotel', name: 'Pay at Hotel', description: 'Allow guests to pay on arrival.' },
];

export default function SettingsPage() {
    const [integrationStatus, setIntegrationStatus] = useState<Record<IntegrationId, boolean>>({
        'booking-com': true,
        'expedia': false,
        'agoda': false,
        'airbnb': false,
        'trip-com': false,
        'traveloka': false,
    });

    const [paymentStatus, setPaymentStatus] = useState<Record<PaymentMethodId, boolean>>({
        'credit-card': true,
        'midtrans': false,
        'xendit': false,
        'paypal': false,
        'stripe': false,
        'pay-at-hotel': true,
    });

    const handleIntegrationChange = (id: IntegrationId, checked: boolean) => {
        setIntegrationStatus(prev => ({ ...prev, [id]: checked }));
    };

    const handlePaymentChange = (id: PaymentMethodId, checked: boolean) => {
        setPaymentStatus(prev => ({ ...prev, [id]: checked }));
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold font-headline md:text-4xl">Settings</h1>
                <p className="text-muted-foreground">
                    Configure integrations and payment methods for your property.
                </p>
            </div>

            <Tabs defaultValue="integrations">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="integrations"><Globe className="mr-2 h-4 w-4" /> Integrations</TabsTrigger>
                    <TabsTrigger value="payments"><CreditCard className="mr-2 h-4 w-4" /> Payments</TabsTrigger>
                </TabsList>
                <TabsContent value="integrations" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Travel Portal Integrations</CardTitle>
                            <CardDescription>Connect your property to popular online travel agencies.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {travelPortals.map(portal => (
                                <div key={portal.id} className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <Label htmlFor={portal.id} className="text-base font-medium">{portal.name}</Label>
                                        <p className="text-sm text-muted-foreground">{portal.description}</p>
                                    </div>
                                    <Switch 
                                        id={portal.id} 
                                        checked={integrationStatus[portal.id]}
                                        onCheckedChange={(checked) => handleIntegrationChange(portal.id, checked)}
                                        aria-label={`Toggle ${portal.name}`} 
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payments" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Payment Method Integration</CardTitle>
                            <CardDescription>Enable or disable payment methods for online bookings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {paymentMethods.map(method => (
                                <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <Label htmlFor={method.id} className="text-base font-medium">{method.name}</Label>
                                        <p className="text-sm text-muted-foreground">{method.description}</p>
                                    </div>
                                    <Switch 
                                        id={method.id} 
                                        checked={paymentStatus[method.id]}
                                        onCheckedChange={(checked) => handlePaymentChange(method.id, checked)}
                                        aria-label={`Toggle ${method.name}`} 
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
