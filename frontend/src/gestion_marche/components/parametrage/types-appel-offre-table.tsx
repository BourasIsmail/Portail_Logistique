import React, { useEffect } from "react";
import { JSX, useState } from "react";
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
import TypeAOForm from "./type-appel-offre-form";
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
import type { TypeAO } from "@/gestion_marche/types";
import api from "@/utils/api";
import { toast } from "sonner";

export default function TypesAOTable(): JSX.Element {
  const [typesAO, setTypesAO] = useState<TypeAO[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTypeAO, setCurrentTypeAO] = useState<TypeAO | null>(null);
  const [formTitle, setFormTitle] = useState<string>("");

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchTypesAO = async () => {
      try {
        const response = await api.get("/admin/get-all-typeAO");
        if (response.status === 200) {
          console.log("Fetched types budget:", response.data);
          setTypesAO(response.data);
        }
      } catch (error) {
        console.error("Error fetching types budget:", error);
      }
    };
    fetchTypesAO();
  }, []);

  const handleAdd = (): void => {
    setCurrentTypeAO(null);
    setFormTitle("Ajouter un type d'appel d'offre");
    setIsFormOpen(true);
  };

  const handleEdit = (typeAO: TypeAO): void => {
    setCurrentTypeAO(typeAO);
    setFormTitle("Modifier le type d'appel d'offre");
    setIsFormOpen(true);
  };

  const handleDelete = (typeAO: TypeAO): void => {
    setCurrentTypeAO(typeAO);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (currentTypeAO) {
      try {
        const response = await api.delete(
          `/admin/delete-typeAO/${currentTypeAO.name}`
        );
        if (response.status === 200) {
          console.log("Type budget deleted:", response.data);
          setTypesAO((prev) =>
            prev.filter((item) => item.id !== currentTypeAO.id)
          );
        }
      } catch (error) {
        console.error("Error deleting type appel offre:", error);
        return;
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = async (formData: TypeAO) => {
    try {
      if (currentTypeAO) {
        // update
        const response = await api.put(
          `/admin/update-typeAO/${currentTypeAO.name}`,
          formData
        );
        if (response.status === 200) {
          setTypesAO((prev) =>
            prev.map((item) =>
              item.id === currentTypeAO.id ? { ...response.data } : item
            )
          );
          setIsFormOpen(false);
        }
      } else {
        // Add
        const response = await api.post("/admin/add-typeAO", formData);
        if (response.status === 200) {
          setTypesAO((prev) => [...prev, { ...response.data }]);
          setIsFormOpen(false);
        }
      }
    } catch (error) {
      console.error("Error updating type appel offre:", error);
      toast.error("Ce type d'appel d'offre existe déjà.");
      return;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">
            Gestion des Types d'Appel d'Offre
          </h2>
          <p className="text-sm text-slate-500">
            Ajoutez, modifiez ou supprimez les types d'appel d'offre.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
          variant={undefined}
          size={undefined}
        >
          <Plus className="h-4 w-4" />
          Ajouter un type
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
                Nom
              </TableHead>
              <TableHead className="w-48 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-200/80">
            {typesAO.length > 0 ? (
              typesAO.map((typeAO) => (
                <TableRow key={typeAO.id} className="hover:bg-slate-50">
                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {typeAO.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-slate-800">
                    {typeAO.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(typeAO)}
                        className="flex items-center gap-1 rounded-md border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3 w-3" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(typeAO)}
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
                  colSpan={3}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  Aucun type d'appel d'offre trouvé.
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
            <TypeAOForm
              typeAO={currentTypeAO}
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
              Êtes-vous sûr de vouloir supprimer ce type d'appel d'offre ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Cette action est irréversible. Ce type d'appel d'offre sera
              définitivement supprimé.
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
