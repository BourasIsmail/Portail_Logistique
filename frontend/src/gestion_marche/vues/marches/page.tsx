import React, { JSX, useState } from "react";
import DataTable from "@/components/data-table";
import FormModal from "@/components/form-modal";
import Navbar from "@/components/navbar";
import type { Marche, Column } from "@/gestion_marche/types";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "lucide-react";

// Mock data for demonstration
const mockMarches: Marche[] = [
  {
    id: 1,
    anneeBudgetaire: "2023",
    numCompte: "123456",
    rubrique: "Équipement informatique",
    referenceMarche: "M2023-001",
    objet: "Achat de matériel informatique",
    attributaire: "Tech Solutions SA",
    montantMarche: 250000,
    dateApprobation: "2023-03-15",
    dateVisa: "2023-03-20",
    dateNotificationApprobation: "2023-03-22",
    dateOrdreService: "2023-03-25",
    delaiExecution: "60 jours",
    situationMarches: [],
  },
  {
    id: 2,
    anneeBudgetaire: "2023",
    numCompte: "789012",
    rubrique: "Mobilier de bureau",
    referenceMarche: "M2023-002",
    objet: "Fourniture de mobilier de bureau",
    attributaire: "Mobilier Pro SARL",
    montantMarche: 180000,
    dateApprobation: "2023-04-10",
    dateVisa: "2023-04-15",
    dateNotificationApprobation: "2023-04-18",
    dateOrdreService: "2023-04-20",
    delaiExecution: "45 jours",
    situationMarches: [],
  },
];

// Define columns for the data table - Respecter l'ordre des champs du modèle
const columns: Column<Marche>[] = [
  // { key: "id", header: "ID" },
  { key: "referenceMarche", header: "Référence" },
  {
    key: "rubrique",
    header: "Rubrique",
    render: (item: Marche) => (
      <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.rubrique}
      </div>
    ),
  },
  {
    key: "anneeBudgetaire",
    header: <span className="whitespace-break-spaces">Année budgétaire</span>,
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
  { key: "attributaire", header: "Attributaire" },
  {
    key: "montantMarche",
    header: "Montant",
    render: (item: Marche) => `${item.montantMarche.toLocaleString()} DH`,
  },
  {
    key: "dateApprobation",
    header: <span className="whitespace-break-spaces">Date d'approbation</span>,
  },
  {
    key: "dateVisa",
    header: <span className="whitespace-break-spaces">Date de visa</span>,
  },
  {
    key: "dateNotificationApprobation",
    header: <span className="whitespace-break-spaces">Date notification</span>,
  },
  {
    key: "dateOrdreService",
    header: <span className="whitespace-break-spaces">Date ordre service</span>,
  },
  {
    key: "delaiExecution",
    header: <span className="whitespace-break-spaces">Délai d'exécution</span>,
  },
];

export default function MarchesPage(): JSX.Element {
  const [marches, setMarches] = useState<Marche[]>(mockMarches);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentMarche, setCurrentMarche] = useState<Marche | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const navigate = useNavigate();

  const handleAdd = (): void => {
    setCurrentMarche(null);
    setModalTitle("Ajouter un marché");
    setIsModalOpen(true);
  };

  const handleEdit = (marche: Marche): void => {
    setCurrentMarche(marche);
    setModalTitle("Modifier le marché");
    setIsModalOpen(true);
  };

  const handleExport = (): void => {
    // Logic to export to Excel would go here
    console.log("Export to Excel");
  };

  const handleSubmit = (formData: Marche): void => {
    if (currentMarche && "referenceMarche" in formData) {
      // Update existing marché with its situations
      console.log("Updating marché:", { ...(formData as Marche) });
      setMarches((prev) =>
        prev.map((m) =>
          m.id === currentMarche.id ? { ...(formData as Marche), id: m.id } : m
        )
      );
    } else if ("referenceMarche" in formData) {
      // Add new marché with its situations
      const newId = Math.max(...marches.map((m) => m.id), 0) + 1;
      console.log("Adding marché:", { ...(formData as Marche), id: newId });
      setMarches((prev) => [...prev, { ...(formData as Marche), id: newId }]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar showBackButton />
      <div className="container mx-auto pt-4 ">
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
            Gestion des marchés
          </h1>
          <p className="text-gray-600">
            Cette section vous permet de gérer l&apos;ensemble des marchés de
            votre organisation. Vous pouvez consulter, ajouter, modifier et
            exporter les informations relatives aux marchés.
          </p>
        </div>

        <DataTable
          data={marches}
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
    </main>
  );
}
