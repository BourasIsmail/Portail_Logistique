import React, { useEffect } from "react";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails === null) {
      console.log("redirecting to login page from MainPage");
      return navigate("/login", { replace: true });
    } else {
      console.log(
        "userDetails is not null, redirecting to dashboard from MainPage"
      );

      if (userDetails.role === "ROLE_ADMIN") {
        return navigate("/admin/dashboard", { replace: true });
      }
      return navigate("/dashboard", { replace: true });
    }
  }, []);
}
