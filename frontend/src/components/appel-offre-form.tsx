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
import {
  AppelOffre,
  Contrat,
  Rubrique,
  TypeBudget,
  TypeAO,
} from "@/gestion_marche/types";
import { set } from "react-hook-form";
import api from "@/utils/api";

type AOFormProps = {
  appelOffre?: AppelOffre | null;
  onSubmit: (data: AppelOffre) => void;
  onCancel: () => void;
};

export default function AOForm({
  appelOffre = null,
  onSubmit,
  onCancel,
}: AOFormProps) {
  const [typeAO, setTypeAO] = useState<TypeAO[]>([]);
  const [rubrique, setRubrique] = useState<Rubrique[]>([]);

  const [formData, setFormData] = useState(
    appelOffre || {
      id: undefined,
      anneeBudgetaire: new Date().getFullYear().toString(),
      reference: "",
      objet: "",
      estimation: 0,
      datePublication: new Date().toISOString().split("T")[0],
      dateOuverture: "",
      dateFinTravaux: "",
      attributaire: "",
      montant: 0,
      dateNotificationApprobation: "",
      rubrique: null,
      rubriqueId: undefined,
      typeAO: null,
      typeAOId: undefined,
    }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAO = async () => {
      const response = await api.get("/admin/get-all-typeAO");
      if (response.status === 200) {
        setTypeAO(response.data);
      } else {
        console.error("Failed to fetch typeAO");
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

    fetchAO();
    fetchRubrique();
  }, []);

  if (loading) {
    return;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    console.log("Form submitted with data:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl border-slate-200/80 bg-slate-50/80 py-2.5 px-6">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Informations de l'appel d'offre
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
              <Label htmlFor="typeAO" className="font-medium text-slate-700">
                Type d'appel d'offre
              </Label>
              <Select
                value={formData.typeAOId?.toString() || ""}
                onValueChange={(value) => handleSelectChange("typeAOId", value)}
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner un type d'appel d'offre" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {typeAO.map((type) => (
                    <SelectItem
                      key={type.id}
                      value={type.id.toString()}
                      className={undefined}
                    >
                      {type.name}
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

            <div className="space-y-2">
              <Label
                htmlFor="estimation"
                className="font-medium text-slate-700"
              >
                Estimation (DH)
              </Label>
              <Input
                id="estimation"
                name="estimation"
                type="number"
                value={formData.estimation}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
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
                Montant demander par l'attributaire (DH)
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
                htmlFor="datePublication"
                className="font-medium text-slate-700"
              >
                Date de publication dans le portail
              </Label>
              <Input
                id="datePublication"
                name="datePublication"
                type="date"
                value={formData.datePublication}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateOuverture"
                className="font-medium text-slate-700"
              >
                Date d'ouverture des plis
              </Label>
              <Input
                id="dateOuverture"
                name="dateOuverture"
                type="date"
                value={formData.dateOuverture}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateFinTravaux"
                className="font-medium text-slate-700"
              >
                Date de fin des travaux de la commission
              </Label>
              <Input
                id="dateFinTravaux"
                name="dateFinTravaux"
                type="date"
                value={formData.dateFinTravaux}
                onChange={handleChange}
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateNotificationApprobation"
                className="font-medium text-slate-700"
              >
                Date de publication de PV
              </Label>
              <Input
                id="dateNotificationApprobation"
                name="dateNotificationApprobation"
                type="date"
                value={formData.dateNotificationApprobation}
                onChange={handleChange}
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
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
          {appelOffre ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
