import React, { useState } from "react";
import { useEffect } from "react";
import { loadUserDetails } from "@/utils/AuthProvider";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

export default function DashboardPage() {
  const { userDetails, login, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      let loggedIn = await loadUserDetails(login, logout);
      if (!loggedIn) {
        return navigate("/login", { replace: true });
      } else {
        setLoading(false);
      }
    };

    if (userDetails == null) {
      redirect();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <h1>dashboard</h1>
      <Link to={"/"}>index</Link>
    </>
  );
}
