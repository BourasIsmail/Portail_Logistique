import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "@/components/data-table";
import FormModal from "@/components/form-modal";
import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";

import type { Column } from "@/gestion_marche/types";
import { ArrowLeftCircleIcon } from "lucide-react";

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

export default function ContratsPage() {
  const [appelOffres, setAppelOffres] = useState([]);
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
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar title="Gestion des marchés" showBackButton />
      <div className="sm:pl-2 pt-4 md:container md:mx-auto">
        <button
          className="flex items-center gap-2 rounded-md hover:bg-gray-200 px-1 py-0.5"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftCircleIcon className="w-5 h-5" />
          <span className="text-lg font-bold text-gray-900">Retour</span>
        </button>
      </div>
      <div className="container mx-auto py-2 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Gestion des appels d'offres
          </h1>
          <p className="text-gray-600">
            Cette section vous permet de gérer l'ensemble des appels d'offres
            publiés par votre organisation. Vous pouvez ajouter, modifier et
            consulter les détails des appels d'offres, ainsi que les marchés
            associés.
          </p>
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
    </main>
  );
}
