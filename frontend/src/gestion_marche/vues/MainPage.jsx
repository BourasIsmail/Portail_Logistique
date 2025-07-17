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
  HandshakeIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function MainPage() {
  const { userDetails } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [role, setRole] = React.useState("");

  useEffect(() => {
    if (getTokenFromCookie() === null) {
      console.log("redirecting to login page from MainPage");
      return navigate("/login", { replace: true });
    } else {
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
      <Navbar title="Gestion des marchés" showBackButton={true} />

      <div className="container mx-auto pt-4 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bienvenue dans votre application de gestion. Cette plateforme vous
              permet de gérer efficacement vos marchés, bons de commande et
              contrats, ainsi que leurs situations respectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <BarChart className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">Tableau de bord</CardTitle>
                <CardDescription className="text-gray-600">
                  Visualisez les statistiques et l&apos;état global
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild>
                  <Link to="/gm/tableau-de-bord">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200 flex flex-col">
              <CardHeader className="text-center">
                <HandshakeIcon className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">Appels d'offres</CardTitle>
                <CardDescription className="text-gray-600">
                  Gérez les appels d'offres
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center h-full items-end">
                <Button asChild>
                  {/* // TODO : update this later */}
                  <Link to="/gm/appelOffres">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200 flex flex-col">
              <CardHeader className="text-center">
                <FileText className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">Marchés</CardTitle>
                <CardDescription className="text-gray-600">
                  Gérez les marchés et leurs situations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center h-full items-end">
                <Button asChild>
                  <Link to="/gm/marches">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <ShoppingCart className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">
                  Bons de Commande
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Gérez les bons de commande et leurs situations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-end">
                <Button asChild>
                  <Link to="/gm/bons-commande">Accéder</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <FileContract className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">Contrats</CardTitle>
                <CardDescription className="text-gray-600">
                  Suivez vos contrats et leurs échéances
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild>
                  <Link to="/gm/contrats">Accéder</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <Settings className="w-12 h-12 mx-auto" />
                <CardTitle className="text-gray-900">Paramétrage</CardTitle>
                <CardDescription className="text-gray-600">
                  Configurez les types de budget, rubriques et PMN
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild>
                  <Link to="/gm/parametrage">Accéder</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
