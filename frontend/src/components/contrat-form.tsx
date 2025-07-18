import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contrat, Rubrique, TypeBudget } from "@/gestion_marche/types";
import { set } from "react-hook-form";
import api from "@/utils/api";

// Mock data for dropdowns
// const typeBudgets = [
//   { id: 1, nom: "Budget d'investissement" },
//   { id: 2, nom: "Budget de fonctionnement" },
// ];

// const rubriques = [
//   { id: 1, nCompte: "123456", rubrique: "Équipement informatique" },
//   { id: 2, nCompte: "789012", rubrique: "Mobilier de bureau" },
//   { id: 3, nCompte: "345678", rubrique: "Fournitures de bureau" },
// ];

type ContratFormProps = {
  contrat?: Contrat | null;
  onSubmit: (
    data: ContratFormProps["contrat"] extends null
      ? Omit<NonNullable<ContratFormProps["contrat"]>, "statut"> & {
          statut: string;
        }
      : NonNullable<ContratFormProps["contrat"]>
  ) => void;
  onCancel: () => void;
};

export default function ContratForm({
  contrat = null,
  onSubmit,
  onCancel,
}: ContratFormProps) {
  const [typeBudget, setTypeBudget] = useState<TypeBudget[]>([]);
  const [rubrique, setRubrique] = useState<Rubrique[]>([]);
  const [formData, setFormData] = useState(
    contrat || {
      id: undefined, // or undefined if your backend assigns it, but must match Contrat type
      reference: "",
      anneeBudgetaire: new Date().getFullYear().toString(),
      objet: "",
      attributaire: "",
      montant: 0,
      dateSignature: "",
      dateDebut: "",
      dateFin: "",
      statut: "En cours",
      typeBudgetId: undefined,
      rubriqueId: undefined,
      numCompte: "",
      rubrique: undefined,
      typeBudget: undefined,
      description: "",
    }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypeBudgets = async () => {
      const response = await api.get("/admin/get-all-type-budget");
      if (response.status === 200) {
        setTypeBudget(response.data);
      } else {
        console.error("Failed to fetch type budgets");
      }
    };
    const fetchRubrique = async () => {
      const response = await api.get("/admin/get-all-rubrique");
      if (response.status === 200) {
        setRubrique(response.data);
      } else {
        console.error("Failed to fetch type budgets");
      }
      setLoading(false);
    };

    fetchTypeBudgets();
    fetchRubrique();
  }, []);

  if (loading) {
    return;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "montant" ? Number(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRubriqueChange = (value: string) => {
    const selectedRubrique = rubrique.find((r) => r.id.toString() === value);
    if (selectedRubrique) {
      setFormData((prev) => ({
        ...prev,
        rubriqueId: Number(value),
        numCompte: selectedRubrique.nCompte,
        rubrique: selectedRubrique,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl border-slate-200/80 bg-slate-50/80 py-2.5 px-6">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Informations du contrat
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reference" className="font-medium text-slate-700">
                Référence
              </Label>
              <Input
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="anneeBudgetaire"
                className="font-medium text-slate-700"
              >
                Année budgétaire
              </Label>
              <Input
                id="anneeBudgetaire"
                name="anneeBudgetaire"
                value={formData.anneeBudgetaire}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="typeBudget"
                className="font-medium text-slate-700"
              >
                Type de budget
              </Label>
              <Select
                value={formData.typeBudgetId?.toString() || ""}
                onValueChange={(value) =>
                  handleSelectChange("typeBudgetId", value)
                }
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner un type de budget" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {typeBudget.map((budget) => (
                    <SelectItem
                      key={budget.id}
                      value={budget.id.toString()}
                      className={undefined}
                    >
                      {budget.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rubrique" className="font-medium text-slate-700">
                Rubrique
              </Label>
              <Select
                value={formData.rubriqueId?.toString() || ""}
                onValueChange={(value) => handleRubriqueChange(value)}
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner une rubrique" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {rubrique.map((rubrique) => (
                    <SelectItem
                      key={rubrique.id}
                      value={rubrique.id.toString()}
                      className={undefined}
                    >
                      {rubrique.nCompte} - {rubrique.rubrique}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="objet" className="font-medium text-slate-700">
                Objet
              </Label>
              <Textarea
                id="objet"
                name="objet"
                value={formData.objet ? formData.objet : ""}
                onChange={handleChange}
                required
                className="min-h-[100px] rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="description"
                className="font-medium text-slate-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description ? formData.description : ""}
                onChange={handleChange}
                className="min-h-[100px] rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="attributaire"
                className="font-medium text-slate-700"
              >
                Attributaire
              </Label>
              <Input
                id="attributaire"
                name="attributaire"
                value={formData.attributaire}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="montant" className="font-medium text-slate-700">
                Montant (DH)
              </Label>
              <Input
                id="montant"
                name="montant"
                type="number"
                value={formData.montant}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateSignature"
                className="font-medium text-slate-700"
              >
                Date de signature
              </Label>
              <Input
                id="dateSignature"
                name="dateSignature"
                type="date"
                value={formData.dateSignature}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateDebut" className="font-medium text-slate-700">
                Date de début
              </Label>
              <Input
                id="dateDebut"
                name="dateDebut"
                type="date"
                value={formData.dateDebut}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFin" className="font-medium text-slate-700">
                Date de fin
              </Label>
              <Input
                id="dateFin"
                name="dateFin"
                type="date"
                value={formData.dateFin}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statut" className="font-medium text-slate-700">
                Statut
              </Label>
              <Select
                value={formData.statut}
                onValueChange={(value) => handleSelectChange("statut", value)}
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  <SelectItem value="En cours" className={undefined}>
                    En cours
                  </SelectItem>
                  <SelectItem value="Terminé" className={undefined}>
                    Terminé
                  </SelectItem>
                  <SelectItem value="Résilié" className={undefined}>
                    Résilié
                  </SelectItem>
                  <SelectItem value="Suspendu" className={undefined}>
                    Suspendu
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4 mb-4">
        <Button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-300"
          variant={undefined}
          size={undefined}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
          variant={undefined}
          size={undefined}
        >
          {contrat ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
