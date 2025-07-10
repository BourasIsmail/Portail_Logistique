import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { LoginForm } from "@/components/login-form";
import { useNavigate } from "react-router-dom";
import { useAuth, getTokenFromCookie } from "@/utils/AuthProvider";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Title } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const navigate = useNavigate();
  const { userDetails, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userInfo, updateUserInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (getTokenFromCookie() !== null) {
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

      if (userDetail.role.includes("ROLE_ADMIN")) {
        return navigate("/admin/dashboard", { replace: true });
      }

      return navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Invalid credentials");
        toast.error("Email ou mot de passe incorrect");
        return;
      }
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
          <div className="flex items-center justify-center h-24">
            <img src={logo} alt="Logo" className="max-h-full object-contain" />
          </div>

          <Label className="text-center text-xl font-bold tracking-wide uppercase self-center">
            Portail Logistique
          </Label>
          <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4 mb-10">
          © 2025 Royaume du Maroc - Entraide Nationale
        </p>
      </div>
    </>
  );
}
