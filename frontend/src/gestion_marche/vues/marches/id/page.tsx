import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailView from "@/components/detail-view";
import FormModal from "@/components/form-modal";
import { Marche } from "@/gestion_marche/types";

// Mock data for demonstration - would be replaced with API call
const mockMarches = [
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
    situationMarches: [
      {
        id: 1,
        dateLivraison: "2023-05-10",
        dateReceptionProvisoire: "2023-05-15",
        numFacture: "F2023-123",
        dateEnregistrement: "2023-05-16",
        numDecompte: "D2023-001",
        dateServiceFait: "2023-05-18",
        dateLiquidation: "2023-05-20",
        montantDecompte: 150000,
        paye: true,
        observation: "Première livraison conforme",
      },
      {
        id: 2,
        dateLivraison: "2023-05-25",
        dateReceptionProvisoire: "2023-05-30",
        numFacture: "F2023-145",
        dateEnregistrement: "2023-06-01",
        numDecompte: "D2023-002",
        dateServiceFait: "2023-06-03",
        dateLiquidation: "2023-06-05",
        montantDecompte: 100000,
        paye: false,
        observation: "Deuxième livraison conforme",
      },
    ],
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

export default function MarcheDetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [marche, setMarche] = useState<Marche | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const id = Number(params.id);
    const foundMarche = mockMarches.find((m) => m.id === id);

    if (foundMarche) {
      setMarche(foundMarche as Marche);
    } else {
      // Redirect to list if not found
      navigate("/gm/marches");
    }
  }, [params.id, navigate]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // In a real app, this would be an API call
    //setMarche({ ...formData, id: marche.id })
    //setIsModalOpen(false)
  };

  if (!marche) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="container mx-auto py-6 px-4">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <DetailView
        type="marche"
        data={marche}
        backUrl="/marches"
        onEdit={handleEdit}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType="marche"
        title="Modifier le marché"
        data={marche}
        onSubmit={handleSubmit}
      />
    </>
  );
}
