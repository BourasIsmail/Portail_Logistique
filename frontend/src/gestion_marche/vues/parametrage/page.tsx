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
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Navbar title="Paramétrage" showBackButton />
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
                Paramétrage du Système
              </h1>
              <p className="text-slate-500">
                Configurez les éléments de base de l'application.
              </p>
            </div>
          </div>

          <Tabs
            defaultValue="types-budget"
            onValueChange={setActiveTab}
            value={activeTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4 rounded-lg bg-slate-100 p-1">
              <TabsTrigger
                value="types-budget"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Types de budget
              </TabsTrigger>
              <TabsTrigger
                value="rubriques"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Rubriques
              </TabsTrigger>
              <TabsTrigger
                value="pmn"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                PMN
              </TabsTrigger>
              <TabsTrigger
                value="types-appel-offre"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Type d'appel d'offre
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="types-budget"
              className="rounded-lg border-slate-200/80 bg-transparent p-6 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Types de Budget
                </h2>
                <p className="text-sm text-slate-500">
                  Les types de budget permettent de catégoriser les dépenses
                  selon leur nature (investissement, fonctionnement, etc.).
                </p>
              </div>
              <TypesBudgetTable />
            </TabsContent>

            <TabsContent
              value="rubriques"
              className="rounded-lg border-slate-200/80 bg-transparent p-6 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Rubriques Budgétaires
                </h2>
                <p className="text-sm text-slate-500">
                  Les rubriques budgétaires correspondent aux lignes de votre
                  plan comptable. Elles permettent d&apos;affecter les dépenses
                  aux bons comptes.
                </p>
              </div>
              <RubriquesTable />
            </TabsContent>

            <TabsContent
              value="pmn"
              className="rounded-lg border-slate-200/80 bg-transparent p-6 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Programmes de Marchés Négociés (PMN)
                </h2>
                <p className="text-sm text-slate-500">
                  Les PMN sont des programmes qui regroupent plusieurs achats de
                  même nature. Ils permettent de planifier les acquisitions et
                  servent de référence pour la création des bons de commande.
                </p>
              </div>
              <PMNTable />
            </TabsContent>

            <TabsContent
              value="types-appel-offre"
              className="rounded-lg border-slate-200/80 bg-transparent p-6 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Types d'Appel d'Offre
                </h2>
                <p className="text-sm text-slate-500">
                  Les types d'appel d'offre définissent les catégories de
                  procédures de passation des marchés. Ils permettent de
                  standardiser les processus et de faciliter la gestion des
                  appels d'offres.
                </p>
              </div>
              <TypesAOTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
