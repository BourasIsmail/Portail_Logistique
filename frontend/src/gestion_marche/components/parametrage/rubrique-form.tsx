import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RubriqueData = {
  nCompte: string;
  rubrique: string;
};

type RubriqueFormProps = {
  rubrique?: RubriqueData | null;
  onSubmit: (data: RubriqueData) => void;
  onCancel: () => void;
};

export default function RubriqueForm({
  rubrique = null,
  onSubmit,
  onCancel,
}: RubriqueFormProps) {
  const [formData, setFormData] = useState(
    rubrique || {
      nCompte: "",
      rubrique: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="nCompte" className="font-medium text-slate-700">
          Numéro de compte
        </Label>
        <Input
          id="nCompte"
          name="nCompte"
          value={formData.nCompte}
          onChange={handleChange}
          required
          placeholder="Ex: 123456"
          className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
          type="text"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rubrique" className="font-medium text-slate-700">
          Nom de la rubrique
        </Label>
        <Input
          id="rubrique"
          name="rubrique"
          value={formData.rubrique}
          onChange={handleChange}
          required
          placeholder="Ex: Équipement informatique"
          className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
          type="text"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
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
          {rubrique ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
