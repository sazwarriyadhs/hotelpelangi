"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, BedDouble, UtensilsCrossed, Sparkles, DollarSign, Cog } from "lucide-react";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/availability", label: "Availability", icon: CalendarCheck },
  { href: "/reservations", label: "Reservations", icon: BedDouble },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/resort", label: "Resort Services", icon: Sparkles, comingSoon: true },
  { href: "/pricing", label: "Dynamic Pricing", icon: DollarSign },
  { href: "/settings", label: "Settings", icon: Cog },
];

export function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: item.label, side: "right", align: "center" }}
            className="justify-start"
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span className="min-w-0">{item.label}</span>
              {item.comingSoon && state === "expanded" && (
                  <Badge variant="secondary" className="ml-auto">Soon</Badge>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
