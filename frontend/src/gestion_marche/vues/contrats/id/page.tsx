import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailView from "@/components/detail-view";
import FormModal from "@/components/form-modal";

import type { Contrat } from "@/gestion_marche/types";

// Mock data for demonstration - would be replaced with API call
const mockContrats = [
  {
    id: 1,
    reference: "C2023-001",
    anneeBudgetaire: "2023",
    objet: "Maintenance des équipements informatiques",
    attributaire: "IT Services SARL",
    montant: 120000,
    dateSignature: "2023-01-15",
    dateDebut: "2023-02-01",
    dateFin: "2023-12-31",
    statut: "En cours",
    description:
      "Contrat annuel pour la maintenance préventive et corrective des équipements informatiques.",
  },
  {
    id: 2,
    reference: "C2023-002",
    anneeBudgetaire: "2023",
    objet: "Services de nettoyage",
    attributaire: "Clean Pro SA",
    montant: 85000,
    dateSignature: "2023-01-20",
    dateDebut: "2023-02-01",
    dateFin: "2023-12-31",
    statut: "En cours",
  },
];

export default function ContratDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [contrat, setContrat] = useState<Contrat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const id = Number(params.id);
    const foundContrat = mockContrats.find((c) => c.id === id);

    if (foundContrat) {
      setContrat(foundContrat);
    } else {
      // Redirect to list if not found
      navigate("/gm/contrats");
    }
  }, [params.id, navigate]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // In a real app, this would be an API call
    //setContrat({ ...formData, id: contrat.id })
    setIsModalOpen(false);
  };

  if (!contrat) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="container mx-auto py-6 px-4">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <DetailView
        type="contrat"
        data={contrat}
        backUrl="/contrats"
        onEdit={handleEdit}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType="contrat"
        title="Modifier le contrat"
        data={contrat}
        onSubmit={handleSubmit}
      />
    </>
  );
}
