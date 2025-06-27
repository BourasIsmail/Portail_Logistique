import React, { useEffect } from "react";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { loadUserDetails } from "@/utils/AuthProvider";

export default function MainPage() {
  const { userDetails, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      let loggedIn = await loadUserDetails(login, logout);
      if (!loggedIn) {
        return navigate("/login", { replace: true });
      } else {
        return navigate("/dashboard", { replace: true });
      }
    };

    if (userDetails == null) {
      redirect();
    } else {
      return navigate("/dashboard", { replace: true });
    }
  }, []);
}
