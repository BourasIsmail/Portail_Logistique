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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nCompte" className={undefined}>
          Numéro de compte
        </Label>
        <Input
          id="nCompte"
          name="nCompte"
          value={formData.nCompte}
          onChange={handleChange}
          required
          placeholder="Ex: 123456"
          className={undefined}
          type={undefined}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rubrique" className={undefined}>
          Nom de la rubrique
        </Label>
        <Input
          id="rubrique"
          name="rubrique"
          value={formData.rubrique}
          onChange={handleChange}
          required
          placeholder="Ex: Équipement informatique"
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
