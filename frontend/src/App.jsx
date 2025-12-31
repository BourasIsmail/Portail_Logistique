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
import AOPage from "./gestion_marche/vues/appel-offre/page";
import AOByIdPage from "./gestion_marche/vues/appel-offre/id/page";

import ParcAutoLayout from "./gestion_parc_auto/pages/ParcAutoLayout";
import VehiculesList from "./gestion_parc_auto/pages/VehiculesList";
import VehiculeForm from "./gestion_parc_auto/pages/VehiculeForm";
import VehiculeEditForm from "./gestion_parc_auto/pages/VehiculeEditForm";
import ChauffeursList from "./gestion_parc_auto/pages/ChauffeursList";
import ChauffeurForm from "./gestion_parc_auto/pages/ChauffeurForm";
import ChauffeurEditForm from "./gestion_parc_auto/pages/ChauffeurEditForm";
import MissionsList from "./gestion_parc_auto/pages/MissionsList";
import MissionForm from "./gestion_parc_auto/pages/MissionForm";
import MissionEditForm from "./gestion_parc_auto/pages/MissionEditForm";
import { NotificationProvider } from "./utils/NotificationProvider";
import NotificationsPage from "./gestion_parc_auto/pages/NotificationsPage";

import DepensesList from "./gestion_parc_auto/pages/DepensesList";
import MoyensPaiementList from "./gestion_parc_auto/pages/MoyensPaiementList";
import DepenseForm from "./gestion_parc_auto/pages/DepenseForm";
import MoyenPaiementForm from "./gestion_parc_auto/pages/MoyenPaiementForm";
import DepenseEditForm from "./gestion_parc_auto/pages/DepenseEditForm";
import MoyenPaiementEditForm from "./gestion_parc_auto/pages/MoyenPaiementEditForm";

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
    <Route
      path="/gm"
      element={
        <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS", "ROLE_DIR"]}>
          <GMMainPage />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="tableau-de-bord" replace />} />

      <Route path="tableau-de-bord" element={<GMDashboardPage />} />
      <Route path="appelOffres" element={<AOPage />} />
      <Route path="appelOffres/:id" element={<AOByIdPage />} />
      <Route path="marches" element={<MarchesPage />} />
      <Route path="marches/:id" element={<MarchesPerIdPage />} />
      <Route path="bons-commande" element={<BDPage />} />
      <Route path="bons-commande/:id" element={<BDPerIdPage />} />
      <Route path="contrats" element={<ConractPage />} />
      <Route path="contrats/:id" element={<ContractPerIdPage />} />
      <Route path="parametrage" element={<ParametrageGMPage />} />

      <Route path="*" element={<Navigate to="tableau-de-bord" replace />} />
    </Route>
  );
}

function gestionParcAutoRoutes() {
  return (
    <Route
      path="/parc-auto"
      element={
        <ProtectedRoute role={["ROLE_ADMIN", "ROLE_LOGISTICS"]}>
          <ParcAutoLayout />
        </ProtectedRoute>
      }
    >
      {/* Routes enfants qui s'afficheront à l'intérieur de <Outlet /> */}
      <Route index element={<Navigate to="vehicules" replace />} />
      {/* Redirige /parc-auto vers /parc-auto/vehicules */}
      <Route path="vehicules" element={<VehiculesList />} />
      <Route path="vehicules/ajouter" element={<VehiculeForm />} />
      <Route
        path="vehicules/modifier/:vehiculeId"
        element={<VehiculeEditForm />}
      />
      <Route path="chauffeurs" element={<ChauffeursList />} />
      <Route path="chauffeurs/ajouter" element={<ChauffeurForm />} />
      <Route
        path="chauffeurs/modifier/:chauffeurId"
        element={<ChauffeurEditForm />}
      />
      <Route path="missions" element={<MissionsList />} />
      <Route path="missions/ajouter" element={<MissionForm />} />
      <Route
        path="missions/modifier/:missionId"
        element={<MissionEditForm />}
      />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="depenses" element={<DepensesList />} />
      <Route path="moyens-paiement" element={<MoyensPaiementList />} />
      <Route path="depenses/ajouter" element={<DepenseForm />} />
      <Route path="moyens-paiement/ajouter" element={<MoyenPaiementForm />} />
      <Route
        path="moyens-paiement/modifier/:moyenPaiementId"
        element={<MoyenPaiementEditForm />}
      />
      <Route
        path="depenses/modifier/:depenseId"
        element={<DepenseEditForm />}
      />
      <Route
        path="*"
        element={<Navigate to="/parc-auto/vehicules" replace />}
      />
    </Route>
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
        <NotificationProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                userDetails ? (
                  userDetails.role === "ROLE_ADMIN" ||
                  userDetails.role === "ROLE_LOGISTICS" ? (
                    <MainPage />
                  ) : userDetails.role === "ROLE_DIR" ? (
                    <Navigate to="/gm" />
                  ) : (
                    <Navigate to="/md/dashboard" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* material demande routes */}
            {gestionDemandeRoutes()}

            {/* gestion marchée routes */}
            {gestionMarcheRoutes()}

            {/* --- APPEL À VOTRE NOUVELLE FONCTION DE ROUTES --- */}
            {gestionParcAutoRoutes()}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </NotificationProvider>
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
