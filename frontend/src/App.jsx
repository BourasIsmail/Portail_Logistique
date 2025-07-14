import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import {
  useAuth,
  getInfoFromToken,
  getTokenFromCookie,
} from "./utils/AuthProvider";
import RoleViewResolver from "./utils/RoleViewResolver";

import LoginPage from "./vues/LoginPage";
import MainPage from "./vues/MainPage";
import ProtectedRoute from "./utils/ProtectedRoute";

import GMMainPage from "./gestion_marche/vues/MainPage";
import MarchesPage from "./gestion_marche/vues/marches/page";
import MarchesPerIdPage from "./gestion_marche/vues/marches/id/page";
import BDPage from "./gestion_marche/vues/bons-commande/page";
import BDPerIdPage from "./gestion_marche/vues/bons-commande/id/page";
import ConractPage from "./gestion_marche/vues/contrats/page";
import ContractPerIdPage from "./gestion_marche/vues/contrats/id/page";
import ParametrageGMPage from "./gestion_marche/vues/parametrage/page";
import GMDashboardPage from "./gestion_marche/vues/tableau-de-bord/page";

function gestionDemandeRoutes() {
  return (
    <>
      <Route
        path="/md/dashboard"
        element={
          <ProtectedRoute
            role={["ROLE_ADMIN", "ROLE_INFO", "ROLE_LOGISTICS", "ROLE_USER"]}
          >
            <RoleViewResolver page="dashboard" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/md/demandes"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_INFO", "ROLE_LOGISTICS"]}>
            <RoleViewResolver page="demandes" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/md/articles"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_INFO", "ROLE_LOGISTICS"]}>
            <RoleViewResolver page="articles" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/md/entitées"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_INFO", "ROLE_LOGISTICS"]}>
            <RoleViewResolver page="entitées" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/md/archive"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_INFO", "ROLE_LOGISTICS"]}>
            <RoleViewResolver page="archive" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/md/mes-demandes"
        element={
          <ProtectedRoute role={["ROLE_USER", "ROLE_INFO", "ROLE_LOGISTICS"]}>
            <RoleViewResolver page="mes-demandes" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/md/crée-demande"
        element={
          <ProtectedRoute role={["ROLE_USER", "ROLE_INFO", "ROLE_LOGISTICS"]}>
            <RoleViewResolver page="crée-demande" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/md/*"
        element={
          <ProtectedRoute
            role={["ROLE_USER", "ROLE_INFO", "ROLE_LOGISTICS", "ROLE_ADMIN"]}
          >
            <Navigate to="/md/dashboard" />
          </ProtectedRoute>
        }
      />
    </>
  );
}

function gestionMarcheRoutes() {
  return (
    <>
      <Route
        path="/gm"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <GMMainPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gm/marches"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <MarchesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gm/marches/:id"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <MarchesPerIdPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gm/bons-commande"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <BDPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gm/bons-commande/:id"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <BDPerIdPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gm/contrats"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <ConractPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gm/contrats/:id"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <ContractPerIdPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gm/parametrage"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <ParametrageGMPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gm/tableau-de-bord"
        element={
          <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
            <GMDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gm/*"
        element={
          <ProtectedRoute role={["ROLE_LOGISTICS", "ROLE_ADMIN"]}>
            <Navigate to="/gm" />
          </ProtectedRoute>
        }
      />
    </>
  );
}

function App() {
  const { userDetails, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getInfoFromToken(getTokenFromCookie());
    if (userDetails === null) {
      if (userInfo) {
        console.log("User info form App.jsx", userInfo);
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
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              userDetails &&
              (userDetails?.role == "ROLE_ADMIN" ||
                userDetails?.role == "ROLE_LOGISTICS") ? (
                <MainPage />
              ) : (
                <Navigate to="/md/dashboard" />
              )
            }
          />

          {/* material demande routes */}
          {gestionDemandeRoutes()}

          {/* gestion marchée routes */}
          {gestionMarcheRoutes()}

          <Route path="*" element={<Navigate to="/" />} />
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
