import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllChauffeurs, deleteChauffeur } from "@/services/parcAutoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  User as UserIcon,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useAuth } from "@/utils/AuthProvider";

export default function ChauffeursList() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const [chauffeurs, setChauffeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const CHAUFFEURS_PER_PAGE = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchChauffeurs = useCallback(async (page, query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllChauffeurs(page, CHAUFFEURS_PER_PAGE, query);
      if (response.data && Array.isArray(response.data.content)) {
        setChauffeurs(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setCurrentPage(response.data.number);
      } else {
        throw new Error("La réponse de l'API n'a pas le format attendu.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
      setChauffeurs([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChauffeurs(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm, fetchChauffeurs]);

  const handleDelete = async (id) => {
    try {
      await deleteChauffeur(id);
      toast.success("Chauffeur supprimé avec succès !");
      if (chauffeurs.length === 1 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchChauffeurs(currentPage, debouncedSearchTerm);
      }
    } catch (err) {
      toast.error(
        err.response?.data || "Erreur lors de la suppression du chauffeur."
      );
      console.error(err);
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
      case "DISPONIBLE":
        return "success";
      case "EN_MISSION":
        return "info";
      case "EN_CONGE":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des Chauffeurs
          </h1>
          <p className="text-gray-500 mt-1">
            {totalElements} chauffeurs trouvés
          </p>
        </div>
        <Button
          asChild
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
        >
          <Link to="/parc-auto/chauffeurs/ajouter">
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un Chauffeur
          </Link>
        </Button>
      </div>

      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Rechercher par nom ou prénom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-1/3"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg m-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-100 border-b-2 border-gray-200">
              <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider">
                Nom Complet
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider">
                Permis
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider">
                Centre
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider text-center">
                État
              </TableHead>
              <TableHead className="px-6 py-4 text-right font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-10">
                  <div className="flex justify-center items-center text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                    <span>Chargement...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : chauffeurs.length > 0 ? (
              chauffeurs.map((chauffeur) => (
                <TableRow
                  key={chauffeur.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    {chauffeur.prenom} {chauffeur.nom}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {chauffeur.typePermis}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {chauffeur.centreRattachementNom}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Badge variant={getStatusVariant(chauffeur.etat)}>
                      {chauffeur.etat
                        ? chauffeur.etat.replace("_", " ")
                        : "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="group"
                      onClick={() =>
                        navigate(
                          `/parc-auto/chauffeurs/modifier/${chauffeur.id}`
                        )
                      }
                    >
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>

                    {userDetails?.role === "ROLE_ADMIN" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="group">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Le chauffeur "{chauffeur.prenom} {chauffeur.nom}"
                              sera supprimé.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(chauffeur.id)}
                              className="bg-red-600 hover:bg-red-700"
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
                    ? `Aucun chauffeur trouvé pour "${searchTerm}"`
                    : "Aucun chauffeur à afficher."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">
          Affichage de {chauffeurs.length} sur {totalElements} chauffeurs
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
