'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Leaf, Dumbbell, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BookingForm } from '@/components/booking-form';
import { RestaurantBookingForm } from '@/components/restaurant-booking-form';
import { useTranslation } from '@/hooks/use-translation';


const heroSlides = [
  {
    src: "https://placehold.co/1920x1080.png",
    alt: "Luxurious hotel exterior",
    hint: "luxury hotel exterior",
  },
  {
    src: "https://placehold.co/1920x1080.png",
    alt: "Elegant hotel lobby",
    hint: "hotel lobby elegant",
  },
  {
    src: "https://placehold.co/1920x1080.png",
    alt: "Stunning resort pool view",
    hint: "resort swimming pool",
  },
];

const gallerySlides = [
  {
    src: "https://placehold.co/600x400.png",
    alt: "Restaurant dining area",
    hint: "fine dining restaurant",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Spa treatment room",
    hint: "spa therapy room",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Hotel gym with equipment",
    hint: "hotel gym",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "View from a hotel room balcony",
    hint: "hotel balcony view",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Cocktails by the pool",
    hint: "poolside cocktails",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Hotel conference room",
    hint: "conference room",
  },
];


export default function LandingPage() {
    const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="relative w-full h-[90vh]">
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="h-full w-full relative">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      style={{ objectFit: 'cover' }}
                      className="object-cover"
                      data-ai-hint={slide.hint}
                    />
                    <div className="absolute inset-0 bg-black/60 z-10" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
           <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 md:px-6">
            <div className="flex flex-col justify-center items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                  {t('landingPage.heroTitle')}
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  {t('landingPage.heroSubtitle')}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#booking">
                  <Button size="lg">{t('landingPage.bookYourStay')}</Button>
                </Link>
                <Link href="#rooms">
                  <Button variant="secondary" size="lg">
                    {t('landingPage.exploreRooms')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="booking" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <BookingForm />
          </div>
        </section>

        <section id="restaurant-booking" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <RestaurantBookingForm />
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  {t('landingPage.featuresTitle')}
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  {t('landingPage.featuresSubtitle')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('landingPage.featuresDescription')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Feature"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                data-ai-hint="resort spa interior"
              />
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <Leaf className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">{t('resortPage.spa.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('resortPage.spa.description')}
                    </p>
                     <div className="pt-2">
                        <Button asChild variant="secondary">
                           <Link href="/resort">{t('resortPage.spa.action')}</Link>
                        </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Dumbbell className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
                   <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">{t('resortPage.gym.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('resortPage.gym.description')}
                    </p>
                    <div className="pt-2">
                        <Button asChild variant="secondary">
                            <Link href="/resort">{t('resortPage.gym.action')}</Link>
                        </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Waves className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">{t('resortPage.pool.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('resortPage.pool.description')}
                    </p>
                     <div className="pt-2">
                        <Button asChild variant="secondary">
                            <Link href="/resort">{t('resortPage.pool.action')}</Link>
                        </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="rooms" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                {t('landingPage.accommodationsTitle')}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('landingPage.accommodationsSubtitle')}
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt={t('landingPage.deluxeRoomTitle')}
                    width={600}
                    height={400}
                    className="aspect-video rounded-t-lg object-cover"
                    data-ai-hint="deluxe hotel room"
                  />
                  <CardTitle className="pt-4 font-headline">{t('landingPage.deluxeRoomTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {t('landingPage.deluxeRoomDescription')}
                  </p>
                  <Button className="w-full">{t('landingPage.viewDetails')}</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt={t('landingPage.familySuiteTitle')}
                    width={600}
                    height={400}
                    className="aspect-video rounded-t-lg object-cover"
                    data-ai-hint="hotel family suite"
                  />
                  <CardTitle className="pt-4 font-headline">{t('landingPage.familySuiteTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {t('landingPage.familySuiteDescription')}
                  </p>
                  <Button className="w-full">{t('landingPage.viewDetails')}</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt={t('landingPage.presidentialSuiteTitle')}
                    width={600}
                    height={400}
                    className="aspect-video rounded-t-lg object-cover"
                    data-ai-hint="presidential suite hotel"
                  />
                  <CardTitle className="pt-4 font-headline">{t('landingPage.presidentialSuiteTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {t('landingPage.presidentialSuiteDescription')}
                  </p>
                  <Button className="w-full">{t('landingPage.viewDetails')}</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  {t('landingPage.galleryTitle')}
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  {t('landingPage.gallerySubtitle')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('landingPage.galleryDescription')}
                </p>
              </div>
            </div>
            <div className="py-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {gallerySlides.map((slide, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="overflow-hidden rounded-lg">
                          <Image
                            src={slide.src}
                            alt={slide.alt}
                            width={600}
                            height={400}
                            className="aspect-video w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                            data-ai-hint={slide.hint}
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-12 hidden sm:flex" />
                <CarouselNext className="mr-12 hidden sm:flex" />
              </Carousel>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
