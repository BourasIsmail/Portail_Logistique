import React, { useState, useEffect } from 'react';
import { getAllVehicules } from '@/services/parcAutoService';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

//hey
export default function VehiculesList() {
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicules = async () => {
            try {
                const response = await getAllVehicules();
                setVehicules(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des véhicules.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicules();
    }, []);

    if (loading) return <div className="text-center py-4">Chargement des véhicules...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

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