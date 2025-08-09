import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllMoyensPaiement,
  deleteMoyenPaiement,
} from "@/services/parcAutoService"; // Assurez-vous d'avoir ces fonctions
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
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useAuth } from "@/utils/AuthProvider";

export default function MoyensPaiementList() {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [moyensPaiement, setMoyensPaiement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchMoyensPaiement = useCallback(async (page, query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllMoyensPaiement(page, ITEMS_PER_PAGE, query);
      if (response.data && Array.isArray(response.data.content)) {
        setMoyensPaiement(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setCurrentPage(response.data.number);
      } else {
        throw new Error("Format de réponse API invalide.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
      setMoyensPaiement([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoyensPaiement(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm, fetchMoyensPaiement]);

  const handleDelete = async (id) => {
    try {
      await deleteMoyenPaiement(id);
      toast.success("Moyen de paiement supprimé avec succès !");
      fetchMoyensPaiement(currentPage, debouncedSearchTerm);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erreur lors de la suppression."
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
    return status === "ACTIF" ? "success" : "destructive";
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case "CarteCarburant":
        return "info";
      case "BadgeJawaz":
        return "warning";
      case "Vignette":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des Moyens de Paiement
          </h1>
          <p className="text-gray-500 mt-1">{totalElements} éléments trouvés</p>
        </div>
        <Button
          asChild
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
        >
          <Link to="/parc-auto/moyens-paiement/ajouter">
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter
          </Link>
        </Button>
      </div>

      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par numéro ou fournisseur..."
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
                Type
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600">
                Numéro
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600">
                Fournisseur
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
            ) : moyensPaiement.length > 0 ? (
              moyensPaiement.map((moyen) => (
                <TableRow key={moyen.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4">
                    <Badge variant={getTypeVariant(moyen.typeClasse)}>
                      {moyen.typeClasse}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-mono">
                    {moyen.numero}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {moyen.fournisseur}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Badge variant={getStatusVariant(moyen.statut)}>
                      {moyen.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(
                          `/parc-auto/moyens-paiement/modifier/${moyen.id}`
                        )
                      }
                    >
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
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
                              Le moyen de paiement "{moyen.numero}" sera
                              supprimé.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(moyen.id)}
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
                    ? `Aucun résultat pour "${searchTerm}"`
                    : "Aucun moyen de paiement à afficher."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">
          Affichage de {moyensPaiement.length} sur {totalElements} éléments
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
