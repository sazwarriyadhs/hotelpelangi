'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { BedDouble, Utensils, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


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


export default function LandingPage() {
    const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

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
                  Experience Unmatched Luxury at Serenity Hotel
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Escape to a world of comfort and elegance. Our hotel offers
                  world-class amenities and breathtaking views.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#">
                  <Button size="lg">Book Your Stay</Button>
                </Link>
                <Link href="#">
                  <Button variant="secondary" size="lg">
                    Explore Rooms
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  Everything You Need for a Perfect Stay
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From our elegant rooms to our fine dining, we provide an
                  unforgettable experience.
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
                data-ai-hint="hotel room interior"
              />
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <BedDouble className="mt-1 h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold">Luxurious Rooms</h3>
                    <p className="text-muted-foreground">
                      Spacious and elegantly designed rooms with all modern
                      comforts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Utensils className="mt-1 h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold">Gourmet Dining</h3>
                    <p className="text-muted-foreground">
                      Exquisite dishes prepared by our world-class chefs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Waves className="mt-1 h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold">Infinity Pool</h3>
                    <p className="text-muted-foreground">
                      Relax and unwind by our stunning infinity pool with a view.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="rooms" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                Our Accommodations
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose from a variety of rooms and suites, each designed for
                your comfort.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Deluxe Room"
                    width={600}
                    height={400}
                    className="aspect-video rounded-t-lg object-cover"
                    data-ai-hint="deluxe hotel room"
                  />
                  <CardTitle className="pt-4 font-headline">Deluxe Room</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Perfect for couples or solo travelers, offering comfort and style.
                  </p>
                  <Button className="w-full">View Details</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Family Suite"
                    width={600}
                    height={400}
                    className="aspect-video rounded-t-lg object-cover"
                    data-ai-hint="hotel family suite"
                  />
                  <CardTitle className="pt-4 font-headline">Family Suite</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Spacious suites with multiple beds, ideal for families.
                  </p>
                  <Button className="w-full">View Details</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Presidential Suite"
                    width={600}
                    height={400}
                    className="aspect-video rounded-t-lg object-cover"
                    data-ai-hint="presidential suite hotel"
                  />
                  <CardTitle className="pt-4 font-headline">Presidential Suite</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The ultimate in luxury, with unparalleled views and amenities.
                  </p>
                  <Button className="w-full">View Details</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
