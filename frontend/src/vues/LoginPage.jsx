import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { LoginForm } from "@/components/login-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthProvider";

export default function LoginPage() {
  const navigate = useNavigate();
  const { userDetails, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userInfo, updateUserInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userDetails !== null) {
      console.log(
        "userDetails is not null, redirecting to dashboard from login page"
      );
      return navigate("/dashboard", { replace: true });
    }

    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userInfo);

    try {
      const res = await api.post("/auth/login", userInfo);

      let userDetail = res.data;

      login(userDetail);
      console.log(
        "redirecting to dashboard from LoginPage after login was successful"
      );

      if (userDetail.role === "ROLE_ADMIN") {
        return navigate("/admin/dashboard", { replace: true });
      }
      return navigate("/dashboard", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
