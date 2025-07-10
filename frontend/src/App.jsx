import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "./vues/LoginPage";
import MainPage from "./vues/MainPage";
import DashboardPage from "./vues/DashboardPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboardPage from "./vues/AdminDashboardPage";
import AdminTicketsPage from "./vues/AdminTicketsPage";
import {
  useAuth,
  getInfoFromToken,
  getTokenFromCookie,
} from "./utils/AuthProvider";
import TicketsPage from "./vues/TicketsPage";
import CreateTicketPage from "./vues/CreateTicketPage";

import ArchiveDashboardPage from "./vues/ArchiveDashboardPage";
import AdminMaterialsPage from "./vues/AdminMaterialsPage";
import AdminServcesPage from "./vues/AdminServicesPage";

import InfoDashboardPage from "./vues/role_info/AdminDashboardPage";
import InfoMatPage from "./vues/role_info/AdminMaterialsPage";
import InfoServPage from "./vues/role_info/AdminServicesPage";
import InfoAllTicketsPage from "./vues/role_info/AdminTicketsPage";
import InfoCreateTicketPage from "./vues/role_info/CreateTicketPage";
import InfoTicketsPage from "./vues/role_info/TicketsPage";
import InfoArchivePage from "./vues/role_info/ArchiveDashboardPage";

import LogisticsDashboardPage from "./vues/role_logistics/AdminDashboardPage";
import LogisticsMatPage from "./vues/role_logistics/AdminMaterialsPage";
import LogisticsServPage from "./vues/role_logistics/AdminServicesPage";
import LogisticsAllTicketsPage from "./vues/role_logistics/AdminTicketsPage";
import LogisticsCreateTicketPage from "./vues/role_logistics/CreateTicketPage";
import LogisticsTicketsPage from "./vues/role_logistics/TicketsPage";
import LogisticsArchivePage from "./vues/role_logistics/ArchiveDashboardPage";

import { Navigate } from "react-router-dom";

function App() {
  const { userDetails, login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("rendering app");
    if (userDetails === null) {
      const userInfo = getInfoFromToken(getTokenFromCookie());
      if (userInfo) {
        console.log("updating user info from App.jsx");
        console.log(userInfo);
        login(userInfo);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Dashboard routes for admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role={["ROLE_ADMIN"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/tickets"
            element={
              <ProtectedRoute role={["ROLE_ADMIN"]}>
                <AdminTicketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/materials"
            element={
              <ProtectedRoute role={["ROLE_ADMIN"]}>
                <AdminMaterialsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/Entités"
            element={
              <ProtectedRoute role={["ROLE_ADMIN"]}>
                <AdminServcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/archive"
            element={
              <ProtectedRoute role={["ROLE_ADMIN"]}>
                <ArchiveDashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Dashboard routes for users */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role={["ROLE_USER"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tickets"
            element={
              <ProtectedRoute role={["ROLE_USER"]}>
                <TicketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-ticket"
            element={
              <ProtectedRoute role={["ROLE_USER"]}>
                <CreateTicketPage />
              </ProtectedRoute>
            }
          />

          {/* routes for ROLE_info */}
          <Route
            path="/info/dashboard"
            element={
              <ProtectedRoute role={["ROLE_INFO"]}>
                <InfoDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/info/dashboard/allTickets"
            element={
              <ProtectedRoute role={["ROLE_INFO"]}>
                <InfoAllTicketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/info/dashboard/materials"
            element={
              <ProtectedRoute role={["ROLE_INFO"]}>
                <InfoMatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/info/dashboard/Entités"
            element={
              <ProtectedRoute role={["ROLE_INFO"]}>
                <InfoServPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/info/dashboard/archive"
            element={
              <ProtectedRoute role={["ROLE_INFO"]}>
                <InfoArchivePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/info/dashboard/create-ticket"
            element={
              <ProtectedRoute role={["ROLE_INFO"]}>
                <InfoCreateTicketPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/info/dashboard/tickets"
            element={
              <ProtectedRoute role={["ROLE_INFO"]}>
                <InfoTicketsPage />
              </ProtectedRoute>
            }
          />

          {/* routes for ROLE_LOGISTICS */}
          <Route
            path="/logistics/dashboard"
            element={
              <ProtectedRoute role={["ROLE_LOGISTICS"]}>
                <LogisticsDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logistics/dashboard/allTickets"
            element={
              <ProtectedRoute role={["ROLE_LOGISTICS"]}>
                <LogisticsAllTicketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logistics/dashboard/materials"
            element={
              <ProtectedRoute role={["ROLE_LOGISTICS"]}>
                <LogisticsMatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logistics/dashboard/Entités"
            element={
              <ProtectedRoute role={["ROLE_LOGISTICS"]}>
                <LogisticsServPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logistics/dashboard/archive"
            element={
              <ProtectedRoute role={["ROLE_LOGISTICS"]}>
                <LogisticsArchivePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logistics/dashboard/create-ticket"
            element={
              <ProtectedRoute role={["ROLE_LOGISTICS"]}>
                <LogisticsCreateTicketPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logistics/dashboard/tickets"
            element={
              <ProtectedRoute role={["ROLE_LOGISTICS"]}>
                <LogisticsTicketsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
          richColors
          visibleToasts={1}
          duration={2000}
          position="top-center"
          style={{ marginTop: "1rem" }}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
