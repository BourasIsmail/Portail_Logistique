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
            ? "bg-sky-100 text-sky-800"
            : item.statut === "Terminé"
            ? "bg-emerald-100 text-emerald-800"
            : item.statut === "Suspendu"
            ? "bg-amber-100 text-amber-800"
            : "bg-slate-100 text-slate-800"
        }
        variant={undefined}
      >
        {item.statut || "-"}
      </Badge>
    ),
  },
];

export default function ContratsPage() {
  const [contrats, setContrats] = useState<Contrat[]>([]);
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
                Gestion des Contrats
              </h1>
              <p className="text-slate-500">
                Gérez l'ensemble des contrats de votre organisation.
              </p>
            </div>
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
      </div>
    </main>
  );
}
