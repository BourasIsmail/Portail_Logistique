import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllDepenses, deleteDepense } from "@/services/parcAutoService"; // Assurez-vous d'avoir deleteDepense dans votre service
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

export default function DepensesList() {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [depenses, setDepenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const DEPENSES_PER_PAGE = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchDepenses = useCallback(async (page, query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllDepenses(page, DEPENSES_PER_PAGE, query);
      if (response.data && Array.isArray(response.data.content)) {
        setDepenses(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setCurrentPage(response.data.number);
      } else {
        throw new Error("La réponse de l'API n'a pas le format attendu.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des dépenses.");
      setDepenses([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepenses(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm, fetchDepenses]);

  const handleDelete = async (id) => {
    try {
      await deleteDepense(id); // Assurez-vous que cette fonction existe dans le service API
      toast.success("Dépense supprimée avec succès !");
      fetchDepenses(currentPage, debouncedSearchTerm);
    } catch (err) {
      toast.error(err.response?.data || "Erreur lors de la suppression.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case "Maintenance":
        return "warning";
      case "PleinCarburant":
        return "info";
      case "RechargeJawaz":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des Dépenses
          </h1>
          <p className="text-gray-500 mt-1">
            {totalElements} dépenses trouvées
          </p>
        </div>
        <Button
          asChild
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
        >
          <Link to="/parc-auto/depenses/ajouter">
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Dépense
          </Link>
        </Button>
      </div>

      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par type, véhicule..."
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
                Date
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600">
                Montant
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-gray-600">
                Véhicule
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
            ) : depenses.length > 0 ? (
              depenses.map((depense) => (
                <TableRow key={depense.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4">
                    <Badge variant={getTypeVariant(depense.typeDepense)}>
                      {depense.typeDepense.replace(/([A-Z])/g, " $1").trim()}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {new Date(depense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium">
                    {depense.montant.toFixed(2)} DH
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {depense.vehiculeImmatriculation}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/parc-auto/depenses/modifier/${depense.id}`)
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
                              La dépense du{" "}
                              {new Date(depense.date).toLocaleDateString()} sera
                              supprimée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(depense.id)}
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
                    ? `Aucune dépense trouvée pour "${searchTerm}"`
                    : "Aucune dépense à afficher."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">
          Affichage de {depenses.length} sur {totalElements} dépenses
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
