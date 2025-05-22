"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: {
    name: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  onMenuItemClick?: () => void;
}

export function NavProjects({
  projects,
  onMenuItemClick,
  className,
  ...props
}: NavProjectsProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={cn("space-y-1", className)} {...props}>
      <Collapsible
        defaultOpen
        open={open}
        onOpenChange={setOpen}
        className="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              Projects
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === project.url}
                      tooltip={project.name}
                      onClick={onMenuItemClick}
                    >
                      <Link href={project.url}>
                        <project.icon className="h-4 w-4" />
                        <span>{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </div>
  );
}
