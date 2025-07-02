import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Routes, Route } from "react-router-dom";
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
import AdminMaterialsPage from "./vues/AdminServicesPage";
import AdminServcesPage from "./vues/AdminServicesPage";

function App() {
  const { userDetails, login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            path="/admin/dashboard/services"
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
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
