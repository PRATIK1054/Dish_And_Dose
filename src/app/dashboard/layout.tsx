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
  Languages,
} from "lucide-react";
import React, { useContext } from 'react';
import { AppContext } from '@/context/app-context';

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
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { dict, lang, setLang } = useContext(AppContext);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: dict.dashboard },
    {
      href: "/dashboard/interaction-check",
      icon: ShieldAlert,
      label: dict.interactionCheck,
    },
    { href: "/dashboard/medications", icon: Pill, label: dict.myMedications },
    { href: "/dashboard/reminders", icon: Clock, label: dict.reminders },
    { href: "/dashboard/scan", icon: QrCode, label: dict.scanPrescription },
    { href: "/dashboard/education", icon: BookOpen, label: dict.learn },
  ];

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
              {dict.title}
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
            <SidebarGroup className="p-0 group-data-[collapsible=icon]:-mt-8">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Label className="px-2 text-xs font-medium text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">{dict.language}</Label>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Select value={lang} onValueChange={setLang}>
                            <SidebarMenuButton asChild variant="outline" className="group-data-[collapsible=icon]:hidden">
                                <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                            </SidebarMenuButton>
                            <SidebarMenuButton asChild tooltip={{children: dict.language}} className="hidden group-data-[collapsible=icon]:flex">
                                <Link href="#">
                                    <Languages />
                                    <span className="sr-only">{dict.language}</span>
                                </Link>
                            </SidebarMenuButton>
                            <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Hindi">हिन्दी (Hindi)</SelectItem>
                                <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
                            </SelectContent>
                        </Select>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/profile"}
                tooltip={{ children: dict.userProfile }}
              >
                <Link href="/dashboard/profile">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://picsum.photos/seed/user/40/40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="group-data-[collapsible=icon]:hidden">{dict.userProfile}</span>
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
            <h1 className="text-xl font-bold font-headline">{dict.title}</h1>
          </div>
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4 overflow-auto md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
