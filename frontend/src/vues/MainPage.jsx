import React, { useEffect } from "react";
import { useAuth, getTokenFromCookie } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  FileText,
  ShoppingCart,
  FileCodeIcon as FileContract,
  Settings,
  PackageIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function MainPage() {
  const { userDetails } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [role, setRole] = React.useState("");

  useEffect(() => {
    if (!getTokenFromCookie()) {
      console.log("redirecting to login page from MainPage");
      return navigate("/login", { replace: true });
    } else {
      console.log(
        "userDetails is not null, redirecting to dashboard from MainPage"
      );

      if (userDetails.role === "ROLE_ADMIN") {
        setRole("/admin");
      } else if (userDetails.role === "ROLE_INFO") {
        setRole("/info");
      } else if (userDetails.role === "ROLE_LOGISTICS") {
        setRole("/logistics");
      } else if (userDetails.role === "ROLE_USER") {
        return navigate("/dashboard", { replace: true });
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return;
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Menu principal
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bienvenue dans votre application de gestion. Cette plateforme vous
              permet de gérer vos besoins logistiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <PackageIcon className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">
                  Gestion des Demandes
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Gérez les demandes de materiéls et suivez leur statut
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild>
                  <Link to="/md/dashboard">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200 flex flex-col">
              <CardHeader className="text-center">
                <FileText className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">
                  Gestion de marchés
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Gérez les marchés et leurs situations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center h-full items-end">
                <Button asChild>
                  <Link to="/gm">Accéder</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
