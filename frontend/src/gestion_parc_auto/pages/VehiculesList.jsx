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
        <div className="container mx-auto py-8 px-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Gestion des Véhicules</h1>
                    <p className="text-gray-500 mt-1">{totalElements} véhicules trouvés</p>
                </div>
                <Button asChild className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900">
                    <Link to="/parc-auto/vehicules/ajouter"><PlusCircle className="mr-2 h-4 w-4" /> Ajouter un Véhicule</Link>
                </Button>
            </div>
            
            <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <Input 
                        type="text"
                        placeholder="Rechercher par immatriculation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full md:w-1/3"
                    />
                </div>
            </div>
            
            {error && <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg m-4">{error}</div>}

            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-100 border-b-2 border-gray-200">
                            <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider">Immatriculation</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider">Marque & Modèle</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider">Centre</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-600 uppercase tracking-wider text-center">Statut</TableHead>
                            <TableHead className="px-6 py-4 text-right font-bold text-gray-600 uppercase tracking-wider">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan="5" className="text-center py-10">
                                    <div className="flex justify-center items-center text-gray-500">
                                        <Loader2 className="h-6 w-6 animate-spin mr-3" />
                                        <span>Chargement des données...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : vehicules.length > 0 ? (
                            vehicules.map((vehicule) => (
                                <TableRow key={vehicule.id} className="hover:bg-gray-50 border-b border-gray-200">
                                    <TableCell className="px-6 py-4 font-mono text-gray-800">{vehicule.immatriculation}</TableCell>
                                    <TableCell className="px-6 py-4 font-medium text-gray-900">{vehicule.marque} {vehicule.modele}</TableCell>
                                    <TableCell className="px-6 py-4 text-gray-600">{vehicule.centreRattachementNom}</TableCell>
                                    <TableCell className="px-6 py-4 text-center">
                                        <Badge variant={getStatusVariant(vehicule.statut)}>
                                            {vehicule.statut ? vehicule.statut.replace('_', ' ') : 'N/A'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="group" onClick={() => navigate(`/parc-auto/vehicules/modifier/${vehicule.id}`)}>
                                            <Pencil className="h-4 w-4 text-blue-600 group-hover:text-blue-600" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="group"><Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-600" /></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader><AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle><AlertDialogDescription>Le véhicule "{vehicule.immatriculation}" sera définitivement supprimé.</AlertDialogDescription></AlertDialogHeader>
                                                <AlertDialogFooter><AlertDialogCancel>Annuler</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(vehicule.id)} className="bg-red-600 hover:bg-red-700">Supprimer</AlertDialogAction></AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="5" className="text-center py-10 text-gray-500">
                                    {searchTerm ? `Aucun véhicule trouvé pour "${searchTerm}"` : "Aucun véhicule à afficher."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            
            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                    Affichage de {vehicules.length} sur {totalElements} véhicules
                </span>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 0}>Précédent</Button>
                    <span className="text-sm font-medium p-2">{totalPages > 0 ? currentPage + 1 : 0} / {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Suivant</Button>
                </div>
            </div>
            <Toaster richColors />
        </div>
    );
}