import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar';
import { Car, User, Route as MissionIcon } from 'lucide-react';
import VehiculesList from './VehiculesList'; 
export default function ParcAutoLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Colonne de navigation à gauche (le tableau de bord) */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Parc Auto</h2>
                </div>
                <nav className="mt-4">
                    <Link to="/parc-auto/vehicules" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <Car className="h-5 w-5 mr-3" />
                        Véhicules
                    </Link>
                    <Link to="/parc-auto/chauffeurs" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <User className="h-5 w-5 mr-3" />
                        Chauffeurs
                    </Link>
                    <Link to="/parc-auto/missions" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <MissionIcon className="h-5 w-5 mr-3" />
                        Missions
                    </Link>
                </nav>
            </aside>

            {/* Contenu principal à droite */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    {/* C'est ici que les composants enfants (comme VehiculesList) seront affichés */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}