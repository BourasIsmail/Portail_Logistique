import React, { useState } from "react";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { TicketsIcon, TicketPlusIcon } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Mes Demandes",
      url: "/dashboard/tickets",
      icon: TicketsIcon,
      isActive: true,
    },
    {
      title: "Créer Demande",
      url: "/dashboard/create-ticket",
      icon: TicketPlusIcon,
    },
  ],
};

export default function Dashboard({ children, ...props }) {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetails === null) {
      console.log("redirecting to login page from Dashboard");
      return navigate("/login", { replace: true });
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <div className={"[--header-height:calc(--spacing(14))] "} {...props}>
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar data={data} className="" />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
