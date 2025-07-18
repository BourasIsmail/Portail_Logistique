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
import TypeBudgetForm from "./type-budget-form";
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
import type { TypeBudget } from "@/gestion_marche/types";
import api from "@/utils/api";

export default function TypesBudgetTable(): JSX.Element {
  const [typesBudget, setTypesBudget] = useState<TypeBudget[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTypeBudget, setCurrentTypeBudget] = useState<TypeBudget | null>(
    null
  );
  const [formTitle, setFormTitle] = useState<string>("");

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchTypesBudget = async () => {
      try {
        const response = await api.get("/admin/get-all-type-budget");
        if (response.status === 200) {
          console.log("Fetched types budget:", response.data);
          setTypesBudget(response.data);
        }
      } catch (error) {
        console.error("Error fetching types budget:", error);
      }
    };
    fetchTypesBudget();
  }, []);

  const handleAdd = (): void => {
    setCurrentTypeBudget(null);
    setFormTitle("Ajouter un type de budget");
    setIsFormOpen(true);
  };

  const handleEdit = (typeBudget: TypeBudget): void => {
    setCurrentTypeBudget(typeBudget);
    setFormTitle("Modifier le type de budget");
    setIsFormOpen(true);
  };

  const handleDelete = (typeBudget: TypeBudget): void => {
    setCurrentTypeBudget(typeBudget);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (currentTypeBudget) {
      try {
        const response = await api.delete(
          `/admin/delete-type-budget/${currentTypeBudget.name}`
        );
        if (response.status === 200) {
          console.log("Type budget deleted:", response.data);
          setTypesBudget((prev) =>
            prev.filter((item) => item.id !== currentTypeBudget.id)
          );
        }
      } catch (error) {
        console.error("Error deleting type budget:", error);
        return;
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = async (formData: TypeBudget) => {
    try {
      if (currentTypeBudget) {
        // update
        const response = await api.put(
          `/admin/update-type-budget/${currentTypeBudget.name}`,
          formData
        );
        if (response.status === 200) {
          setTypesBudget((prev) =>
            prev.map((item) =>
              item.id === currentTypeBudget.id ? { ...response.data } : item
            )
          );
          setIsFormOpen(false);
        }
      } else {
        // Add
        const response = await api.post("/admin/add-type-budget", formData);
        if (response.status === 200) {
          setTypesBudget((prev) => [...prev, { ...response.data }]);
          setIsFormOpen(false);
        }
      }
    } catch (error) {
      console.error("Error updating type budget:", error);
      return;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">
            Gestion des Types de Budget
          </h2>
          <p className="text-sm text-slate-500">
            Ajoutez, modifiez ou supprimez les types de budget.
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
            {typesBudget.length > 0 ? (
              typesBudget.map((typeBudget) => (
                <TableRow key={typeBudget.id} className="hover:bg-slate-50">
                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {typeBudget.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-slate-800">
                    {typeBudget.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(typeBudget)}
                        className="flex items-center gap-1 rounded-md border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3 w-3" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(typeBudget)}
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
                  Aucun type de budget trouvé.
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
            <TypeBudgetForm
              typeBudget={currentTypeBudget}
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
              Êtes-vous sûr de vouloir supprimer ce type de budget ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Cette action est irréversible. Ce type de budget sera
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
