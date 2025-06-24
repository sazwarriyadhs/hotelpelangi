"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, BedDouble, UtensilsCrossed, Sparkles, DollarSign, Cog } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { href: "/", labelKey: "sidebar.dashboard", icon: LayoutDashboard },
  { href: "/availability", labelKey: "sidebar.availability", icon: CalendarCheck },
  { href: "/reservations", labelKey: "sidebar.reservations", icon: BedDouble },
  { href: "/menu", labelKey: "sidebar.menu", icon: UtensilsCrossed },
  { href: "/resort", labelKey: "sidebar.resort", icon: Sparkles, comingSoon: true },
  { href: "/pricing", labelKey: "sidebar.pricing", icon: DollarSign },
  { href: "/settings", labelKey: "sidebar.settings", icon: Cog },
];

export function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { t } = useTranslation();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: t(item.labelKey), side: "right", align: "center" }}
            className="justify-start"
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span className="min-w-0">{t(item.labelKey)}</span>
              {item.comingSoon && state === "expanded" && (
                  <Badge variant="secondary" className="ml-auto">{t('sidebar.soon')}</Badge>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
