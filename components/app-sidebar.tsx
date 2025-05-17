"use client";

import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";
import {
  BarChart3,
  Home,
  Inbox,
  Link,
  MessageSquare,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Connect Account",
    icon: Link,
    href: "/connect-account",
  },
  {
    title: "Comments",
    icon: MessageSquare,
    href: "/comments",
  },
  {
    title: "Direct Messages",
    icon: Inbox,
    href: "/messages",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
];

// const businessItems = [
//   {
//     title: "Audience",
//     icon: Users,
//     href: "/audience",
//   },
//   {
//     title: "Campaigns",
//     icon: TrendingUp,
//     href: "/campaigns",
//   },
//   {
//     title: "Shop",
//     icon: ShoppingBag,
//     href: "/shop",
//   },
//   {
//     title: "Settings",
//     icon: Settings,
//     href: "/settings",
//   },
// ]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">
              IM
            </span>
          </div>
          <span className="text-lg font-semibold">Ola AI Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarGroupLabel>Business Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      {/* <SidebarFooter className="p-4">
        <div className="rounded-lg bg-primary/10 p-4">
          <h4 className="font-medium">Upgrade to Pro</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Get advanced analytics and business tools
          </p>
          <Button className="mt-3 w-full" size="sm">
            Upgrade
          </Button>
        </div>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
