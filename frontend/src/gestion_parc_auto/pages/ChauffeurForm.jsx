import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createChauffeur,
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

export default function ChauffeurForm() {
  const navigate = useNavigate();

  const [chauffeurData, setChauffeurData] = useState({
    nom: "",
    prenom: "",
    age: 18,
    etat: "DISPONIBLE",
    typePermis: "",
    stable: false,
    centreRattachementId: null,
  });

  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const centresRes = await getAllCentresForSelect();
        setCentres(centresRes.data);
      } catch (err) {
        setError("Impossible de charger la liste des centres.");
        toast.error("Erreur de chargement des centres.");
      } finally {
        setLoading(false);
      }
    };
    loadDependencies();
  }, []);

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

    if (!chauffeurData.nom || !chauffeurData.prenom) {
      toast.error("Le nom et le prénom sont obligatoires.");
      return;
    }
    if (!chauffeurData.centreRattachementId) {
      toast.error("Veuillez sélectionner un centre de rattachement.");
      return;
    }

    setSubmitting(true);
    try {
      const dataToSend = {
        ...chauffeurData,
        centreRattachementId: parseInt(chauffeurData.centreRattachementId, 10),
        age: parseInt(chauffeurData.age, 10) || 18,
      };

      await createChauffeur(dataToSend);
      toast.success("Chauffeur ajouté avec succès !");
      setTimeout(() => navigate("/parc-auto/chauffeurs"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Erreur lors de la création du chauffeur."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-4xl mx-auto border-gray-300 shadow-lg">
          <CardHeader className="bg-slate-50 border-b p-6">
            <CardTitle className="text-3xl font-bold text-slate-800">
              Ajouter un Nouveau Chauffeur
            </CardTitle>
            <CardDescription className="text-slate-500">
              Remplissez les informations ci-dessous.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-12">
            {/* Section 1: Informations Personnelles */}
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

            {/* Section 2: Détails Professionnels */}
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
                    placeholder="ex: B, C"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="centreRattachementId">
                    Centre de Rattachement
                  </Label>
                  <Select
                    name="centreRattachementId"
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
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Enregistrement...
                </>
              ) : (
                "Enregistrer le Chauffeur"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
