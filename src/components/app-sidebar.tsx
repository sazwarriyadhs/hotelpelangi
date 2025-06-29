'use client';

import { SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSidebar } from './ui/sidebar';
import { Hotel } from 'lucide-react';

function SerenityLogo() {
  const { state } = useSidebar();
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        <Hotel className="h-6 w-6 text-primary-foreground" />
      </div>
      <span
        className={cn(
          'font-headline text-2xl font-bold text-primary transition-opacity duration-200',
          state === 'collapsed' ? 'opacity-0' : 'opacity-100'
        )}
      >
        Serenity
      </span>
    </Link>
  );
}

export function AppSidebar() {
  return (
    <>
      <SidebarHeader className="p-4">
        <SerenityLogo />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <MainNav />
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* Can add footer content here if needed */}
      </SidebarFooter>
    </>
  );
}
