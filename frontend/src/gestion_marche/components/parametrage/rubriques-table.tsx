import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import RubriqueForm from "./rubrique-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Rubrique } from "@/gestion_marche/types";

import api from "@/utils/api";

// Mock data
const mockRubriques = [
  { id: 1, nCompte: "123456", rubrique: "Équipement informatique" },
  { id: 2, nCompte: "789012", rubrique: "Mobilier de bureau" },
  { id: 3, nCompte: "345678", rubrique: "Fournitures de bureau" },
];

export default function RubriquesTable() {
  const [rubriques, setRubriques] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRubrique, setCurrentRubrique] = useState<Rubrique | null>(null);
  const [formTitle, setFormTitle] = useState("");

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchRubriques = async () => {
      try {
        const response = await api.get("/admin/get-all-rubrique");
        console.log("Fetched rubriques:", response.data);
        if (response.status === 200) {
          console.log("Fetched rubriques:", response.data);
          setRubriques(response.data);
        }
      } catch (error) {
        console.error("Error fetching rubriques:", error);
      }
    };
    fetchRubriques();
  }, []);

  const handleAdd = () => {
    setCurrentRubrique(null);
    setFormTitle("Ajouter une rubrique");
    setIsFormOpen(true);
  };

  const handleEdit = (rubrique: Rubrique) => {
    setCurrentRubrique(rubrique);
    setFormTitle("Modifier la rubrique");
    setIsFormOpen(true);
  };

  const handleDelete = (rubrique: Rubrique) => {
    setCurrentRubrique(rubrique);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (currentRubrique) {
      try {
        const response = await api.delete(
          `/admin/delete-rubrique/${currentRubrique.rubrique}`
        );
        if (response.status === 200) {
          console.log("Type budget deleted:", response.data);
          setRubriques((prev) =>
            prev.filter((item) => item.id !== currentRubrique.id)
          );
        }
      } catch (error) {
        console.error("Error deleting type budget:", error);
        return;
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = async (formData: Omit<Rubrique, "id">) => {
    try {
      if (currentRubrique) {
        // Update
        const response = await api.put(
          `/admin/update-rubrique/${currentRubrique.rubrique}`,
          formData
        );
        if (response.status === 200) {
          setRubriques((prev) =>
            prev.map((item) =>
              item.id === currentRubrique.id
                ? {
                    id: response.data.id,
                    nCompte: response.data.ncompte,
                    rubrique: response.data.rubrique,
                  }
                : item
            )
          );
          setIsFormOpen(false);
        }
      } else {
        // Add
        const response = await api.post("/admin/add-rubrique", formData);
        if (response.status === 200) {
          setRubriques((prev) => [
            ...prev,
            {
              id: response.data.id,
              nCompte: response.data.ncompte,
              rubrique: response.data.rubrique,
            },
          ]);
          setIsFormOpen(false);
        }
      }
    } catch (error) {
      console.error("Error adding type budget:", error);
      return;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">
            Gestion des Rubriques
          </h2>
          <p className="text-sm text-slate-500">
            Ajoutez, modifiez ou supprimez les rubriques budgétaires.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
          variant={undefined}
          size={undefined}
        >
          <Plus className="h-4 w-4" />
          Ajouter une rubrique
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <Table className={undefined}>
          <TableHeader className="bg-slate-50">
            <TableRow className={undefined}>
              <TableHead className="w-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                ID
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                N° Compte
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Rubrique
              </TableHead>
              <TableHead className="w-48 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-200/80">
            {rubriques.length > 0 ? (
              rubriques.map((rubrique) => (
                <TableRow key={rubrique.id} className="hover:bg-slate-50">
                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {rubrique.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-slate-800">
                    {rubrique.nCompte}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {rubrique.rubrique}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(rubrique)}
                        className="flex items-center gap-1 rounded-md border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3 w-3" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(rubrique)}
                        className="flex items-center gap-1 rounded-md border-red-300 bg-white text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={undefined}>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  Aucune rubrique trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className={undefined}>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {formTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 pb-0">
            <RubriqueForm
              rubrique={currentRubrique}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className={undefined}>
          <AlertDialogHeader className={undefined}>
            <AlertDialogTitle className="text-lg font-bold text-slate-900">
              Êtes-vous sûr de vouloir supprimer cette rubrique ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Cette action est irréversible. Cette rubrique sera définitivement
              supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={undefined}>
            <AlertDialogCancel className={undefined}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
