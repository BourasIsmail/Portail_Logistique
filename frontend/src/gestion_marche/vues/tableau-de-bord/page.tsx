import React, { useEffect } from "react";
import { JSX, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  TrendingUp,
  FileText,
  ShoppingCart,
  FileCode,
  ArrowLeftFromLineIcon,
  ArrowLeftCircleIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";
import type {
  BonCommande,
  Contrat,
  DashboardStats,
  Marche,
} from "@/gestion_marche/types";
import { replace, useNavigate } from "react-router-dom";
import api from "@/utils/api";

export default function TableauDeBordPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("apercu");
  const navigate = useNavigate();

  // Données fictives pour les statistiques
  const [stats, setStats] = useState<DashboardStats>({
    totalMarches: 0,
    totalBC: 0,
    totalContrats: 0,
    montantTotalMarches: 0,
    montantTotalBC: 0,
    montantTotalContrats: 0,
    marchesPaye: 0,
    marchesEnCours: 0,
    bcPaye: 0,
    bcEnCours: 0,
    contratActifs: 0,
    contratExpires: 0,
  });

  useEffect(() => {
    // Simuler une récupération de données depuis une API
    const fetchData = async () => {
      const marches: Marche[] = (await api.get("/admin/get-all-marches")).data;

      const bcs: BonCommande[] = (await api.get("/admin/get-all-bon-commandes"))
        .data;
      const contrats: Contrat[] = (await api.get("/admin/get-all-contracts"))
        .data;

      console.log("Fetched Marches:", marches);
      console.log("Fetched BCs:", bcs);
      console.log("Fetched Contrats:", contrats);

      setStats({
        totalMarches: marches.length,
        totalBC: bcs.length,
        totalContrats: contrats.length,

        montantTotalMarches: marches.reduce(
          (acc, m) => acc + m.montantMarche,
          0
        ),
        montantTotalBC: bcs.reduce((acc, b) => acc + b.montant, 0),
        montantTotalContrats: contrats.reduce((acc, c) => acc + c.montant, 0),

        marchesPaye: marches.reduce(
          (acc, m) =>
            acc + m.situationMarches.filter((s) => s.paye == true).length,
          0
        ),
        marchesEnCours: marches.reduce(
          (acc, m) =>
            acc + m.situationMarches.filter((s) => s.paye == false).length,
          0
        ),

        bcPaye: bcs.reduce(
          (acc, b) => acc + b.situationBCs.filter((s) => s.paye == true).length,
          0
        ),
        bcEnCours: bcs.reduce(
          (acc, b) =>
            acc + b.situationBCs.filter((s) => s.paye == false).length,
          0
        ),

        contratActifs: contrats.filter((c) => c.statut === "En cours").length,
        contratExpires: contrats.filter((c) => c.statut === "Suspendu").length,
      });
    };

    fetchData();
  }, []);

  // Fonction pour formater les montants
  const formatMontant = (montant: number): string => {
    return montant + " DH";
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
                Tableau de bord
              </h1>
              <p className="text-slate-500">
                Visualisez les statistiques et l&apos;état global de vos
                marchés, bons de commande et contrats.
              </p>
            </div>
          </div>

          <Tabs
            defaultValue="apercu"
            onValueChange={setActiveTab}
            value={activeTab}
            className="space-y-6 "
          >
            <TabsList className="flex items-center align-middle w-full rounded-lg bg-slate-100 p-1 ">
              <TabsTrigger
                value="apercu"
                className="rounded-md px-3 py-1.5 text-md font-medium  text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm"
              >
                <Activity className="mr-2 h-4 w-4" />
                Aperçu général
              </TabsTrigger>
              <TabsTrigger
                value="marches"
                className="rounded-md px-3 py-1.5 text-md font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm"
              >
                <FileText className="mr-2 h-4 w-4" />
                Marchés
              </TabsTrigger>
              <TabsTrigger
                value="bc"
                className="rounded-md px-3 py-1.5 text-md font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Bons de commande
              </TabsTrigger>
              <TabsTrigger
                value="contrats"
                className="rounded-md px-3 py-1.5 text-md font-medium text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm"
              >
                <FileCode className="mr-2 h-4 w-4" />
                Contrats
              </TabsTrigger>
            </TabsList>

            {/* Aperçu général */}
            <TabsContent value="apercu" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-base font-semibold text-slate-800">
                      <FileText className="mr-2 h-5 w-5 text-slate-500" />
                      Marchés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={undefined}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Nombre total</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {stats.totalMarches}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Montant total</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatMontant(stats.montantTotalMarches)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Payés</p>
                        <p className="text-xl font-semibold text-emerald-600">
                          {stats.marchesPaye}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">En cours</p>
                        <p className="text-xl font-semibold text-sky-600">
                          {stats.marchesEnCours}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-base font-semibold text-slate-800">
                      <ShoppingCart className="mr-2 h-5 w-5 text-slate-500" />
                      Bons de commande
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={undefined}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Nombre total</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {stats.totalBC}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Montant total</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatMontant(stats.montantTotalBC)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Payés</p>
                        <p className="text-xl font-semibold text-emerald-600">
                          {stats.bcPaye}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">En cours</p>
                        <p className="text-xl font-semibold text-sky-600">
                          {stats.bcEnCours}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-base font-semibold text-slate-800">
                      <FileCode className="mr-2 h-5 w-5 text-slate-500" />
                      Contrats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={undefined}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Nombre total</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {stats.totalContrats}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Montant total</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatMontant(stats.montantTotalContrats)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">En cours</p>
                        <p className="text-xl font-semibold text-emerald-600">
                          {stats.contratActifs}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Suspendus</p>
                        <p className="text-xl font-semibold text-amber-600">
                          {stats.contratExpires}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="flex items-center text-base font-semibold text-slate-800">
                      <BarChart className="mr-2 h-5 w-5 text-slate-500" />
                      Répartition des montants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-80 items-center justify-center">
                    <div className="text-center text-slate-400">
                      <PieChart className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                      <p>Graphique de répartition des montants par type</p>
                      <p className="mt-2 text-sm">
                        (Données de visualisation à intégrer)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="flex items-center text-base font-semibold text-slate-800">
                      <TrendingUp className="mr-2 h-5 w-5 text-slate-500" />
                      Évolution mensuelle
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-80 items-center justify-center">
                    <div className="text-center text-slate-400">
                      <LineChart className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                      <p>Graphique d&apos;évolution des engagements par mois</p>
                      <p className="mt-2 text-sm">
                        (Données de visualisation à intégrer)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Marchés */}
            <TabsContent value="marches" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Statistiques des marchés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={undefined}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Nombre total de marchés
                        </span>
                        <span className="font-semibold text-slate-900">
                          {stats.totalMarches}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Montant total engagé
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatMontant(stats.montantTotalMarches)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Marchés payés</span>
                        <span className="font-semibold text-emerald-600">
                          {stats.marchesPaye}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Marchés en cours</span>
                        <span className="font-semibold text-sky-600">
                          {stats.marchesEnCours}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Taux d&apos;exécution
                        </span>
                        <span className="font-semibold text-slate-900">
                          {stats.totalMarches > 0
                            ? Math.round(
                                (stats.marchesPaye / stats.totalMarches) * 100
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Répartition par statut
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-64 items-center justify-center">
                    <div className="text-center text-slate-400">
                      <PieChart className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                      <p>Graphique de répartition des marchés par statut</p>
                      <p className="mt-2 text-sm">
                        (Données de visualisation à intégrer)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Bons de commande */}
            <TabsContent value="bc" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Statistiques des bons de commande
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={undefined}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Nombre total de BC
                        </span>
                        <span className="font-semibold text-slate-900">
                          {stats.totalBC}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Montant total engagé
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatMontant(stats.montantTotalBC)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">BC payés</span>
                        <span className="font-semibold text-emerald-600">
                          {stats.bcPaye}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">BC en cours</span>
                        <span className="font-semibold text-sky-600">
                          {stats.bcEnCours}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Taux d&apos;exécution
                        </span>
                        <span className="font-semibold text-slate-900">
                          {stats.totalBC > 0
                            ? Math.round((stats.bcPaye / stats.totalBC) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Évolution mensuelle des BC
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-64 items-center justify-center">
                    <div className="text-center text-slate-400">
                      <BarChart className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                      <p>Graphique d&apos;évolution des BC par mois</p>
                      <p className="mt-2 text-sm">
                        (Données de visualisation à intégrer)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contrats */}
            <TabsContent value="contrats" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Statistiques des contrats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={undefined}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Nombre total de contrats
                        </span>
                        <span className="font-semibold text-slate-900">
                          {stats.totalContrats}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Montant total engagé
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatMontant(stats.montantTotalContrats)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Contrats en cours
                        </span>
                        <span className="font-semibold text-emerald-600">
                          {stats.contratActifs}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Contrats suspendus
                        </span>
                        <span className="font-semibold text-amber-600">
                          {stats.contratExpires}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">
                          Taux de renouvellement
                        </span>
                        <span className="font-semibold text-slate-900">
                          83%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <CardHeader className={undefined}>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Échéances à venir
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-64 items-center justify-center">
                    <div className="text-center text-slate-400">
                      <LineChart className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                      <p>Graphique des échéances de contrats à venir</p>
                      <p className="mt-2 text-sm">
                        (Données de visualisation à intégrer)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
