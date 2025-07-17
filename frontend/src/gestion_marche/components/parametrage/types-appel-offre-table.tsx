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
            {typesAO.length > 0 ? (
              typesAO.map((typeAO) => (
                <TableRow key={typeAO.id} className="hover:bg-gray-50">
                  <TableCell className={undefined}>{typeAO.id}</TableCell>
                  <TableCell className={undefined}>{typeAO.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(typeAO)}
                      className="text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(typeAO)}
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
                  Aucun type d'appel d'offre trouvé.
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
          <TypeAOForm
            typeAO={currentTypeAO}
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
              Êtes-vous sûr de vouloir supprimer ce type d'appel d'offre ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Cette action est irréversible. Ce type d'appel d'offre sera
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
