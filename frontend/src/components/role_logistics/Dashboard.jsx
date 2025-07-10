import React, { useState } from "react";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import {
  TicketsIcon,
  ArchiveIcon,
  PackageIcon,
  UsersIcon,
  ChartColumnBigIcon,
  TicketPlusIcon,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Demandes",
      url: "/logistics/dashboard/allTickets",
      icon: TicketsIcon,
      isActive: true,
    },
    {
      title: "Parametrage Articles",
      url: "/logistics/dashboard/materials",
      icon: PackageIcon,
      isActive: true,
    },
    {
      title: "Parametrage Entités",
      url: "/logistics/dashboard/entités",
      icon: UsersIcon,
      isActive: true,
    },
    {
      title: "Créer Demande",
      url: "/logistics/dashboard/create-ticket",
      icon: TicketPlusIcon,
    },
    {
      title: "Mes Demandes",
      url: "/logistics/dashboard/tickets",
      icon: TicketsIcon,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Demande Archivée",
      url: "/logistics/dashboard/archive",
      icon: ArchiveIcon,
    },
  ],
};

export default function Dashboard({ children, title, ...props }) {
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
      <div className={"[--header-height:calc(--spacing(14))]"} {...props}>
        <SidebarProvider className="flex flex-col">
          <SiteHeader direction={"/logistics/dashboard"} />
          <div className="flex flex-1">
            <AppSidebar data={data} title={title} className="" />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
                {children}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
