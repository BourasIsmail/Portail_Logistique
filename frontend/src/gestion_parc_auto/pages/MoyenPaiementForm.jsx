import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMoyenPaiement } from "@/services/parcAutoService";
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
import { Toaster, toast } from "sonner";
import { CreditCard, Fuel, Zap, Tag, Loader2 } from "lucide-react";

export default function MoyenPaiementForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Champs communs
    typeClasse: "", // Le champ clé pour la logique dynamique
    numero: "",
    fournisseur: "",
    statut: "ACTIF",
    // Champs spécifiques
    typeCarte: "CARTE_PLAFONNEE",
    plafondOuValeur: 0,
    solde: 0,
    montantDisponible: 0,
    typeUtilisation: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.typeClasse || !formData.numero || !formData.fournisseur) {
      toast.error("Le type, le numéro et le fournisseur sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      await createMoyenPaiement(formData);
      toast.success("Moyen de paiement ajouté avec succès !");
      setTimeout(() => navigate("/parc-auto/moyens-paiement"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de la création.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto border-gray-300 shadow-lg">
          <CardHeader className="bg-slate-50 border-b p-6">
            <CardTitle className="text-3xl font-bold text-slate-800">
              Ajouter un Moyen de Paiement
            </CardTitle>
            <CardDescription className="text-slate-500">
              Remplissez les informations ci-dessous.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Section 1: Informations Générales */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 border-b pb-3">
                <CreditCard className="h-7 w-7 text-blue-500" />
                <h3 className="text-xl font-semibold">
                  Informations Générales
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="typeClasse">Type de Moyen de Paiement</Label>
                  <Select
                    name="typeClasse"
                    onValueChange={(v) => handleSelectChange("typeClasse", v)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CarteCarburant">
                        Carte Carburant
                      </SelectItem>
                      <SelectItem value="BadgeJawaz">Badge Jawaz</SelectItem>
                      <SelectItem value="Vignette">
                        Vignette / Bon de Paiement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Numéro / Identifiant</Label>
                  <Input
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fournisseur">Fournisseur</Label>
                  <Input
                    id="fournisseur"
                    name="fournisseur"
                    value={formData.fournisseur}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statut">Statut</Label>
                  <Select
                    name="statut"
                    onValueChange={(v) => handleSelectChange("statut", v)}
                    defaultValue="ACTIF"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIF">Actif</SelectItem>
                      <SelectItem value="INACTIF">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* --- FORMULAIRES CONDITIONNELS --- */}

            {formData.typeClasse === "CarteCarburant" && (
              <section className="space-y-6 animate-in fade-in-50">
                <div className="flex items-center space-x-3 border-b pb-3">
                  <Fuel className="h-7 w-7 text-purple-500" />
                  <h3 className="text-xl font-semibold">
                    Détails Carte Carburant
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="typeCarte">Type de Carte</Label>
                    <Select
                      name="typeCarte"
                      onValueChange={(v) => handleSelectChange("typeCarte", v)}
                      defaultValue="CARTE_PLAFONNEE"
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CARTE_PLAFONNEE">
                          Plafonnée
                        </SelectItem>
                        <SelectItem value="CARNET_BONS">
                          Carnet de bons
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plafondOuValeur">
                      Plafond / Valeur (DH)
                    </Label>
                    <Input
                      id="plafondOuValeur"
                      name="plafondOuValeur"
                      type="number"
                      step="0.01"
                      value={formData.plafondOuValeur}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
            )}

            {formData.typeClasse === "BadgeJawaz" && (
              <section className="space-y-6 animate-in fade-in-50">
                <div className="flex items-center space-x-3 border-b pb-3">
                  <Zap className="h-7 w-7 text-yellow-500" />
                  <h3 className="text-xl font-semibold">Détails Badge Jawaz</h3>
                </div>
                <div className="grid grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="solde">Solde Actuel (DH)</Label>
                    <Input
                      id="solde"
                      name="solde"
                      type="number"
                      step="0.01"
                      value={formData.solde}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
            )}

            {formData.typeClasse === "Vignette" && (
              <section className="space-y-6 animate-in fade-in-50">
                <div className="flex items-center space-x-3 border-b pb-3">
                  <Tag className="h-7 w-7 text-green-500" />
                  <h3 className="text-xl font-semibold">
                    Détails Vignette / Bon
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="montantDisponible">
                      Montant Disponible (DH)
                    </Label>
                    <Input
                      id="montantDisponible"
                      name="montantDisponible"
                      type="number"
                      step="0.01"
                      value={formData.montantDisponible}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="typeUtilisation">Type d'Utilisation</Label>
                    <Input
                      id="typeUtilisation"
                      name="typeUtilisation"
                      value={formData.typeUtilisation}
                      onChange={handleChange}
                      placeholder="ex: Réparations"
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
              onClick={() => navigate("/parc-auto/moyens-paiement")}
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
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4" /> Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
