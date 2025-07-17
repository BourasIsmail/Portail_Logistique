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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className={undefined}>
        <CardHeader className={undefined}>
          <CardTitle className={undefined}>Informations du contrat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference" className={undefined}>
                Référence
              </Label>
              <Input
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="anneeBudgetaire" className={undefined}>
                Année budgétaire
              </Label>
              <Input
                id="anneeBudgetaire"
                name="anneeBudgetaire"
                value={formData.anneeBudgetaire}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeAO" className={undefined}>
                Type d'appel d'offre
              </Label>
              <Select
                value={formData.typeAOId?.toString() || ""}
                onValueChange={(value) => handleSelectChange("typeAOId", value)}
              >
                <SelectTrigger className={undefined}>
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
              <Label htmlFor="rubrique" className={undefined}>
                Rubrique
              </Label>
              <Select
                value={formData.rubriqueId?.toString() || ""}
                onValueChange={(value) => handleRubriqueChange(value)}
              >
                <SelectTrigger className={undefined}>
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
              <Label htmlFor="objet" className={undefined}>
                Objet
              </Label>
              <Textarea
                id="objet"
                name="objet"
                value={formData.objet ? formData.objet : ""}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimation" className={undefined}>
                Estimation (DH)
              </Label>
              <Input
                id="estimation"
                name="estimation"
                type="number"
                value={formData.estimation}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="datePublication" className={undefined}>
                Date de publication dans le portail
              </Label>
              <Input
                id="datePublication"
                name="datePublication"
                type="date"
                value={formData.datePublication}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOuverture" className={undefined}>
                Date de ouverture des plis
              </Label>
              <Input
                id="dateOuverture"
                name="dateOuverture"
                type="date"
                value={formData.dateOuverture}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFinTravaux" className={undefined}>
                Date de fin des travaux de la commission
              </Label>
              <Input
                id="dateFinTravaux"
                name="dateFinTravaux"
                type="date"
                value={formData.dateFinTravaux}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateNotificationApprobation"
                className={undefined}
              >
                Date de notification de l'approbation
              </Label>
              <Input
                id="dateNotificationApprobation"
                name="dateNotificationApprobation"
                type="date"
                value={formData.dateNotificationApprobation}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className={undefined}
          size={undefined}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className={undefined}
          variant={undefined}
          size={undefined}
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
