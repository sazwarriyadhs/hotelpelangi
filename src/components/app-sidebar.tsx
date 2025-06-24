'use client';

import { SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSidebar } from './ui/sidebar';

function SerenityLogo() {
  const { state } = useSidebar();
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-primary-foreground"
        >
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
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
