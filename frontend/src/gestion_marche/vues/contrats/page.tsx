import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "@/components/data-table";
import FormModal from "@/components/form-modal";
import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";

import type { Column, Contrat } from "@/gestion_marche/types";
import { ArrowLeftCircleIcon } from "lucide-react";

import api from "@/utils/api";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { exportToExcel } from "@/utils/ExportToExcel";

// Define columns for the data table - Respecter l'ordre des champs du modèle
const columns: Column<Contrat>[] = [
  // { key: "id", header: "ID" },
  { key: "reference", header: "Référence" },
  {
    key: "anneeBudgetaire",
    header: <span className="whitespace-break-spaces">Année budgétaire</span>,
  },
  {
    key: "objet",
    header: "Objet",
    render: (item: Contrat) => (
      <div className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.objet}
      </div>
    ),
  },
  {
    key: "attributaire",
    header: "Attributaire",
    render: (item: Contrat) => (
      <div className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.attributaire}
      </div>
    ),
  },
  {
    key: "montant",
    header: "Montant",
    render: (item: { montant: number }) =>
      `${item.montant.toLocaleString()} DH`,
  },
  {
    key: "dateSignature",
    header: <span className="whitespace-break-spaces">Date de signature</span>,
  },
  {
    key: "dateDebut",
    header: <span className="whitespace-break-spaces">Date de début</span>,
  },
  {
    key: "dateFin",
    header: <span className="whitespace-break-spaces">Date de fin</span>,
  },
  {
    key: "statut",
    header: "Statut",
    render: (item: { statut: string }) => (
      <Badge
        className={
          item.statut === "En cours"
            ? "bg-blue-100 text-blue-800"
            : item.statut === "Terminé"
            ? "bg-green-100 text-green-800"
            : item.statut === "Suspendu"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800"
        }
        variant={"default"}
      >
        {item.statut || "-"}
      </Badge>
    ),
  },
];

export default function ContratsPage() {
  const [contrats, setContrats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContrat, setCurrentContrat] = useState<Contrat | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchContrats = async () => {
      try {
        const response = await api.get("/admin/get-all-contracts");
        if (response.status === 200) {
          console.log("Fetched contrats:", response.data);
          setContrats(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contrats:", error);
      }
    };
    fetchContrats();
  }, []);

  if (loading) {
    return;
  }

  const handleAdd = () => {
    setCurrentContrat(null);
    setModalTitle("Ajouter un contrat");
    setIsModalOpen(true);
  };

  const handleEdit = (contrat: Contrat) => {
    setCurrentContrat({
      ...contrat,
      typeBudgetId: contrat.typeBudget.id,
      rubriqueId: contrat.rubrique.id,
    });
    setModalTitle("Modifier le contrat");
    setIsModalOpen(true);
  };

  const handleExport = () => {
    // Logic to export to Excel would go here
    exportToExcel(contrats);
  };

  const handleSubmit = async (formData: Contrat) => {
    try {
      if (currentContrat) {
        // Update existing contrat
        const response = await api.put(
          `/admin/update-contract/${currentContrat.id}`,
          formData
        );
        if (response.status === 200) {
          // Update the local state with the updated contrat
          setContrats((prev) =>
            prev.map((c) =>
              c.id === currentContrat.id ? { ...response.data } : c
            )
          );
          setIsModalOpen(false);
        }
      } else {
        // Add new contrat
        const response = await api.post("/admin/add-contract", formData);
        if (response.status === 200) {
          setContrats((prev) => [...prev, { ...response.data }]);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      if (error.response?.data?.includes("already exists")) {
        toast.warning(
          "Une contrat avec ce numéro existe déjà. Veuillez en choisir un autre.".toUpperCase()
        );
      } else {
        toast.error(
          "Erreur lors de la soumission du contrat : " +
            error.response?.data?.toUpperCase()
        );
      }
      console.error("Error submitting contrat:", error.response?.data || error);
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
            Gestion des contrats
          </h1>
          <p className="text-gray-600">
            Cette section vous permet de gérer l&apos;ensemble des contrats de
            votre organisation. Les contrats représentent des engagements sur
            une période définie avec vos prestataires et fournisseurs.
          </p>
        </div>

        <DataTable
          dataT={contrats}
          columns={columns}
          onAdd={handleAdd}
          onExport={handleExport}
          onEdit={handleEdit}
          title="Liste des contrats"
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType="contrat"
          title={modalTitle}
          data={currentContrat}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
