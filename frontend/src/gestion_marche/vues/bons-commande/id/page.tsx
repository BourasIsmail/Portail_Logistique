import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailView from "@/components/detail-view";
import FormModal from "@/components/form-modal";

import type { BonCommande } from "@/gestion_marche/types";
import api from "@/utils/api";

export default function BCDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [bc, setBC] = useState<BonCommande | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch bon de commande details based on ID from params
    const fetchBC = async () => {
      const id = Number(params.id);
      console.log("Fetching bon de commande with ID:", id);
      const response = await api.get(`/admin/get-bon-commande/${id}`);
      console.log("Fetched bon de commande:", response.data);

      if (response.status === 200) {
        setBC({
          ...response.data,
          rubriqueId: response.data.rubrique.id,
          pmnId: response.data.pmn?.id,
        });
      } else {
        // Redirect to list if not found
        navigate("/gm/bons-commande");
      }
    };
    fetchBC();
  }, [params.id, navigate]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: BonCommande) => {
    const response = await api.put(
      `/admin/update-bon-commande/${bc.id}`,
      formData
    );
    if (response.status === 200 && "numBC" in response.data) {
      // Update the local state with the updated bon de commande
      setBC({
        ...response.data,
        rubriqueId: response.data.rubrique.id,
        pmnId: response.data.pmn?.id,
      });
      setIsModalOpen(false);
    }
  };

  if (!bc) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <div className="container mx-auto flex h-full flex-grow items-center justify-center">
          <p className="text-slate-500">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DetailView
        type="bc"
        data={bc}
        backUrl="/gm/bons-commande"
        onEdit={handleEdit}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType="bc"
        title="Modifier le bon de commande"
        data={bc}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
