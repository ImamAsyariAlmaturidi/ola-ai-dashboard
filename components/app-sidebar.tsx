"use client";
import * as React from "react";
import {
  BarChart3,
  BotMessageSquare,
  Command,
  Frame,
  Home,
  icons,
  Inbox,
  LifeBuoy,
  LinkIcon,
  MessageSquare,
  PieChart,
  Send,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { url } from "inspector";

// Use the data structure from the updated file
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: Home,
      url: "/dashboard",
    },
    {
      title: "Connect Account",
      icon: LinkIcon,
      url: "/connect-account",
    },
    {
      title: "Posts & Comments",
      icon: MessageSquare,
      url: "/posts-comments",
    },
    {
      title: "Direct Messages",
      icon: Inbox,
      url: "/messages",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      url: "/analytics",
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Ai Agents",
      url: "ai-agents",
      icon: BotMessageSquare,
    },
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Create a context to track which submenu is open
  const [openSubmenuIndex, setOpenSubmenuIndex] = React.useState<number | null>(
    null
  );

  // Get sidebar state and functions
  const { isMobile, setOpenMobile } = useSidebar();

  // Function to close mobile sidebar
  const handleMenuItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">OLA AI</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        {/* Pass the open submenu state and click handler to NavMain */}
        <NavMain
          items={data.navMain}
          openSubmenuIndex={openSubmenuIndex}
          setOpenSubmenuIndex={setOpenSubmenuIndex}
          onMenuItemClick={handleMenuItemClick}
        />
        <NavProjects
          projects={data.projects}
          onMenuItemClick={handleMenuItemClick}
        />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
          onMenuItemClick={handleMenuItemClick}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* Add SidebarRail for collapsible functionality */}
      <SidebarRail />
    </Sidebar>
  );
}
