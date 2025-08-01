import React from "react";
import {
  FileText,
  User,
  LogOut,
  WarehouseIcon,
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
    <header className="w-full border-b border-slate-200/80 bg-slate-900 shadow-sm">
      <div className="mx-auto flex h-16 max-w-4/5 items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-slate-300" />
          <h1 className="text-lg font-semibold text-slate-200">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100"
              onClick={() => navigate("/")}
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
              <span>Menu Principal</span>
            </Button>
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
  );
}

