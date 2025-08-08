import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateMission,
  getMissionById,
  getVehiculesDisponibles,
  getChauffeursDisponibles,
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
import { Route, Calendar, Users, Loader2 } from "lucide-react";

export default function MissionEditForm() {
  const navigate = useNavigate();
  const { missionId } = useParams();

  const [missionData, setMissionData] = useState(null);
  const [vehicules, setVehicules] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const centreFiltre = "SIÈGE CENTRAL";
        const [missionRes, vehiculesRes, chauffeursRes] = await Promise.all([
          getMissionById(missionId),
          getVehiculesDisponibles(centreFiltre),
          getChauffeursDisponibles(centreFiltre),
        ]);

        const data = missionRes.data;
        const formatDate = (date) =>
          date ? new Date(date).toISOString().slice(0, 16) : "";

        const vehiculeActuel = {
          id: data.vehiculeId,
          immatriculation: data.vehiculeImmatriculation,
        };
        const chauffeurActuel = {
          id: data.chauffeurId,
          prenom: data.chauffeurNomComplet.split(" ")[0],
          nom: data.chauffeurNomComplet.split(" ")[1],
        };

        const finalVehicules = vehiculesRes.data.some(
          (v) => v.id === vehiculeActuel.id
        )
          ? vehiculesRes.data
          : [vehiculeActuel, ...vehiculesRes.data];
        const finalChauffeurs = chauffeursRes.data.some(
          (c) => c.id === chauffeurActuel.id
        )
          ? chauffeursRes.data
          : [chauffeurActuel, ...chauffeursRes.data];

        setMissionData({
          ...data,
          dateDebut: formatDate(data.dateDebut),
          dateFin: formatDate(data.dateFin),
          vehiculeId: data.vehiculeId?.toString(),
          chauffeurId: data.chauffeurId?.toString(),
        });

        setVehicules(finalVehicules);
        setChauffeurs(finalChauffeurs);
      } catch (err) {
        toast.error("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [missionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMissionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setMissionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !missionData.motif ||
      !missionData.vehiculeId ||
      !missionData.chauffeurId
    ) {
      toast.error("Tous les champs sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const dataToSend = {
        ...missionData,
        vehiculeId: parseInt(missionData.vehiculeId, 10),
        chauffeurId: parseInt(missionData.chauffeurId, 10),
      };
      await updateMission(missionId, dataToSend);
      toast.success("Mission mise à jour avec succès !");
      setTimeout(() => navigate("/parc-auto/missions"), 1500);
    } catch (err) {
      toast.error(err.response?.data || "Erreur lors de la mise à jour.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;
  if (!missionData)
    return (
      <div className="p-8 text-center text-red-500">Mission non trouvée.</div>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-4xl mx-auto border-gray-300 shadow-lg">
          <CardHeader className="bg-slate-50 border-b p-6">
            <CardTitle className="text-3xl font-bold text-slate-800">
              Modifier la Mission
            </CardTitle>
            <CardDescription className="text-slate-500">
              Mettez à jour les détails de la mission.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center space-x-3 border-b pb-3">
                <Route className="h-7 w-7 text-blue-500" />
                <h3 className="text-xl font-semibold">Détails de la Mission</h3>
              </div>
              {/* On passe en 3 colonnes pour le nouveau champ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="motif">Motif</Label>
                  <Input
                    id="motif"
                    name="motif"
                    value={missionData.motif || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    name="destination"
                    value={missionData.destination || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* --- NOUVEAU CHAMP AJOUTÉ ICI --- */}
                <div className="space-y-2">
                  <Label htmlFor="numeroSuiviRh">N° Suivi RH (Optionnel)</Label>
                  <Input
                    id="numeroSuiviRh"
                    name="numeroSuiviRh"
                    value={missionData.numeroSuiviRh || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center space-x-3 border-b pb-3">
                <Calendar className="h-7 w-7 text-red-500" />
                <h3 className="text-xl font-semibold">Dates</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateDebut">Date et Heure de Début</Label>
                  <Input
                    id="dateDebut"
                    name="dateDebut"
                    type="datetime-local"
                    value={missionData.dateDebut}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFin">Date et Heure de Fin Prévue</Label>
                  <Input
                    id="dateFin"
                    name="dateFin"
                    type="datetime-local"
                    value={missionData.dateFin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center space-x-3 border-b pb-3">
                <Users className="h-7 w-7 text-purple-500" />
                <h3 className="text-xl font-semibold">Affectation</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehiculeId">Véhicule</Label>
                  <Select
                    name="vehiculeId"
                    value={missionData.vehiculeId || ""}
                    onValueChange={(v) => handleSelectChange("vehiculeId", v)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicules.map((v) => (
                        <SelectItem key={v.id} value={v.id.toString()}>
                          {v.marque} {v.modele} ({v.immatriculation})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chauffeurId">Chauffeur</Label>
                  <Select
                    name="chauffeurId"
                    value={missionData.chauffeurId || ""}
                    onValueChange={(v) => handleSelectChange("chauffeurId", v)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {chauffeurs.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.prenom} {c.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 bg-slate-50 border-t p-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/parc-auto/missions")}
            >
              Annuler
            </Button>
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Mise à jour..." : "Enregistrer les Modifications"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
