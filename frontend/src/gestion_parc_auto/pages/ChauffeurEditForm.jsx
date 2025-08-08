import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateChauffeur,
  getChauffeurById,
  getAllCentresForSelect,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster, toast } from "sonner";
import { User, Info, Loader2 } from "lucide-react";

export default function ChauffeurEditForm() {
  const navigate = useNavigate();
  const { chauffeurId } = useParams();

  const [chauffeurData, setChauffeurData] = useState(null);
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [chauffeurRes, centresRes] = await Promise.all([
          getChauffeurById(chauffeurId),
          getAllCentresForSelect(),
        ]);
        const data = chauffeurRes.data;
        setChauffeurData({
          ...data,
          centreRattachementId: data.centreRattachementId?.toString() || null,
        });
        setCentres(centresRes.data);
      } catch (err) {
        toast.error("Erreur lors du chargement des données du chauffeur.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [chauffeurId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChauffeurData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (name, value) => {
    setChauffeurData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (name, checked) => {
    setChauffeurData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !chauffeurData.nom ||
      !chauffeurData.prenom ||
      !chauffeurData.centreRattachementId
    ) {
      toast.error("Tous les champs marqués d'un * sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const dataToSend = {
        ...chauffeurData,
        centreRattachementId: parseInt(chauffeurData.centreRattachementId, 10),
        age: parseInt(chauffeurData.age, 10),
      };
      await updateChauffeur(chauffeurId, dataToSend);
      toast.success("Chauffeur mis à jour avec succès !");
      setTimeout(() => navigate("/parc-auto/chauffeurs"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erreur lors de la mise à jour."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;
  if (!chauffeurData)
    return (
      <div className="p-8 text-center text-red-500">Chauffeur non trouvé.</div>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-4xl mx-auto border-gray-300 shadow-lg">
          {/* 7. Changer les titres */}
          <CardHeader className="bg-slate-50 border-b p-6">
            <CardTitle className="text-3xl font-bold text-slate-800">
              Modifier le Chauffeur
            </CardTitle>
            <CardDescription className="text-slate-500">
              Mettez à jour les informations de {chauffeurData.prenom}{" "}
              {chauffeurData.nom}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center space-x-3 border-b pb-3">
                <User className="h-7 w-7 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Informations Personnelles
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    value={chauffeurData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={chauffeurData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Âge</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={chauffeurData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center space-x-3 border-b pb-3">
                <Info className="h-7 w-7 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Détails Professionnels
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="space-y-2">
                  <Label htmlFor="typePermis">Type de Permis</Label>
                  <Input
                    id="typePermis"
                    name="typePermis"
                    value={chauffeurData.typePermis}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="centreRattachementId">
                    Centre de Rattachement
                  </Label>
                  <Select
                    name="centreRattachementId"
                    value={chauffeurData.centreRattachementId}
                    onValueChange={(v) =>
                      handleSelectChange("centreRattachementId", v)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {centres.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stable"
                    name="stable"
                    checked={chauffeurData.stable}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("stable", checked)
                    }
                  />
                  <Label htmlFor="stable">Chauffeur Stable</Label>
                </div>
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 bg-slate-50 border-t p-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/parc-auto/chauffeurs")}
            >
              Annuler
            </Button>
            {/* 8. Changer le texte du bouton de soumission */}
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Mise à jour..." : "Enregistrer les Modifications"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
