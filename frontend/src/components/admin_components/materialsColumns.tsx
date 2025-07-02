"use client";
import React, { useEffect } from "react";

import { ColumnDef } from "@tanstack/react-table";
import {
  PackageMinusIcon,
  MoreHorizontal,
  RefreshCcw,
  PlusIcon,
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

export type Material = {
  id: string;
  matName: string;
  ctgrName: string;
};

export const columns = (refreshTable: () => void): ColumnDef<Material>[] => [
  {
    accessorKey: "matName",
    header: () => {
      const [categories, setCategories] = useState<string[]>([]);

      const fetchCategories = async () => {
        try {
          const response = await api.get("/user/get-categories");
          setCategories(response.data.map((cat) => cat.ctgrName));
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      useEffect(() => {
        fetchCategories();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const ctgr = formData.get("category");
        console.log("Adding material:", name, ctgr);
        try {
          await api.post("/admin/add-material", {
            matName: name,
            ctgrName: ctgr,
          });
          refreshTable();
        } catch (error) {
          console.error("Error adding material:", error);
        }
      };
      return (
        <div className="flex items-center  gap-2">
          <span>Nom du Matériel</span>
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
                      Ajouter Un Materiel
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <label>Nom :</label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Nom du matériel"
                        className={undefined}
                      />
                    </div>
                    <div className="grid gap-3">
                      <label>Catégorie :</label>
                      <Select name="category">
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={"Sélectionner une catégorie"}
                          />
                        </SelectTrigger>
                        <SelectContent className={undefined}>
                          {categories &&
                            categories.map((category) => (
                              <SelectItem
                                key={category + Math.random()}
                                value={category}
                                className={undefined}
                              >
                                {category}
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
                      Ajouter Materiel
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "ctgrName",
    header: () => {
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        console.log("Adding category:", name);
        try {
          await api.post("/admin/add-category?ctgrName=" + name);
          refreshTable();
        } catch (error) {
          console.error("Error adding material:", error);
          alert("Cette catégorie existe déjà !");
        }
      };
      return (
        <div className="flex items-center gap-2">
          <span>Catégorie</span>
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
                      Ajouter Une Catégorie
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 mb-2">
                    <div className="grid gap-3">
                      <label>Nom :</label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Nom du catégorie"
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
                      Ajouter Catégorie
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const [matName, setMatName] = useState(row.getValue("matName"));
      const [category, setCategory] = useState(row.getValue("ctgrName"));
      const [categories, setCategories] = useState<string[]>([]);

      const fetchCategories = async () => {
        try {
          const response = await api.get("/user/get-categories");
          setCategories(response.data.map((cat) => cat.ctgrName));
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      useEffect(() => {
        fetchCategories();
      }, []);

      const handleSubmit = async () => {
        let id = row.getValue("id");
        let name = matName != null ? matName : row.getValue("matName");
        let cat = category != null ? category : row.getValue("ctgrName");

        console.log("Updating material:", id, name, cat);
        try {
          await api.put(`/admin/update-material/${id}`, {
            matName: name,
            ctgrName: cat,
          });
          refreshTable();
        } catch (error) {
          console.error("Error updating material:", error);
        }
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
                    <RefreshCcw className="h-4 w-4" />
                    Modifier Materiel
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator className={undefined} />
                <DropdownMenuItem
                  className={undefined}
                  inset={undefined}
                  onClick={() => {
                    let id = row.getValue("id");
                    console.log("Deleting material:", id);
                    // try {
                    //   await api.delete(`/admin/delete-material/${id}`);
                    //   refreshTable();
                    // } catch (error) {
                    //   console.error("Error deleting material:", error);
                    // }
                  }}
                >
                  <PackageMinusIcon className="h-4 w-4" />
                  Suprimmer Materiel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent
              aria-describedby={undefined}
              className="sm:max-w-[425px]"
            >
              <DialogHeader className={undefined}>
                <DialogTitle className={"text-center"}>
                  Modifier Materiel
                </DialogTitle>
              </DialogHeader>
              <div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 ">Nom :</label>
                  <Input
                    type="text"
                    name="matName"
                    value={matName}
                    onChange={(e) => setMatName(e.target.value)}
                    placeholder={"nom du matériel"}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col mb-1">
                  <label className="text-sm font-medium mb-2 mt-4">
                    Catégorie :
                  </label>
                  <Select
                    name="category"
                    onValueChange={(value) => setCategory(value)}
                    value={category}
                    defaultValue={row.getValue("ctgrName")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={row.getValue("ctgrName")} />
                    </SelectTrigger>
                    <SelectContent className={undefined}>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem
                            key={category + Math.random()}
                            value={category}
                            className={undefined}
                          >
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className={undefined}>
                <Button
                  type="submit"
                  onClick={handleSubmit}
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
