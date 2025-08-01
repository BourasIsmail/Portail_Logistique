import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, getTokenFromCookie } from "./AuthProvider";

const ProtectedRoute = ({ children, role }) => {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getTokenFromCookie()) {
      console.log("redirecting to login page from ProtectedRoute");
      return navigate("/login");
    }

    if (!role.includes(userDetails.role)) {
      console.log(
        "User does not have the required role, redirecting to dashboard"
      );
      return navigate("/dashboard", { state: { from: "ProtectedRoute" } });
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

