import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "@/components/data-table";
import FormModal from "@/components/form-modal";
import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
import { BonCommande, Column } from "@/gestion_marche/types";
import { ArrowLeftCircleIcon } from "lucide-react";
import api from "@/utils/api";

// const mockBonsCommande: BonCommande[] = [
//   {
//     id: 1,
//     anneeBudgetaire: "2023",
//     numCompte: "123456",
//     rubrique: "Fournitures de bureau",
//     pmnNum: "PMN-2023-001",
//     pmnObjet: "Achat de fournitures",
//     numBC: "BC-2023-001",
//     dateBC: "2023-02-10",
//     attributaire: "Papeterie Centrale SARL",
//     montant: 45000,
//     dateNotificationBC: "2023-02-15",
//     delaiExecution: "30 jours",
//     situationBCs: [],
//   },
//   {
//     id: 2,
//     anneeBudgetaire: "2023",
//     numCompte: "789012",
//     rubrique: "Matériel technique",
//     pmnNum: "PMN-2023-002",
//     pmnObjet: "Équipement technique",
//     numBC: "BC-2023-002",
//     dateBC: "2023-03-05",
//     attributaire: "Tech Équipement SA",
//     montant: 75000,
//     dateNotificationBC: "2023-03-10",
//     delaiExecution: "45 jours",
//     situationBCs: [],
//   },
// ];

// Define columns for the data table - Respecter l'ordre des champs du modèle
const columns: Column<BonCommande>[] = [
  // { key: "id", header: "ID" },
  { key: "numBC", header: "N° BC" },
  { key: "anneeBudgetaire", header: "Année budgétaire" },
  { key: "numCompte", header: "N° Compte" },
  {
    key: "rubrique",
    header: "Rubrique",
    render: (item: BonCommande) => (
      <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.rubrique.rubrique}
      </div>
    ),
  },
  {
    key: "pmnNum",
    header: "N° PMN",
    render: (item: BonCommande) => item.pmn?.num,
  },
  { key: "dateBC", header: "Date BC" },
  { key: "attributaire", header: "Attributaire" },
  {
    key: "montant",
    header: "Montant",
    render: (item: BonCommande) => `${item.montant.toLocaleString()} DH`,
  },
  { key: "dateNotificationBC", header: "Date notification" },
  { key: "delaiExecution", header: "Délai d'exécution" },
];

export default function BonsCommandePage() {
  const [bcs, setBCs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBC, setCurrentBC] = useState<BonCommande | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data from API if needed
    const fetchBCs = async () => {
      try {
        const response = await api.get("/admin/get-all-bon-commandes");
        if (response.status === 200) {
          console.log("Fetched bon commande:", response.data);
          setBCs(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bon commande:", error);
      }
    };
    fetchBCs();
  }, []);

  if (loading) {
    return <div>chargement...</div>;
  }
  const handleAdd = () => {
    setCurrentBC(null);
    setModalTitle("Ajouter un bon de commande");
    setIsModalOpen(true);
  };

  const handleEdit = (bc: BonCommande) => {
    setCurrentBC({ ...bc, rubriqueId: bc.rubrique.id, pmnId: bc.pmn.id });
    setModalTitle("Modifier le bon de commande");
    setIsModalOpen(true);
  };

  const handleExport = () => {
    // Logic to export to Excel would go here
    console.log("Export to Excel");
  };

  const handleSubmit = async (formData: BonCommande) => {
    if (!("pmnNum" in formData)) return; // S'assurer que c'est un BonCommande
    const bcData = formData as BonCommande;

    try {
      if (currentBC) {
        // Update existing BC with its situations
        const response = await api.put(
          `/admin/update-bon-commande/${currentBC.id}`,
          bcData
        );

        if (response.status === 200 && "numBC" in response.data) {
          setBCs((prev) =>
            prev.map((bc) => (bc.id === currentBC.id ? response.data : bc))
          );
          setIsModalOpen(false);
        }
      } else {
        // Add new BC with its situations
        const resposne = await api.post("/admin/add-bon-commande", bcData);

        if (resposne.status === 200 && "numBC" in resposne.data) {
          setBCs((prev) => [...prev, resposne.data]);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error(
        "Error submitting bon de commande:",
        error.response?.data || error
      );
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
            Gestion des bons de commande
          </h1>
          <p className="text-gray-600">
            Cette section vous permet de gérer l&apos;ensemble des bons de
            commande (BC) de votre organisation. Les bons de commande sont liés
            à des PMN et permettent de suivre les achats.
          </p>
        </div>

        <DataTable
          data={bcs}
          columns={columns}
          onAdd={handleAdd}
          onExport={handleExport}
          onEdit={handleEdit}
          title="Liste des bons de commande"
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType="bc"
          title={modalTitle}
          data={currentBC}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
