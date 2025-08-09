import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Car,
  User,
  Route as MissionIcon,
  LogOut,
  ArrowLeftCircleIcon,
  Bell,
} from "lucide-react";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import VehiculesList from "./VehiculesList";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/utils/NotificationProvider";
import { /*...,*/ CreditCard, Fuel, Settings } from "lucide-react";

export default function ParcAutoLayout() {
  const { userDetails, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  return (
    <>
      {/* <Navbar showBackButton title="Parc Auto" icon={Car} /> */}
      <header className="w-full border-b border-slate-200/80 bg-slate-900 shadow-sm">
        <div className="mx-auto flex h-16  items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6 text-slate-300" />
            <h1 className="text-lg font-semibold text-slate-200">Parc Auto</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100"
              onClick={() => navigate("/")}
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
              <span>Menu Principal</span>
            </Button>

            {userDetails?.role === "ROLE_LOGISTICS" && (
              <Link
                to="/parc-auto/notifications"
                className="relative text-slate-300 hover:text-white transition-colors"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                >
                  <User className="h-5 w-5" />
                  <span>{userDetails.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border-slate-700 bg-slate-800 text-slate-300"
              >
                <DropdownMenuItem className="focus:bg-slate-700 focus:text-slate-100">
                  <User className="mr-2 h-4 w-4 text-slate-400" />
                  <div className="grid flex-1 gap-0.5 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-slate-200">
                      {userDetails.username}
                    </span>
                    <span className="truncate text-xs text-slate-400">
                      {userDetails.email}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/login", { replace: true });
                  }}
                  className="w-full cursor-pointer focus:bg-red-900/50 focus:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex h-screen bg-gray-100">
        {/* Colonne de navigation à gauche (le tableau de bord) */}
        <aside className="w-64 bg-white shadow-md">
          {/* <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Parc Auto</h2>
          </div> */}
          <nav className="mt-4">
            <Link
              to="/parc-auto/vehicules"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <Car className="h-5 w-5 mr-3" />
              Véhicules
            </Link>
            <Link
              to="/parc-auto/chauffeurs"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <User className="h-5 w-5 mr-3" />
              Chauffeurs
            </Link>
            <Link
              to="/parc-auto/missions"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <MissionIcon className="h-5 w-5 mr-3" />
              Missions
            </Link>

            {/* --- NOUVELLE SECTION --- */}
            <div className="px-4 mt-4 mb-2 text-xs font-semibold text-gray-500 uppercase">
              Finances
            </div>
            <Link
              to="/parc-auto/depenses"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <Fuel className="h-5 w-5 mr-3" />
              Dépenses
            </Link>
            <Link
              to="/parc-auto/moyens-paiement"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <CreditCard className="h-5 w-5 mr-3" />
              Moyens de Paiement
            </Link>
          </nav>
        </aside>

        {/* Contenu principal à droite */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            {/* C'est ici que les composants enfants (comme VehiculesList) seront affichés */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
