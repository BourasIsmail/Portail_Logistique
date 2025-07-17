import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailView from "@/components/detail-view";
import FormModal from "@/components/form-modal";
import { Marche } from "@/gestion_marche/types";
import api from "@/utils/api";

export default function MarcheDetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [marche, setMarche] = useState<Marche | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch contrat details based on ID from params
    const fetchMarche = async () => {
      const id = Number(params.id);
      console.log("Fetching marche with ID:", id);
      const response = await api.get(`/admin/get-marche/${id}`);
      console.log("Fetched marche:", response.data);

      if (response.status === 200) {
        setMarche({
          ...response.data,
          rubriqueId: response.data.rubrique.id,
          typeBudgetId: response.data.typeBudget.id,
          appelOffreId: response.data.appelOffre?.id,
        });
      } else {
        // Redirect to list if not found
        navigate("/gm/marches");
      }
    };
    fetchMarche();
  }, [params.id, navigate]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    console.log("Form submitted:", formData);
    const response = await api.put(`/admin/update-marche/${params.id}`, {
      ...formData,
      rubriqueId: formData.rubrique.id,
      typeBudgetId: formData.typeBudget.id,
      appelOffreId: formData.appelOffre?.id,
    });
    if (response.status === 200) {
      setMarche({
        ...response.data,
        rubriqueId: response.data.rubrique.id,
        typeBudgetId: response.data.typeBudget.id,
        appelOffreId: response.data.appelOffre?.id,
      });
      setIsModalOpen(false);
    }
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
