"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <span key={item.title}>
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="mb-1 last:mb-0"
            >
              <SidebarMenuItem>
                <Link to={item.url}>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <Link to={subItem.url}>
                              <SidebarMenuSubButton asChild>
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
            {items[items.length - 1] !== item && (
              <div className="px-1">
                <SidebarMenuItem className="border-border border" />
              </div>
            )}
          </span>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
