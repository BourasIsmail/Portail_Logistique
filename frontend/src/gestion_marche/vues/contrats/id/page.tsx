import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailView from "@/components/detail-view";
import FormModal from "@/components/form-modal";

import type { Contrat } from "@/gestion_marche/types";
import api from "@/utils/api";

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
    // Fetch contrat details based on ID from params
    const fetchContrat = async () => {
      const id = Number(params.id);
      console.log("Fetching contrat with ID:", id);
      const response = await api.get(`/admin/get-contract/${id}`);
      console.log("Fetched contrat:", response.data);

      if (response.status === 200) {
        setContrat({
          ...response.data,
          typeBudgetId: response.data.id,
          rubriqueId: response.data.id,
        });
      } else {
        // Redirect to list if not found
        navigate("/gm/contrats");
      }
    };
    fetchContrat();
  }, [params.id, navigate]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: Contrat) => {
    const response = await api.put(
      `/admin/update-contract/${formData.id}`,
      formData
    );
    if (response.status === 200) {
      // Update the local state with the updated contrat
      setContrat({
        ...response.data,
        typeBudgetId: response.data.id,
        rubriqueId: response.data.id,
      });
      setIsModalOpen(false);
    }
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
