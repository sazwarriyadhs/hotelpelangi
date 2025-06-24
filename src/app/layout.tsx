'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SettingsProvider } from '@/contexts/settings-context';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hotel, Mountain } from 'lucide-react';

const metadata: Metadata = {
  title: 'Serenity Hotel Management',
  description: 'Manage your Hotel, Resort, and Restaurant with ease.',
};

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r">
          <AppSidebar />
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Hotel className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">Serenity</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="/#rooms"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Rooms
          </Link>
          <Link
            href="/#restaurant-booking"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Restaurant
          </Link>
          <Button asChild>
            <Link href="/#booking">Book Now</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Serenity Hotel. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname !== '/';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <SettingsProvider>
          {isAdminPage ? (
            <AdminLayout>{children}</AdminLayout>
          ) : (
            <ClientLayout>{children}</ClientLayout>
          )}
        </SettingsProvider>
        <Toaster />
      </body>
    </html>
  );
}
