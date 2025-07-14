import React from "react";
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
  const [pmns, setPMNs] = useState(mockPMNs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPMN, setCurrentPMN] = useState<PMN | null>(null);
  const [formTitle, setFormTitle] = useState("");

  const handleAdd = () => {
    setCurrentPMN(null);
    setFormTitle("Ajouter un PMN");
    setIsFormOpen(true);
  };

  interface PMN {
    id: number;
    num: string;
    objet: string;
    montant: number;
  }

  const handleEdit = (pmn: PMN) => {
    setCurrentPMN(pmn);
    setFormTitle("Modifier le PMN");
    setIsFormOpen(true);
  };

  const handleDelete = (pmn: PMN) => {
    setCurrentPMN(pmn);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentPMN) {
      setPMNs((prev) => prev.filter((item) => item.id !== currentPMN.id));
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = (formData: Omit<PMN, "id">) => {
    if (currentPMN) {
      // Update
      setPMNs((prev) =>
        prev.map((item) =>
          item.id === currentPMN.id ? { ...formData, id: item.id } : item
        )
      );
    } else {
      // Add
      const newId = Math.max(...pmns.map((item) => item.id), 0) + 1;
      setPMNs((prev) => [...prev, { ...formData, id: newId }]);
    }
    setIsFormOpen(false);
  };

  const formatMontant = (montant: number) => {
    return `${montant.toLocaleString()} DH`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold ">
          PMN (Programme de Marchés Négociés)
        </h2>
        <Button
          onClick={handleAdd}
          //   className="bg-blue-600 hover:bg-blue-700"
          className={undefined}
          variant={undefined}
          size={undefined}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table className={undefined}>
          <TableHeader className={undefined}>
            <TableRow className={undefined}>
              <TableHead className="font-medium">ID</TableHead>
              <TableHead className="font-medium">Numéro</TableHead>
              <TableHead className="font-medium">Objet</TableHead>
              <TableHead className="font-medium">Montant</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={undefined}>
            {pmns.length > 0 ? (
              pmns.map((pmn) => (
                <TableRow key={pmn.id} className={undefined}>
                  <TableCell className={undefined}>{pmn.id}</TableCell>
                  <TableCell className={undefined}>{pmn.num}</TableCell>
                  <TableCell className={undefined}>{pmn.objet}</TableCell>
                  <TableCell className={undefined}>
                    {formatMontant(pmn.montant)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(pmn)}
                      className="text-blue-600 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(pmn)}
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
                <TableCell colSpan={5} className="h-24 text-center">
                  Aucun PMN trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className={undefined}>
          <DialogHeader className={undefined}>
            <DialogTitle className={undefined}>{formTitle}</DialogTitle>
          </DialogHeader>
          <PMNForm
            pmn={currentPMN}
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
        <AlertDialogContent className={undefined}>
          <AlertDialogHeader className={undefined}>
            <AlertDialogTitle className={undefined}>
              Êtes-vous sûr de vouloir supprimer ce PMN ?
            </AlertDialogTitle>
            <AlertDialogDescription className={undefined}>
              Cette action est irréversible. Ce PMN sera définitivement
              supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={undefined}>
            <AlertDialogCancel className={undefined}>Annuler</AlertDialogCancel>
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
