import React from "react";
import { useState, useEffect } from "react";
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
import PMNForm from "./pmn-form";
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

import api from "@/utils/api";
import type { PMN } from "@/gestion_marche/types";

// Mock data
const mockPMNs = [
  { id: 1, num: "PMN-2023-001", objet: "Achat de fournitures", montant: 50000 },
  { id: 2, num: "PMN-2023-002", objet: "Équipement technique", montant: 80000 },
  {
    id: 3,
    num: "PMN-2023-003",
    objet: "Services informatiques",
    montant: 120000,
  },
];

export default function PMNTable() {
  const [pmns, setPMNs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPMN, setCurrentPMN] = useState<PMN | null>(null);
  const [formTitle, setFormTitle] = useState("");

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchPMNs = async () => {
      try {
        const response = await api.get("/admin/get-all-pmn");
        if (response.status === 200) {
          console.log("Fetched PMNs:", response.data);
          setPMNs(response.data);
        }
      } catch (error) {
        console.error("Error fetching PMNs:", error);
      }
    };
    fetchPMNs();
  }, []);

  const handleAdd = () => {
    setCurrentPMN(null);
    setFormTitle("Ajouter un PMN");
    setIsFormOpen(true);
  };

  const handleEdit = (pmn: PMN) => {
    setCurrentPMN(pmn);
    setFormTitle("Modifier le PMN");
    setIsFormOpen(true);
  };

  const handleDelete = (pmn: PMN) => {
    setCurrentPMN(pmn);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (currentPMN) {
      try {
        const response = await api.delete(
          `/admin/delete-pmn/${currentPMN.num}`
        );
        if (response.status === 200) {
          console.log("Type budget deleted:", response.data);
          setPMNs((prev) => prev.filter((item) => item.id !== currentPMN.id));
        }
      } catch (error) {
        console.error("Error deleting type budget:", error);
        return;
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = async (formData: Omit<PMN, "id">) => {
    try {
      if (currentPMN) {
        // Update
        const response = await api.put(
          `/admin/update-pmn/${currentPMN.num}`,
          formData
        );
        if (response.status === 200) {
          setPMNs((prev) =>
            prev.map((item) =>
              item.id === currentPMN.id ? { ...response.data } : item
            )
          );
          setIsFormOpen(false);
        }
      } else {
        // Add
        console.log("Adding PMN with data:", formData);
        const response = await api.post("/admin/add-pmn", formData);
        if (response.status === 200) {
          setPMNs((prev) => [...prev, { ...response.data }]);
          setIsFormOpen(false);
        }
      }
    } catch (error) {
      console.error("Error adding type budget:", error);
      return;
    }
  };

  const formatMontant = (montant: number) => {
    return `${montant.toLocaleString()} DH`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">Gestion des PMN</h2>
          <p className="text-sm text-slate-500">
            Ajoutez, modifiez ou supprimez les Programmes de Marchés Négociés.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
          variant={undefined}
          size={undefined}
        >
          <Plus className="h-4 w-4" />
          Ajouter un PMN
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
                Numéro
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Objet
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                Montant
              </TableHead>
              <TableHead className="w-48 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-200/80">
            {pmns.length > 0 ? (
              pmns.map((pmn) => (
                <TableRow key={pmn.id} className="hover:bg-slate-50">
                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {pmn.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-slate-800">
                    {pmn.num}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {pmn.objet}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {formatMontant(pmn.montant)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(pmn)}
                        className="flex items-center gap-1 rounded-md border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3 w-3" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(pmn)}
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
                  colSpan={5}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  Aucun PMN trouvé.
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
            <PMNForm
              pmn={currentPMN}
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
              Êtes-vous sûr de vouloir supprimer ce PMN ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Cette action est irréversible. Ce PMN sera définitivement
              supprimé.
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
