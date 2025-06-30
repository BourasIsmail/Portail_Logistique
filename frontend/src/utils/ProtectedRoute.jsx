import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children, role }) => {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetails == null) {
      console.log("redirecting to login page from ProtectedRoute");
      return navigate("/login");
    }

    if (!role.includes(userDetails.role)) {
      return navigate("/notfound", { state: { from: "ProtectedRoute" } });
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
