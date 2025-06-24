'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Leaf, Dumbbell, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSettings } from "@/hooks/use-settings";
import { formatCurrency } from "@/lib/utils";

const resortServices = [
    {
        id: "spa",
        icon: Leaf,
        image: "https://placehold.co/600x400.png",
        imageHint: "spa massage therapy",
        menu: [
            { id: "balinese-massage", price: { idr: 500000, usd: 35 } },
            { id: "hot-stone", price: { idr: 650000, usd: 45 } },
            { id: "facial", price: { idr: 400000, usd: 28 } }
        ]
    },
    {
        id: "gym",
        icon: Dumbbell,
        image: "https://placehold.co/600x400.png",
        imageHint: "modern hotel gym"
    },
    {
        id: "pool",
        icon: Waves,
        image: "https://placehold.co/600x400.png",
        imageHint: "poolside cabana resort",
        menu: [
            { id: "full-day", price: { idr: 750000, usd: 50 } },
            { id: "half-day", price: { idr: 450000, usd: 30 } }
        ]
    },
];

export default function ResortPage() {
  const { t } = useTranslation();
  const { currency } = useSettings();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline md:text-4xl">{t('resortPage.title')}</h1>
        <p className="text-muted-foreground">
          {t('resortPage.description')}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resortServices.map((service) => (
          <Card key={service.id} className="overflow-hidden transition-all hover:shadow-xl flex flex-col">
             <CardHeader className="p-0">
                <Image
                    src={service.image}
                    alt={t(`resortPage.${service.id}.title`)}
                    width={600}
                    height={400}
                    className="aspect-video w-full object-cover"
                    data-ai-hint={service.imageHint}
                />
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{t(`resortPage.${service.id}.title`)}</CardTitle>
                </div>
                <CardDescription className="mb-6">
                    {t(`resortPage.${service.id}.description`)}
                </CardDescription>
                
                {service.menu && (
                  <Accordion type="single" collapsible className="w-full mb-6">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{t('resortPage.viewMenu')}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pt-2">
                          {service.menu.map((item) => (
                            <li key={item.id} className="flex justify-between text-sm">
                              <span>{t(`resortPage.${service.id}.menu.${item.id}.name`)}</span>
                              <span className="font-semibold">{formatCurrency(currency === 'IDR' ? item.price.idr : item.price.usd, currency)}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/availability">{t(`resortPage.${service.id}.action`)}</Link>
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
