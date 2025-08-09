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
import { toast } from "sonner";
import { exportToExcel } from "@/utils/ExportToExcel";

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
  {
    key: "anneeBudgetaire",
    header: <span className="whitespace-normal">Année budgétaire</span>,
  },
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
  {
    key: "dateBC",
    header: "Date BC",
    render: (item: BonCommande) => item.dateBC || "-",
  },
  {
    key: "attributaire",
    header: "Attributaire",
  },
  {
    key: "montant",
    header: "Montant",
    render: (item: BonCommande) => `${item.montant.toLocaleString()} DH`,
  },
  {
    key: "dateNotificationBC",
    header: <span className="whitespace-normal">Date notification</span>,
    render: (item: BonCommande) => item.dateNotificationBC || "-",
  },
  {
    key: "delaiExecution",
    header: <span className="whitespace-normal">Délai d'exécution</span>,
    render: (item: BonCommande) => item.delaiExecution || "-",
  },
];

export default function BonsCommandePage() {
  const [bcs, setBCs] = useState<BonCommande[]>([]);
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
    exportToExcel(bcs);
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
      if (error.response?.data?.includes("already exists")) {
        toast.warning(
          "Un bon de commande avec ce numéro existe déjà. Veuillez en choisir un autre.".toUpperCase()
        );
      } else {
        toast.error(
          "Erreur lors de la soumission du bon de commande : " +
            error.response?.data?.toUpperCase()
        );
      }
      console.error(
        "Error submitting bon de commande:",
        error.response?.data || error
      );
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
                Gestion des Bons de Commande
              </h1>
              <p className="text-slate-500">
                Gérez l'ensemble des bons de commande de votre organisation.
              </p>
            </div>
          </div>

          <DataTable
            dataT={bcs}
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
      </div>
    </main>
  );
}
