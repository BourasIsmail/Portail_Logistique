import React, { useEffect } from "react";
import { useAuth, getTokenFromCookie } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
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
      // if (userDetails.role === "ROLE_ADMIN") {
      //   setRole("/admin");
      // } else if (userDetails.role === "ROLE_INFO") {
      //   setRole("/info");
      // } else if (userDetails.role === "ROLE_LOGISTICS") {
      //   setRole("/logistics");
      // } else if (userDetails.role === "ROLE_USER") {
      //   return navigate("/dashboard", { replace: true });
      // }
      if (userDetails.role === "ROLE_USER") {
        return navigate("/dashboard", { replace: true });
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return;
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Navbar title="Gestion des marchés" showBackButton={true} />

        <Outlet />


      <div className="container mx-auto pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Bienvenue dans votre application de gestion. Cette plateforme vous
              permet de gérer efficacement vos marchés, bons de commande et
              contrats, ainsi que leurs situations respectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/80 min-h-56 flex flex-col justify-between">
              <CardHeader className="text-center">
                <BarChart className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <CardTitle className="text-slate-800 text-lg font-semibold">
                  Tableau de bord
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm">
                  Visualisez les statistiques et l&apos;état global
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center ">
                <Button
                  asChild
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-md px-5 py-2 text-sm font-medium"
                >
                  <Link to="/gm/tableau-de-bord">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/80 min-h-56 flex flex-col justify-between">
              <CardHeader className="text-center">
                <HandshakeIcon className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <CardTitle className="text-slate-800 text-lg font-semibold">
                  Appels d'offres
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm">
                  Gérez les appels d'offres
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center ">
                <Button
                  asChild
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-md px-5 py-2 text-sm font-medium"
                >
                  {/* // TODO : update this later */}
                  <Link to="/gm/appelOffres">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/80 min-h-56 flex flex-col justify-between">
              <CardHeader className="text-center">
                <FileText className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <CardTitle className="text-slate-800 text-lg font-semibold">
                  Marchés
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm">
                  Gérez les marchés et leurs situations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  asChild
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-md px-5 py-2 text-sm font-medium"
                >
                  <Link to="/gm/marches">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/80 min-h-56 flex flex-col justify-between">
              <CardHeader className="text-center">
                <ShoppingCart className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <CardTitle className="text-slate-800 text-lg font-semibold">
                  Bons de Commande
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm">
                  Gérez les bons de commande et leurs situations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  asChild
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-md px-5 py-2 text-sm font-medium"
                >
                  <Link to="/gm/bons-commande">Accéder</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/80 min-h-56 flex flex-col justify-between">
              <CardHeader className="text-center">
                <FileContract className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <CardTitle className="text-slate-800 text-lg font-semibold">
                  Contrats
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm">
                  Suivez vos contrats et leurs échéances
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  asChild
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-md px-5 py-2 text-sm font-medium"
                >
                  <Link to="/gm/contrats">Accéder</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/80 min-h-56 flex flex-col justify-between">
              <CardHeader className="text-center ">
                <Settings className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <CardTitle className="text-slate-800 text-lg font-semibold">
                  Paramétrage
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm">
                  Configurez les types de budget, rubriques et PMN
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center ">
                <Button
                  asChild
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-md px-5 py-2 text-sm font-medium"
                >
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
