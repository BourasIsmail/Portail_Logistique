import React from "react";
import {
  FileText,
  User,
  LogOut,
  WarehouseIcon,
  Icon,
  ArrowLeftCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  showBackButton = false,
  title = "Portail Logistique",
  icon: Icon = WarehouseIcon,
}) {
  const { userDetails, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6" />
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center  gap-2 ">
          <div className="align-bottom self-end">
            {showBackButton && (
              <Button
                variant="ghost"
                asChild
                className="hover:text-gray-900 hover:bg-gray-100 "
                onClick={() => navigate("/")}
              >
                <span>
                  <ArrowLeftCircleIcon className="h-5 w-5" />
                  Menu Principal
                </span>
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <User className="h-5 w-5 mr-2" />
                <span>{userDetails.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userDetails.username}
                  </span>
                  <span className="truncate text-xs">{userDetails.email}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <button
                onClick={() => {
                  logout();
                  return navigate("/login", { replace: true });
                }}
                className="w-full"
              >
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
