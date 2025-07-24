import React, { JSX, useEffect, useState } from "react";
import DataTable from "@/components/data-table";
import FormModal from "@/components/form-modal";
import Navbar from "@/components/navbar";
import type { Marche, Column } from "@/gestion_marche/types";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "lucide-react";
import api from "@/utils/api";
import { toast } from "sonner";
import { exportToExcel } from "@/utils/ExportToExcel";

// Define columns for the data table - Respecter l'ordre des champs du modèle
const columns: Column<Marche>[] = [
  // { key: "id", header: "ID" },
  { key: "referenceMarche", header: "Référence" },
  {
    key: "rubrique",
    header: "Rubrique",
    render: (item: Marche) => (
      <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.rubrique.rubrique}
      </div>
    ),
  },
  {
    key: "appelOffre",
    header: <span className="whitespace-normal">Appel d'offre</span>,
    render: (item: Marche) => item.appelOffre?.reference || "-",
  },
  {
    key: "anneeBudgetaire",
    header: <span className="whitespace-normal">Année budgétaire</span>,
  },
  { key: "numCompte", header: "N° Compte" },
  {
    key: "objet",
    header: "Objet",
    render: (item: Marche) => (
      <div className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.objet}
      </div>
    ),
  },
  {
    key: "attributaire",
    header: "Attributaire",
    render: (item: Marche) => (
      <span className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.attributaire}
      </span>
    ),
  },
  {
    key: "montantMarche",
    header: "Montant",
    render: (item: Marche) => `${item.montantMarche.toLocaleString()} DH`,
  },
  {
    key: "dateApprobation",
    header: <span className="whitespace-normal">Date approbation</span>,
  },
  {
    key: "dateVisa",
    header: <span className="whitespace-normal">Date visa</span>,
  },
  {
    key: "dateNotificationApprobation",
    header: <span className="whitespace-normal">Date notification</span>,
  },
  {
    key: "dateOrdreService",
    header: <span className="whitespace-normal">Date ordre service</span>,
  },
  {
    key: "delaiExecution",
    header: <span className="whitespace-normal">Délai d'exécution</span>,
  },
];

export default function MarchesPage(): JSX.Element {
  const [marches, setMarches] = useState<Marche[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentMarche, setCurrentMarche] = useState<Marche | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchMarches = async () => {
      try {
        const response = await api.get("/admin/get-all-marches");
        if (response.status === 200) {
          console.log("Fetched marches:", response.data);
          setMarches(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching marches:", error);
      }
    };
    fetchMarches();
  }, []);

  if (loading) {
    return;
  }
  const handleAdd = (): void => {
    setCurrentMarche(null);
    setModalTitle("Ajouter un marché");
    setIsModalOpen(true);
  };

  const handleEdit = (marche: Marche): void => {
    setCurrentMarche({
      ...marche,
      rubriqueId: marche.rubrique.id,
      typeBudgetId: marche.typeBudget.id,
      appelOffreId: marche.appelOffre?.id,
    });
    setModalTitle("Modifier le marché");
    setIsModalOpen(true);
  };

  const handleExport = (): void => {
    // Logic to export to Excel would go here
    exportToExcel(marches);
  };

  const handleSubmit = async (formData: Marche) => {
    try {
      if (currentMarche && "referenceMarche" in formData) {
        console.log("Updating existing marché:", formData);
        // Update existing marché with its situations
        const response = await api.put(
          `/admin/update-marche/${currentMarche.id}`,
          {
            ...formData,
            rubriqueId: formData.rubrique.id,
            typeBudgetId: formData.typeBudget.id,
            appelOffreId: formData.appelOffre?.id,
          }
        );
        if (response.status === 200 && "referenceMarche" in response.data) {
          setMarches((prev) =>
            prev.map((m) =>
              m.id === currentMarche.id ? { ...(formData as Marche) } : m
            )
          );
          setIsModalOpen(false);
        }
      } else if ("referenceMarche" in formData) {
        // Add new marché with its situations
        console.log("Adding new marché:", formData);

        const response = await api.post("/admin/add-marche", {
          ...formData,
          rubriqueId: formData.rubrique.id,
          typeBudgetId: formData.typeBudget.id,
          appelOffreId: formData.appelOffre?.id,
        });
        if (response.status === 200 && "referenceMarche" in response.data) {
          setMarches((prev) => [...prev, response.data]);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      if (error.response.data.includes("already exists")) {
        toast.warning(
          "Un marché avec cette référence existe déjà. Veuillez en choisir une autre.".toUpperCase()
        );
      } else {
        toast.error(
          "Erreur lors de la soumission du marché : " +
            error.response.data?.toUpperCase()
        );
      }
      console.error(
        "Error submitting form:",
        error.response.data ? error.response.data : error
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Navbar title="Gestion des marchés" showBackButton />
      <div className="flex flex-1 justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4/5 space-y-6">
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
                Gestion des Marchés
              </h1>
              <p className="text-slate-500">
                Gérez l'ensemble des marchés de votre organisation.
              </p>
            </div>
          </div>
          <DataTable
            dataT={marches}
            columns={columns}
            onAdd={handleAdd}
            onExport={handleExport}
            onEdit={handleEdit}
            title="Liste des marchés"
          />

          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            formType="marche"
            title={modalTitle}
            data={currentMarche}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}
