import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Ticket,
  TicketPlusIcon,
  TicketsIcon,
  LayoutDashboardIcon,
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
} from "@/components/ui/sidebar";

import { useAuth } from "@/utils/AuthProvider";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function AppSidebar({ data, title, ...props }) {
  const { userDetails } = useAuth();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className={"flex justify-center items-center"}
            >
              <Link to="/admin/dashboard">
                <div className="flex items-center justify-end gap-2">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-lg">
                    <LayoutDashboardIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-lg pr-3">
                      {title}
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className={"pb-1.5"}>
        <NavUser user={userDetails} />
      </SidebarFooter>
    </Sidebar>
  );
}
