import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";

// Admin pages
import AdminDashboardPage from "@/vues/AdminDashboardPage";
import AdminTicketsPage from "@/vues/AdminTicketsPage";
import AdminMaterialsPage from "@/vues/AdminMaterialsPage";
import AdminServcesPage from "@/vues/AdminServicesPage";
import ArchiveDashboardPage from "@/vues/ArchiveDashboardPage";

// Info pages
import InfoDashboardPage from "@/vues/role_info/AdminDashboardPage";
import InfoAllTicketsPage from "@/vues/role_info/AdminTicketsPage";
import InfoMatPage from "@/vues/role_info/AdminMaterialsPage";
import InfoServPage from "@/vues/role_info/AdminServicesPage";
import InfoArchivePage from "@/vues/role_info/ArchiveDashboardPage";
import InfoCreateTicketPage from "@/vues/role_info/CreateTicketPage";
import InfoTicketsPage from "@/vues/role_info/TicketsPage";

// Logistics pages
import LogisticsDashboardPage from "@/vues/role_logistics/AdminDashboardPage";
import LogisticsAllTicketsPage from "@/vues/role_logistics/AdminTicketsPage";
import LogisticsMatPage from "@/vues/role_logistics/AdminMaterialsPage";
import LogisticsServPage from "@/vues/role_logistics/AdminServicesPage";
import LogisticsArchivePage from "@/vues/role_logistics/ArchiveDashboardPage";
import LogisticsCreateTicketPage from "@/vues/role_logistics/CreateTicketPage";
import LogisticsTicketsPage from "@/vues/role_logistics/TicketsPage";

// User pages
import UserDashboardPage from "@/vues/DashboardPage";
import UserTicketsPage from "@/vues/TicketsPage";
import UserCreateTicketPage from "@/vues/CreateTicketPage";

const ROLES = {
  ADMIN: "ROLE_ADMIN",
  INFO: "ROLE_INFO",
  LOGISTICS: "ROLE_LOGISTICS",
  USER: "ROLE_USER",
};

const roleBasedViews = {
  [ROLES.ADMIN]: {
    dashboard: AdminDashboardPage,
    demandes: AdminTicketsPage,
    archive: ArchiveDashboardPage,
    articles: AdminMaterialsPage,
    entitées: AdminServcesPage,
  },
  [ROLES.INFO]: {
    dashboard: InfoDashboardPage,
    demandes: InfoAllTicketsPage,
    articles: InfoMatPage,
    entitées: InfoServPage,
    archive: InfoArchivePage,
    "crée-demande": InfoCreateTicketPage,
    "mes-demandes": InfoTicketsPage,
  },
  [ROLES.LOGISTICS]: {
    dashboard: LogisticsDashboardPage,
    demandes: LogisticsAllTicketsPage,
    articles: LogisticsMatPage,
    entitées: LogisticsServPage,
    archive: LogisticsArchivePage,
    "crée-demande": LogisticsCreateTicketPage,
    "mes-demandes": LogisticsTicketsPage,
  },
  [ROLES.USER]: {
    dashboard: UserDashboardPage,
    "mes-demandes": UserTicketsPage,
    "crée-demande": UserCreateTicketPage,
  },
};

function RoleViewResolver({ page }) {
  const { userDetails } = useAuth();
  const navigate = useNavigate();

  const Component = roleBasedViews[userDetails.role]?.[page];

  if (!Component) return navigate("/", { replace: true });

  return <Component />;
}

export default RoleViewResolver;
