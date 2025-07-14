import React from "react";
import { useState } from "react";
import DataTable from "@/components/data-table";
import FormModal from "@/components/form-modal";
import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";

import type { Column, Contrat } from "@/gestion_marche/types";
import { ArrowLeftCircleIcon } from "lucide-react";

// Mock data for demonstration
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

// Define columns for the data table - Respecter l'ordre des champs du modèle
const columns: Column<Contrat>[] = [
  // { key: "id", header: "ID" },
  { key: "reference", header: "Référence" },
  { key: "anneeBudgetaire", header: "Année budgétaire" },
  { key: "objet", header: "Objet" },
  { key: "attributaire", header: "Attributaire" },
  {
    key: "montant",
    header: "Montant",
    render: (item: { montant: number }) =>
      `${item.montant.toLocaleString()} DH`,
  },
  { key: "dateSignature", header: "Date de signature" },
  { key: "dateDebut", header: "Date de début" },
  { key: "dateFin", header: "Date de fin" },
  { key: "statut", header: "Statut" },
];

export default function ContratsPage() {
  const [contrats, setContrats] = useState(mockContrats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContrat, setCurrentContrat] = useState<Contrat | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    setCurrentContrat(null);
    setModalTitle("Ajouter un contrat");
    setIsModalOpen(true);
  };

  const handleEdit = (/*contrat*/) => {
    //setCurrentContrat(contrat)
    setModalTitle("Modifier le contrat");
    setIsModalOpen(true);
  };

  const handleExport = () => {
    // Logic to export to Excel would go here
    console.log("Export to Excel");
  };

  const handleSubmit = (formData: Contrat) => {
    if (currentContrat) {
      // Update existing contrat
      setContrats((prev) =>
        prev.map((c) =>
          c.id === currentContrat.id ? { ...formData, id: c.id } : c
        )
      );
    } else {
      // Add new contrat
      const newId = Math.max(...contrats.map((c) => c.id), 0) + 1;
      setContrats((prev) => [...prev, { ...formData, id: newId }]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar showBackButton />;{" "}
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
            Gestion des contrats
          </h1>
          <p className="text-gray-600">
            Cette section vous permet de gérer l&apos;ensemble des contrats de
            votre organisation. Les contrats représentent des engagements sur
            une période définie avec vos prestataires et fournisseurs.
          </p>
        </div>

        <DataTable
          data={contrats}
          columns={columns}
          onAdd={handleAdd}
          onExport={handleExport}
          onEdit={handleEdit}
          title="Liste des contrats"
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType="contrat"
          title={modalTitle}
          data={currentContrat}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
