import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "@/components/data-table";
import FormModal from "@/components/form-modal";
import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";

import type { Column } from "@/gestion_marche/types";
import { ArrowLeftCircleIcon, FilePlus2 } from "lucide-react";

import api from "@/utils/api";
import { Badge } from "@/components/ui/badge";
import type { AppelOffre } from "@/gestion_marche/types";
import { toast } from "sonner";
import { exportToExcel } from "@/utils/ExportToExcel";
// Mock data for demonstration

// Define columns for the data table - Respecter l'ordre des champs du modèle
const columns: Column<AppelOffre>[] = [
  // { key: "id", header: "ID" },
  { key: "reference", header: "Référence" },
  {
    key: "anneeBudgetaire",
    header: <span className="whitespace-break-spaces">Année budgétaire</span>,
  },
  {
    key: "objet",
    header: "Objet",
    render: (item: AppelOffre) => (
      <div className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.objet}
      </div>
    ),
  },
  {
    key: "estimation",
    header: "Estimation",
    render: (item: AppelOffre) => `${item.estimation.toLocaleString()} DH`,
  },
  {
    key: "rubrique",
    header: "Rubrique",
    render: (item: AppelOffre) => item.rubrique?.rubrique || "-",
  },
  {
    key: "typeAO",
    header: (
      <span className="whitespace-break-spaces">Type d'appel d'offre</span>
    ),
    render: (item: AppelOffre) => item.typeAO?.name || "-",
  },
  {
    key: "datePublication",
    header: (
      <span className="whitespace-break-spaces">
        Date de pub dans le portail
      </span>
    ),
  },
  {
    key: "dateOuverture",
    header: (
      <span className="whitespace-break-spaces">Date d'ouverture des plis</span>
    ),
  },
  {
    key: "dateFinTravaux",
    header: (
      <span className="whitespace-break-spaces">
        Date de fin des travaux de la commission
      </span>
    ),
  },
  {
    key: "dateNotificationApprobation",
    header: (
      <span className="whitespace-break-spaces">
        Date notification de l'approbation
      </span>
    ),
  },
];

export default function AppelOffrePage() {
  const [appelOffres, setAppelOffres] = useState<AppelOffre[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAO, setCurrentAO] = useState<AppelOffre | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchAOs = async () => {
      try {
        const response = await api.get("/admin/get-all-appel-offres");
        if (response.status === 200) {
          console.log("Fetched AOs:", response.data);
          setAppelOffres(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching AOs:", error);
      }
    };
    fetchAOs();
  }, []);

  if (loading) {
    return;
  }

  const handleAdd = () => {
    setCurrentAO(null);
    setModalTitle("Ajouter un appel d'offre");
    setIsModalOpen(true);
  };

  const handleEdit = (contrat: AppelOffre) => {
    setCurrentAO({
      ...contrat,
      rubriqueId: contrat.rubrique.id,
      typeAOId: contrat.typeAO.id,
    });
    setModalTitle("Modifier l'appel d'offre");
    setIsModalOpen(true);
  };

  const handleExport = () => {
    // Logic to export to Excel would go here
    exportToExcel(appelOffres);
  };

  const handleSubmit = async (formData: AppelOffre) => {
    try {
      if (currentAO) {
        // Update existing contrat
        const response = await api.put(
          `/admin/update-appel-offre/${currentAO.id}`,
          formData
        );
        if (response.status === 200) {
          // Update the local state with the updated contrat
          setAppelOffres((prev) =>
            prev.map((c) => (c.id === currentAO.id ? { ...response.data } : c))
          );
          setIsModalOpen(false);
        }
      } else {
        // Add new contrat
        const response = await api.post("/admin/add-appel-offre", formData);
        if (response.status === 200) {
          setAppelOffres((prev) => [...prev, { ...response.data }]);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      if (error.response?.data?.includes("already exists")) {
        toast.warning(
          "Un appel d'offre avec ce numéro existe déjà. Veuillez en choisir un autre.".toUpperCase()
        );
      } else {
        toast.error(
          "Erreur lors de la soumission de l'appel d'offre : " +
            error.response?.data?.toUpperCase()
        );
      }
      console.error("Error adding AO:", error.response?.data || error);
      return;
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Navbar title="Gestion des marchés" showBackButton />
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto grid max-w-4/5 gap-6">
          <button
            className="flex items-center w-fit gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftCircleIcon className="h-4 w-4" />
            <span>Retour</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Gestion des Appels d'Offres
              </h1>
              <p className="text-slate-500">
                Gérez l'ensemble des appels d'offres de votre organisation.
              </p>
            </div>
          </div>

          <DataTable
            dataT={appelOffres}
            columns={columns}
            onAdd={handleAdd}
            onExport={handleExport}
            onEdit={handleEdit}
            title="Liste des appels d'offres"
          />

          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            formType="appelOffre"
            title={modalTitle}
            data={currentAO}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}
