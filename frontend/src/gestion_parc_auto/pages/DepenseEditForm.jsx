import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDepenseById,
  updateDepense,
  getAllVehiculesForSelect,
  getAllMoyensPaiementForSelect,
} from "@/services/parcAutoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import { DollarSign, Wrench, Fuel, Zap, Loader2 } from "lucide-react";

export default function DepenseEditForm() {
  const navigate = useNavigate();
  const { depenseId } = useParams();

  const [depenseData, setDepenseData] = useState(null);
  const [vehicules, setVehicules] = useState([]);
  const [moyensPaiement, setMoyensPaiement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [depenseRes, vehiculesRes, moyensPaiementRes] = await Promise.all(
          [
            getDepenseById(depenseId),
            getAllVehiculesForSelect(),
            getAllMoyensPaiementForSelect(),
          ]
        );

        const data = depenseRes.data;
        setDepenseData({
          ...data,
          vehiculeId: data.vehiculeId?.toString(),
          moyenPaiementId: data.moyenPaiementId?.toString(),
        });

        setVehicules(vehiculesRes.data);
        setMoyensPaiement(moyensPaiementRes.data);
      } catch (err) {
        toast.error("Erreur de chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [depenseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setDepenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !depenseData.typeDepense ||
      !depenseData.vehiculeId ||
      !depenseData.moyenPaiementId
    ) {
      toast.error("Tous les champs obligatoires doivent être remplis.");
      return;
    }
    setSubmitting(true);
    try {
      const dataToSend = {
        ...depenseData,
        vehiculeId: parseInt(depenseData.vehiculeId, 10),
        moyenPaiementId: parseInt(depenseData.moyenPaiementId, 10),
      };
      await updateDepense(depenseId, dataToSend);
      toast.success("Dépense mise à jour avec succès !");
      setTimeout(() => navigate("/parc-auto/depenses"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erreur lors de la mise à jour."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;
  if (!depenseData)
    return (
      <div className="p-8 text-center text-red-500">Dépense non trouvée.</div>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-4xl mx-auto border-gray-300 shadow-lg">
          <CardHeader className="bg-slate-50 border-b p-6">
            <CardTitle className="text-3xl font-bold text-slate-800">
              Modifier la Dépense
            </CardTitle>
            <CardDescription className="text-slate-500">
              Mettez à jour les détails de la dépense.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-12">
            {/* Section 1: Informations Générales */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 border-b pb-3">
                <DollarSign className="h-7 w-7 text-green-500" />
                <h3 className="text-xl font-semibold">
                  Informations Générales
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="typeDepense">Type de Dépense</Label>
                  <Select
                    name="typeDepense"
                    value={depenseData.typeDepense}
                    disabled
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="PleinCarburant">
                        Plein de Carburant
                      </SelectItem>
                      <SelectItem value="RechargeJawaz">
                        Recharge Jawaz
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={depenseData.date || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="montant">Montant (DH)</Label>
                  <Input
                    id="montant"
                    name="montant"
                    type="number"
                    step="0.01"
                    value={depenseData.montant || 0}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehiculeId">Véhicule</Label>
                  <Select
                    name="vehiculeId"
                    value={depenseData.vehiculeId || ""}
                    onValueChange={(v) => handleSelectChange("vehiculeId", v)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicules.map((v) => (
                        <SelectItem key={v.id} value={v.id.toString()}>
                          {v.immatriculation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moyenPaiementId">Moyen de Paiement</Label>
                  <Select
                    name="moyenPaiementId"
                    value={depenseData.moyenPaiementId || ""}
                    onValueChange={(v) =>
                      handleSelectChange("moyenPaiementId", v)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {moyensPaiement.map((mp) => (
                        <SelectItem key={mp.id} value={mp.id.toString()}>
                          {mp.numero} ({mp.fournisseur})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* --- FORMULAIRES CONDITIONNELS --- */}
            {depenseData.typeDepense === "Maintenance" && (
              <section className="space-y-6 animate-in fade-in-50">
                <div className="flex items-center space-x-3 border-b pb-3">
                  <Wrench className="h-7 w-7 text-orange-500" />
                  <h3 className="text-xl font-semibold">
                    Détails de la Maintenance
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="typeIntervention">
                      Type d'Intervention
                    </Label>
                    <Input
                      id="typeIntervention"
                      name="typeIntervention"
                      value={depenseData.typeIntervention || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nomGarage">Nom du Garage</Label>
                    <Input
                      id="nomGarage"
                      name="nomGarage"
                      value={depenseData.nomGarage || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={depenseData.description || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
            )}

            {depenseData.typeDepense === "PleinCarburant" && (
              <section className="space-y-6 animate-in fade-in-50">
                <div className="flex items-center space-x-3 border-b pb-3">
                  <Fuel className="h-7 w-7 text-purple-500" />
                  <h3 className="text-xl font-semibold">Détails du Plein</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="litres">Litres</Label>
                    <Input
                      id="litres"
                      name="litres"
                      type="number"
                      step="0.01"
                      value={depenseData.litres || 0}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kilometrage">Kilométrage au compteur</Label>
                    <Input
                      id="kilometrage"
                      name="kilometrage"
                      type="number"
                      value={depenseData.kilometrage || 0}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-4 bg-slate-50 border-t p-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/parc-auto/depenses")}
            >
              Annuler
            </Button>
            <Button
              className={
                "rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
              }
              type="submit"
              size="lg"
              disabled={submitting}
            >
              {submitting ? "Mise à jour..." : "Enregistrer les Modifications"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
