"use client";
import React, { useEffect } from "react";

import { ColumnDef } from "@tanstack/react-table";
import {
  PackageMinusIcon,
  MoreHorizontal,
  RefreshCcw,
  PlusIcon,
  LockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import TicketStatus from "@/components/TicketStatus";
import ActionDropdownMenu from "@/components/admin_components/ActionDropdownMenu";
import api from "@/utils/api";
import { useState } from "react";
import { toast } from "sonner";
import { changePassword } from "@/utils/AuthProvider";

export type Material = {
  id: string;
  service: string;
  email: string;
  division: string;
};

export const columns = (refreshTable: () => void): ColumnDef<Material>[] => [
  {
    accessorKey: "email",
    header: () => {
      return (
        <div className="flex items-center justify-center gap-2">
          <span>Email</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "service",
    header: () => {
      const [divisions, setDivisions] = useState([]);

      useEffect(() => {
        const fetchDivisions = async () => {
          try {
            const response = await api.get("/admin/get-divisions");
            console.log("Divisions Data:", response.data);
            setDivisions(response.data);
          } catch (error) {
            console.error("Error fetching divisions:", error);
          }
        };

        fetchDivisions();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const division = formData.get("division");

        try {
          await api.post("/admin/add-user", {
            name,
            email,
            password,
            division,
          });
          refreshTable();
        } catch (error) {
          console.error("Error adding material:", error);
          alert("Cette catégorie existe déjà !");
        }
      };

      return (
        <div className="flex items-center justify-center gap-2">
          <span>Service</span>
          <span>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={
                    "border rounded p-0.5 border-black hover:bg-gray-300 cursor-pointer flex items-center justify-center"
                  }
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                aria-describedby={undefined}
              >
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <DialogHeader className={undefined}>
                    <DialogTitle className={undefined}>
                      Ajouter une Entité
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 mb-2">
                    <div className="grid gap-3">
                      <label>Nom :</label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Nom d'Entité"
                        className={undefined}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <label>Email :</label>
                      <Input
                        name="email"
                        type="text"
                        placeholder="example@entraide.ma"
                        className={undefined}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <label>Mot de passe :</label>
                      <Input
                        name="password"
                        type="text"
                        placeholder="***********"
                        className={undefined}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <label>Division :</label>
                      <Select name="division" required>
                        <SelectTrigger className={undefined}>
                          <SelectValue placeholder="Sélectionner une division" />
                        </SelectTrigger>
                        <SelectContent className={undefined}>
                          {divisions.map((division) => (
                            <SelectItem
                              key={division + Math.random()}
                              value={division}
                              className={undefined}
                            >
                              {division}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className={undefined}>
                    <Button
                      type="submit"
                      className={undefined}
                      variant={undefined}
                      size={undefined}
                    >
                      Confirmer
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("service")}</div>;
    },
  },
  {
    accessorKey: "division",
    header: () => {
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        try {
          await api.post("/admin/add-division?divName=" + name);
          refreshTable();
        } catch (error) {
          console.error("Error adding material:", error);
          alert("Cette catégorie existe déjà !");
        }
      };
      return (
        <div className="flex items-center justify-center gap-2">
          <span>Division</span>
          <span>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={
                    "border rounded p-0.5 border-black hover:bg-gray-300 cursor-pointer flex items-center justify-center"
                  }
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                aria-describedby={undefined}
              >
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <DialogHeader className={undefined}>
                    <DialogTitle className={undefined}>
                      Ajouter Une Division
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 mb-2">
                    <div className="grid gap-3">
                      <label>Nom :</label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Nom du division"
                        className={undefined}
                      />
                    </div>
                  </div>
                  <DialogFooter className={undefined}>
                    <Button
                      type="submit"
                      className={undefined}
                      variant={undefined}
                      size={undefined}
                    >
                      Ajouter Division
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("division")}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const [pass, setPass] = useState<String>("");

      const handleClick = async () => {
        if (!pass || pass.trim() === "") {
          toast.warning("Veuillez entrer un mot de passe valide.");
          return;
        }

        await changePassword(row.getValue("id"), pass)
          .then(() => {
            toast.success("Mot de passe modifié avec succès.");
            refreshTable();
          })
          .catch((error) => {
            console.error("Error changing password:", error);
            toast.error("Erreur lors de la modification du mot de passe.");
          });
      };

      return (
        <div className="flex justify-end items-center">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  size={undefined}
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={undefined}>
                <DialogTrigger asChild>
                  <DropdownMenuItem className={undefined} inset={undefined}>
                    <LockIcon className="h-4 w-4" />
                    Changer mot de passe
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent
              aria-describedby={undefined}
              className="sm:max-w-[425px]"
            >
              <DialogHeader className={undefined}>
                <DialogTitle className={"text-center"}>
                  Modifier mot de passe
                </DialogTitle>
              </DialogHeader>
              <div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 ">
                    Nouveau mot de pass :
                  </label>
                  <Input
                    type="text"
                    onChange={(e) => setPass(e.target.value)}
                    placeholder={"********"}
                    className="w-full"
                  />
                </div>
              </div>
              <DialogFooter className={undefined}>
                <Button
                  type="submit"
                  onClick={handleClick}
                  className={undefined}
                  variant={undefined}
                  size={undefined}
                >
                  Confirmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
