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
    name: "",
  });

  useEffect(() => {
    if (typeBudget) {
      setFormData(typeBudget);
    } else {
      setFormData({
        id: 0,
        name: "",
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
    <form onSubmit={handleSubmit} className="grid gap-2">
      <div className="space-y-4">
        <Label htmlFor="name" className="font-medium text-slate-700">
          Nom du type de budget
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ex: Budget d'investissement"
          className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
          type="text"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-slate-200 px-4 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-300"
          variant={undefined}
          size={undefined}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className="rounded-md bg-slate-800 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
          variant={undefined}
          size={undefined}
        >
          {typeBudget ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
