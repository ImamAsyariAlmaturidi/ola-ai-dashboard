"use client";

import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavMainProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  openSubmenuIndex: number | null;
  setOpenSubmenuIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onMenuItemClick?: () => void;
}

export function NavMain({
  items,
  openSubmenuIndex,
  setOpenSubmenuIndex,
  onMenuItemClick,
  className,
  ...props
}: NavMainProps) {
  const pathname = usePathname();
  const { state } = useSidebar();

  // Handle opening a submenu and closing others
  const handleOpenChange = (index: number, open: boolean) => {
    if (open) {
      setOpenSubmenuIndex(index);
    } else if (openSubmenuIndex === index) {
      setOpenSubmenuIndex(null);
    }
  };

  return (
    <div className={cn("space-y-1", className)} {...props}>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item, index) => {
              const isActive = item.isActive || pathname === item.url;

              if (!item.items?.length) {
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={onMenuItemClick}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  key={index}
                  open={openSubmenuIndex === index}
                  onOpenChange={(open) => handleOpenChange(index, open)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  {state === "expanded" && (
                    <CollapsibleContent>
                      <SidebarMenu className="ml-4 mt-1 border-l border-sidebar-border pl-2">
                        {item.items.map((subItem, subIndex) => (
                          <SidebarMenuItem key={subIndex}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === subItem.url}
                              size="sm"
                              onClick={onMenuItemClick}
                            >
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}
