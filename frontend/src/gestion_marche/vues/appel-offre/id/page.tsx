import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailView from "@/components/detail-view";
import FormModal from "@/components/form-modal";

import type { AppelOffre } from "@/gestion_marche/types";
import api from "@/utils/api";

export default function AppelOffreDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [appelOffre, setAppelOffre] = useState<AppelOffre | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch appel d'offre details based on ID from params
    const fetchAppelOffre = async () => {
      const id = Number(params.id);
      console.log("Fetching appel d'offre with ID:", id);
      const response = await api.get(`/admin/get-appel-offre/${id}`);
      console.log("Fetched appel d'offre:", response.data);

      if (response.status === 200) {
        setAppelOffre({
          ...response.data,
          rubriqueId: response.data.id,
          typeAOId: response.data.id,
        });
      } else {
        // Redirect to list if not found
        navigate("/gm/appelOffres");
      }
    };
    fetchAppelOffre();
  }, [params.id, navigate]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: AppelOffre) => {
    const response = await api.put(
      `/admin/update-appel-offre/${formData.id}`,
      formData
    );
    if (response.status === 200) {
      // Update the local state with the updated appel d'offre
      setAppelOffre({
        ...response.data,
        typeAOId: response.data.id,
        rubriqueId: response.data.id,
      });
      setIsModalOpen(false);
    }
  };

  if (!appelOffre) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="container mx-auto py-6 px-4">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <DetailView
        type="appelOffre"
        data={appelOffre}
        backUrl="/appelOffres"
        onEdit={handleEdit}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType="appelOffre"
        title="Modifier l'appel d'offre"
        data={appelOffre}
        onSubmit={handleSubmit}
      />
    </>
  );
}
