import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PMNData = {
  num: string;
  objet: string;
  montant: string | number;
};

type PMNFormProps = {
  pmn: PMNData | null;
  onSubmit: (data: PMNData & { montant: number }) => void;
  onCancel: () => void;
};

export default function PMNForm({
  pmn = null,
  onSubmit,
  onCancel,
}: PMNFormProps) {
  const [formData, setFormData] = useState<PMNData>(
    pmn || {
      num: "",
      objet: "",
      montant: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert montant to number
    const formattedData = {
      ...formData,
      montant: Number.parseFloat(formData.montant.toString()),
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="num" className={undefined}>
          Numéro du PMN
        </Label>
        <Input
          id="num"
          name="num"
          value={formData.num}
          onChange={handleChange}
          required
          placeholder="Ex: PMN-2023-001"
          className={undefined}
          type={undefined}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="objet" className={undefined}>
          Objet
        </Label>
        <Textarea
          id="objet"
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          placeholder="Ex: Achat de fournitures"
          className={undefined}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="montant" className={undefined}>
          Montant (DH)
        </Label>
        <Input
          id="montant"
          name="montant"
          type="number"
          value={formData.montant}
          onChange={handleChange}
          required
          placeholder="Ex: 50000"
          className={undefined}
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
