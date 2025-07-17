import React from "react";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypesBudgetTable from "@/gestion_marche/components/parametrage/types-budget-table";
import RubriquesTable from "@/gestion_marche/components/parametrage/rubriques-table";
import PMNTable from "@/gestion_marche/components/parametrage/pmn-table";

import Navbar from "@/components/navbar";

import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "lucide-react";
import TypesAOTable from "@/gestion_marche/components/parametrage/types-appel-offre-table";

export default function ParametragePage() {
  const [activeTab, setActiveTab] = useState("types-budget");
  const navigate = useNavigate();

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
            Paramétrage du système
          </h1>
          <p className="text-gray-600">
            Cette section vous permet de configurer les éléments de base
            utilisés dans l&apos;application. Vous pouvez gérer les types de
            budget, les rubriques comptables et les PMN.
          </p>
        </div>

        <Tabs
          defaultValue="types-budget"
          onValueChange={setActiveTab}
          value={activeTab}
          className="space-y-4"
        >
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger
              value="types-budget"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              Types de budget
            </TabsTrigger>
            <TabsTrigger
              value="rubriques"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              Rubriques
            </TabsTrigger>
            <TabsTrigger
              value="pmn"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              PMN
            </TabsTrigger>
            <TabsTrigger
              value="types-appel-offre"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              Type d'appel d'offre
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="types-budget"
            className="border-gray-200 border rounded-md p-4 bg-white shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Types de Budget
              </h2>
              <p className="text-gray-600 text-sm">
                Les types de budget permettent de catégoriser les dépenses selon
                leur nature (investissement, fonctionnement, etc.).
              </p>
            </div>
            <TypesBudgetTable />
          </TabsContent>

          <TabsContent
            value="rubriques"
            className="border-gray-200 border rounded-md p-4 bg-white shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Rubriques Budgétaires
              </h2>
              <p className="text-gray-600 text-sm">
                Les rubriques budgétaires correspondent aux lignes de votre plan
                comptable. Elles permettent d&apos;affecter les dépenses aux
                bons comptes.
              </p>
            </div>
            <RubriquesTable />
          </TabsContent>

          <TabsContent
            value="pmn"
            className="border-gray-200 border rounded-md p-4 bg-white shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Programmes de Marchés Négociés (PMN)
              </h2>
              <p className="text-gray-600 text-sm">
                Les PMN sont des programmes qui regroupent plusieurs achats de
                même nature. Ils permettent de planifier les acquisitions et
                servent de référence pour la création des bons de commande.
              </p>
            </div>
            <PMNTable />
          </TabsContent>

          <TabsContent
            value="types-appel-offre"
            className="border-gray-200 border rounded-md p-4 bg-white shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Types d'Appel d'Offre
              </h2>
              <p className="text-gray-600 text-sm">
                Les types d'appel d'offre définissent les catégories de
                procédures de passation des marchés. Ils permettent de
                standardiser les processus et de faciliter la gestion des appels
                d'offres.
              </p>
            </div>
            <TypesAOTable />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
