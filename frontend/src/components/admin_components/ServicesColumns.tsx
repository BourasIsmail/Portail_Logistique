"use client";
import React, { useEffect } from "react";

import { ColumnDef } from "@tanstack/react-table";
import {
  PackageMinusIcon,
  MoreHorizontal,
  RefreshCcw,
  PlusIcon,
  LockIcon,
  ShieldUserIcon,
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

import FilterableFreeSelect from "@/components/FilterableFreeSelect";

export type Material = {
  id: string;
  name: string;
  email: string;
  type: string;
  parentName: string;
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
    accessorKey: "name",
    header: () => {
      const [divisions, setDivisions] = useState([]);
      const [type, setType] = useState();
      const [parentName, setParentName] = useState("");
      const [entities, setEntities] = useState([]);

      useEffect(() => {
        const fetchDivisions = async () => {
          try {
            const response = await api.get("/admin/get-entities");
            console.log("users Data:", response.data);
            setEntities(response.data);
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
        const type = formData.get("type");

        if (!name || !email || !password || !type) {
          toast.error("Veuillez remplir tous les champs requis.");
          return;
        }

        if (
          parentName &&
          !entities.some((entity) => entity.label === parentName)
        ) {
          toast.error("Le parent spécifié n'existe pas.");
          return;
        }

        console.log("Submitting form with data:", {
          name: name,
          email: email,
          password: password,
          type: type,
          parentName: parentName || null,
        });

        try {
          await api.post("/admin/create-user", {
            name: name,
            email: email,
            password: password,
            type: type,
            parentName: parentName || null,
          });
          refreshTable();
        } catch (error) {
          console.error("Error adding material:", error);
          alert("Cette entité existe déjà !");
        }
      };

      return (
        <div className="flex items-center justify-center gap-2">
          <span>Entité</span>
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
                      <label>
                        Nom : <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Nom d'Entité"
                        className={undefined}
                      />
                    </div>
                    <div className="grid gap-3">
                      <label>
                        Email : <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="email"
                        type="text"
                        placeholder="example@entraide.ma"
                        className={undefined}
                      />
                    </div>
                    <div className="grid gap-3">
                      <label>
                        Mot de passe : <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="password"
                        type="text"
                        placeholder="***********"
                        className={undefined}
                      />
                    </div>
                    <div className="grid gap-3">
                      <label>
                        Type : <span className="text-red-500">*</span>
                      </label>
                      <Select
                        name="type"
                        onValueChange={(value) => setType(value)}
                        value={type}
                      >
                        <SelectTrigger className={undefined}>
                          <SelectValue placeholder="Sélectionner le type d'entité" />
                        </SelectTrigger>
                        <SelectContent className={undefined}>
                          <SelectItem value="Service" className={undefined}>
                            Service
                          </SelectItem>
                          <SelectItem value="Division" className={undefined}>
                            Division
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <label>Parent (optionnel) :</label>
                      <FilterableFreeSelect
                        entities={entities}
                        setParentName={setParentName}
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
      return <div className="text-center">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "type",
    header: () => {
      return (
        <div className="flex items-center justify-center gap-2">
          <span>Type</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("type")}</div>;
    },
  },
  {
    accessorKey: "parentName",
    header: () => {
      return (
        <div className="flex items-center justify-center gap-2">
          <span>Parent</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.getValue("parentName") ? row.getValue("parentName") : "//"}
        </div>
      );
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
                <DropdownMenuSeparator className={undefined} />
                <DropdownMenuItem
                  className={undefined}
                  inset={undefined}
                  onClick={async () => {
                    let id = row.getValue("id");
                    try {
                      await api.put(`/admin/make-admin/${id}`);
                      toast.success(
                        "Utilisateur rendu administrateur avec succès"
                      );
                      refreshTable();
                    } catch (error) {
                      console.error("Error deleting material:", error);
                    }
                  }}
                >
                  <ShieldUserIcon className="h-4 w-4" />
                  Rendre administrateur
                </DropdownMenuItem>
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
// header: () => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const name = formData.get("name");
//     try {
//       await api.post("/admin/add-division?divName=" + name);
//       refreshTable();
//     } catch (error) {
//       console.error("Error adding material:", error);
//       alert("Cette catégorie existe déjà !");
//     }
//   };
//   return (
//     <div className="flex items-center justify-center gap-2">
//       <span>Division</span>
//       <span>
//         <Dialog>
//           <DialogTrigger asChild>
//             <button
//               type="button"
//               className={
//                 "border rounded p-0.5 border-black hover:bg-gray-300 cursor-pointer flex items-center justify-center"
//               }
//             >
//               <PlusIcon className="h-4 w-4" />
//             </button>
//           </DialogTrigger>
//           <DialogContent
//             className="sm:max-w-[425px]"
//             aria-describedby={undefined}
//           >
//             <form onSubmit={handleSubmit} className="grid gap-4">
//               <DialogHeader className={undefined}>
//                 <DialogTitle className={undefined}>
//                   Ajouter Une Division
//                 </DialogTitle>
//               </DialogHeader>
//               <div className="grid gap-4 mb-2">
//                 <div className="grid gap-3">
//                   <label>Nom :</label>
//                   <Input
//                     name="name"
//                     type="text"
//                     placeholder="Nom du division"
//                     className={undefined}
//                   />
//                 </div>
//               </div>
//               <DialogFooter className={undefined}>
//                 <Button
//                   type="submit"
//                   className={undefined}
//                   variant={undefined}
//                   size={undefined}
//                 >
//                   Ajouter Division
//                 </Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </span>
//     </div>
//   );
// },
