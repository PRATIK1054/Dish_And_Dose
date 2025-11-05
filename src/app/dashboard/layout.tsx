"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Clock,
  LayoutDashboard,
  Pill,
  QrCode,
  ShieldAlert,
  UtensilsCrossed,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  {
    href: "/dashboard/interaction-check",
    icon: ShieldAlert,
    label: "Interaction Check",
  },
  { href: "/dashboard/medications", icon: Pill, label: "My Medications" },
  { href: "/dashboard/reminders", icon: Clock, label: "Reminders" },
  { href: "/dashboard/scan", icon: QrCode, label: "Scan Prescription" },
  { href: "/dashboard/education", icon: BookOpen, label: "Learn" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 shrink-0 bg-primary/20 text-primary"
            >
              <UtensilsCrossed size={18} />
            </Button>
            <h1 className="text-xl font-bold text-foreground font-headline group-data-[collapsible=icon]:hidden">
              Dish And Dose
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/profile"}
                tooltip={{ children: "Profile" }}
              >
                <Link href="/dashboard/profile">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://picsum.photos/seed/user/40/40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="group-data-[collapsible=icon]:hidden">User Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 bg-card md:hidden">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold font-headline">Dish And Dose</h1>
          </div>
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4 overflow-auto md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
