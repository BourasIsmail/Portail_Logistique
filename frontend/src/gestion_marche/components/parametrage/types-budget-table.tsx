import React from "react";
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

// Mock data
const mockTypesBudget: TypeBudget[] = [
  { id: 1, nom: "Budget d'investissement" },
  { id: 2, nom: "Budget de fonctionnement" },
];

export default function TypesBudgetTable(): JSX.Element {
  const [typesBudget, setTypesBudget] = useState<TypeBudget[]>(mockTypesBudget);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTypeBudget, setCurrentTypeBudget] = useState<TypeBudget | null>(
    null
  );
  const [formTitle, setFormTitle] = useState<string>("");

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

  const confirmDelete = (): void => {
    if (currentTypeBudget) {
      setTypesBudget((prev) =>
        prev.filter((item) => item.id !== currentTypeBudget.id)
      );
    }
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = (formData: TypeBudget): void => {
    if (currentTypeBudget) {
      // Update
      setTypesBudget((prev) =>
        prev.map((item) =>
          item.id === currentTypeBudget.id ? { ...formData, id: item.id } : item
        )
      );
    } else {
      // Add
      const newId = Math.max(...typesBudget.map((item) => item.id), 0) + 1;
      setTypesBudget((prev) => [...prev, { ...formData, id: newId }]);
    }
    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Types de budget</h2>
        <Button
          onClick={handleAdd}
          variant={undefined}
          size={undefined}
          className={undefined}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
        <Table className={undefined}>
          <TableHeader className="bg-gray-50">
            <TableRow className={undefined}>
              <TableHead className="text-gray-700 font-medium">ID</TableHead>
              <TableHead className="text-gray-700 font-medium">Nom</TableHead>
              <TableHead className="text-right text-gray-700 font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={undefined}>
            {typesBudget.length > 0 ? (
              typesBudget.map((typeBudget) => (
                <TableRow key={typeBudget.id} className="hover:bg-gray-50">
                  <TableCell className={undefined}>{typeBudget.id}</TableCell>
                  <TableCell className={undefined}>{typeBudget.nom}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(typeBudget)}
                      className="text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(typeBudget)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={undefined}>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-gray-500"
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
        <DialogContent className="border-gray-200">
          <DialogHeader className={undefined}>
            <DialogTitle className="text-gray-900">{formTitle}</DialogTitle>
          </DialogHeader>
          <TypeBudgetForm
            typeBudget={currentTypeBudget}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="border-gray-200">
          <AlertDialogHeader className={undefined}>
            <AlertDialogTitle className="text-gray-900">
              Êtes-vous sûr de vouloir supprimer ce type de budget ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Cette action est irréversible. Ce type de budget sera
              définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={undefined}>
            <AlertDialogCancel className="border-gray-200 text-gray-600">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
