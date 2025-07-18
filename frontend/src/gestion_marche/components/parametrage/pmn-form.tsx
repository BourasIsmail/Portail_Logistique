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
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="num" className="font-medium text-slate-700">
          Numéro du PMN
        </Label>
        <Input
          id="num"
          name="num"
          value={formData.num}
          onChange={handleChange}
          required
          placeholder="Ex: PMN-2023-001"
          className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
          type="text"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="objet" className="font-medium text-slate-700">
          Objet
        </Label>
        <Textarea
          id="objet"
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          placeholder="Ex: Achat de fournitures de bureau"
          className="min-h-[100px] rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
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
          placeholder="Ex: 50000"
          className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
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
          {pmn ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
