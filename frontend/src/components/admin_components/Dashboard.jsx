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
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Tableau de Bord",
      url: "/admin/dashboard",
      icon: ChartColumnBigIcon,
      isActive: true,
    },
    {
      title: "Les Demandes",
      url: "/admin/dashboard/tickets",
      icon: TicketsIcon,
      isActive: true,
    },
    {
      title: "Les Matériels",
      url: "/admin/dashboard/materials",
      icon: PackageIcon,
      isActive: true,
    },
    {
      title: "Les Services",
      url: "/admin/dashboard/services",
      icon: UsersIcon,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Demande Archivée",
      url: "/admin/dashboard/archive",
      icon: ArchiveIcon,
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
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
      <div className={"[--header-height:calc(--spacing(14))]"} {...props}>
        <SidebarProvider className="flex flex-col">
          <SiteHeader direction={"/admin/dashboard"} />
          <div className="flex flex-1">
            <AppSidebar data={data} className="" />
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
