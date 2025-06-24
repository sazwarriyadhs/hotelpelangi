'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Leaf, Dumbbell, Waves } from "lucide-react";
import Image from "next/image";

const resortServices = [
    {
        id: "spa",
        icon: Leaf,
        image: "https://placehold.co/600x400.png",
        imageHint: "spa massage therapy"
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
        imageHint: "poolside cabana resort"
    },
];

export default function ResortPage() {
  const { t } = useTranslation();

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
          <Card key={service.id} className="overflow-hidden transition-all hover:shadow-xl">
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
            <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{t(`resortPage.${service.id}.title`)}</CardTitle>
                </div>
                <CardDescription className="mb-6">
                    {t(`resortPage.${service.id}.description`)}
                </CardDescription>
                <Button className="w-full">{t(`resortPage.${service.id}.action`)}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
