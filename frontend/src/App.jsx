import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./vues/LoginPage";
import MainPage from "./vues/MainPage";
import DashboardPage from "./vues/DashboardPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuth } from "./utils/AuthProvider";
import { loadUserDetails } from "./utils/AuthProvider";

function App() {
  const { userDetails, login, logout } = useAuth();

  useEffect(() => {
    if (userDetails == null) {
      loadUserDetails(login, logout);
    }
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["ROLE_ADMIN"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
