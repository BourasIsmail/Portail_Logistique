import React, { JSX } from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TypeAO } from "@/gestion_marche/types";

interface TypeAOFormProps {
  typeAO: TypeAO | null;
  onSubmit: (formData: TypeAO) => void;
  onCancel: () => void;
}

export default function TypeAOForm({
  typeAO,
  onSubmit,
  onCancel,
}: TypeAOFormProps): JSX.Element {
  const [formData, setFormData] = useState<TypeAO>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    if (typeAO) {
      setFormData(typeAO);
    } else {
      setFormData({
        id: 0,
        name: "",
      });
    }
  }, [typeAO]);

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
        <Label htmlFor="name" className={undefined}>
          Nom du type d'appel d'offre
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ex: Offre ouverte"
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
