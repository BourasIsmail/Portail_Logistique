import React, { useEffect } from "react";

import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  //   const { userDetails, login, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    return navigate("/dashboard/tickets", { replace: true });
  }, []);

  return null;
  // return (
  //   <>
  //     <Dashboard title={"Service Dashboard"}>dashboard</Dashboard>
  //   </>
  // );
}
