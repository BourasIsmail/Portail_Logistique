import React, { JSX } from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TypeBudget } from "@/gestion_marche/types";

interface TypeBudgetFormProps {
  typeBudget: TypeBudget | null;
  onSubmit: (formData: TypeBudget) => void;
  onCancel: () => void;
}

export default function TypeBudgetForm({
  typeBudget,
  onSubmit,
  onCancel,
}: TypeBudgetFormProps): JSX.Element {
  const [formData, setFormData] = useState<TypeBudget>({
    id: 0,
    nom: "",
  });

  useEffect(() => {
    if (typeBudget) {
      setFormData(typeBudget);
    } else {
      setFormData({
        id: 0,
        nom: "",
      });
    }
  }, [typeBudget]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nom" className={undefined}>
          Nom du type de budget
        </Label>
        <Input
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          placeholder="Ex: Budget d'investissement"
          className={undefined}
          type={undefined}
        />
      </div>

      <div className="flex justify-end space-x-4">
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
