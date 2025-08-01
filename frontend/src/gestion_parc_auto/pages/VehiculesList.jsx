import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllVehicules, deleteVehicule } from '@/services/parcAutoService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, PlusCircle, Loader2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useDebounce } from 'use-debounce';

export default function VehiculesList() {
    const navigate = useNavigate();
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const VEHICULES_PER_PAGE = 10;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    const fetchVehicules = useCallback(async (page, query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllVehicules(page, VEHICULES_PER_PAGE, query);
            if (response.data && Array.isArray(response.data.content)) {
                setVehicules(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number);
            } else {
                throw new Error("La réponse de l'API n'a pas le format attendu.");
            }
        } catch (err) {
            setError('Erreur lors de la récupération des données. Le serveur est peut-être indisponible.');
            setVehicules([]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (searchTerm !== debouncedSearchTerm) {
            setCurrentPage(0);
        }
        fetchVehicules(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm, fetchVehicules]);

    const handleDelete = async (id) => {
        try {
            await deleteVehicule(id);
            toast.success('Véhicule supprimé avec succès !');
            if (vehicules.length === 1 && currentPage > 0) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchVehicules(currentPage, debouncedSearchTerm);
            }
        } catch (err) {
            toast.error(err.response?.data || 'Erreur lors de la suppression du véhicule.');
            console.error(err);
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'EN_SERVICE': return 'success';
            case 'EN_MISSION': return 'info';
            case 'EN_MAINTENANCE': return 'warning';
            case 'HORS_SERVICE': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Liste des Véhicules</h1>
          <Button
            asChild
            className={
              "rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
            }
          >
            <Link to="/parc-auto/vehicules/ajouter">Ajouter un Véhicule</Link>
          </Button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Immatriculation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marque & Modèle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kilométrage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicules.map((vehicule) => (
                <tr key={vehicule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {vehicule.immatriculation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicule.marque} {vehicule.modele}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicule.statut === "EN_SERVICE"
                          ? "bg-green-100 text-green-800"
                          : vehicule.statut === "EN_MISSION"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {vehicule.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicule.kilometrage} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 hover:bg-blue-100"
                    >
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}