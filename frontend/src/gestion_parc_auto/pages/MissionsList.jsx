import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllMissions,
  deleteMission,
  terminerMission,
} from "@/services/parcAutoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  PlusCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useAuth } from "@/utils/AuthProvider";

export default function MissionsList() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const MISSIONS_PER_PAGE = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [kilometrageFin, setKilometrageFin] = useState("");

  const fetchMissions = useCallback(async (page, query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllMissions(page, MISSIONS_PER_PAGE, query);
      if (response.data && Array.isArray(response.data.content)) {
        setMissions(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setCurrentPage(response.data.number);
      } else {
        throw new Error("Format de réponse API invalide.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des missions.");
      setMissions([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMissions(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm, fetchMissions]);

  const handleDelete = async (id) => {
    try {
      await deleteMission(id);
      toast.success("Mission supprimée avec succès !");
      fetchMissions(currentPage, debouncedSearchTerm);
    } catch (err) {
      toast.error(err.response?.data || "Erreur lors de la suppression.");
    }
  };

  const handleTerminerMission = async (id) => {
    if (!kilometrageFin || isNaN(kilometrageFin)) {
      toast.error("Veuillez entrer un kilométrage final valide.");
      return;
    }
    try {
      await terminerMission(id, parseInt(kilometrageFin, 10));
      toast.success("Mission terminée avec succès !");
      fetchMissions(currentPage, debouncedSearchTerm);
    } catch (err) {
      toast.error(
        err.response?.data || "Erreur lors de la clôture de la mission."
      );
    } finally {
      setKilometrageFin("");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "PLANIFIEE":
        return "info";
      case "EN_COURS":
        return "warning";
      case "TERMINEE":
        return "success";
      case "ANNULEE":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des Missions
          </h1>
          <p className="text-gray-500 mt-1">
            {totalElements} missions trouvées
          </p>
        </div>
        <Button asChild className="shadow-md">
          <Link to="/parc-auto/missions/ajouter">
            <PlusCircle className="mr-2 h-4 w-4" /> Créer une Mission
          </Link>
        </Button>
      </div>

      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par motif ou destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-1/3"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 text-center text-red-600 bg-red-50">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b-2">
              <TableHead className="px-6 py-4 font-bold text-gray-600">
                Motif
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600">
                Véhicule
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600">
                Chauffeur
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600 text-center">
                Statut
              </TableHead>
              <TableHead className="px-6 py-4 text-right font-bold text-gray-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : missions.length > 0 ? (
              missions.map((mission) => (
                <TableRow key={mission.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4 font-medium">
                    {mission.motif}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {mission.vehiculeImmatriculation}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {mission.chauffeurNomComplet}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Badge variant={getStatusVariant(mission.statut)}>
                      {mission.statut
                        ? mission.statut.replace("_", " ")
                        : "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    {/* --- BLOC MANQUANT RÉINTÉGRÉ ICI --- */}
                    {(mission.statut === "PLANIFIEE" ||
                      mission.statut === "EN_COURS") && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="group">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Terminer la Mission
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Veuillez entrer le kilométrage final du véhicule.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="py-4 space-y-2">
                            <Label htmlFor="kilometrageFin">
                              Kilométrage Final
                            </Label>
                            <Input
                              id="kilometrageFin"
                              type="number"
                              placeholder={`Actuel : ${mission.kilometrageDepart} km`}
                              value={kilometrageFin}
                              onChange={(e) =>
                                setKilometrageFin(e.target.value)
                              }
                            />
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setKilometrageFin("")}
                            >
                              Annuler
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleTerminerMission(mission.id)}
                            >
                              Confirmer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}

                    {mission.statut === "PLANIFIEE" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          navigate(`/parc-auto/missions/modifier/${mission.id}`)
                        }
                      >
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                    )}

                    {userDetails?.role === "ROLE_ADMIN" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              La mission "{mission.motif}" sera supprimée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(mission.id)}
                              className="bg-red-600"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  {searchTerm
                    ? `Aucune mission trouvée pour "${searchTerm}"`
                    : "Aucune mission à afficher."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">
          Affichage de {missions.length} sur {totalElements} missions
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Précédent
          </Button>
          <span className="text-sm font-medium p-2">
            {totalPages > 0 ? currentPage + 1 : 0} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
