import React from "react";
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
import type { DashboardStats } from "@/gestion_marche/types";
import { replace, useNavigate } from "react-router-dom";

export default function TableauDeBordPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("apercu");
  const navigate = useNavigate();

  // Données fictives pour les statistiques
  const stats: DashboardStats = {
    totalMarches: 24,
    totalBC: 38,
    totalContrats: 12,
    montantTotalMarches: 4250000,
    montantTotalBC: 1850000,
    montantTotalContrats: 950000,
    marchesPaye: 18,
    marchesEnCours: 6,
    bcPaye: 32,
    bcEnCours: 6,
    contratActifs: 10,
    contratExpires: 2,
  };

  // Fonction pour formater les montants
  const formatMontant = (montant: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(montant);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar showBackButton />
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
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Visualisez les statistiques et l&apos;état global de vos marchés,
            bons de commande et contrats.
          </p>
        </div>

        <Tabs
          defaultValue="apercu"
          onValueChange={setActiveTab}
          value={activeTab}
          className="space-y-6"
        >
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger
              value="apercu"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              <Activity className="mr-2 h-4 w-4" />
              Aperçu général
            </TabsTrigger>
            <TabsTrigger
              value="marches"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              <FileText className="mr-2 h-4 w-4" />
              Marchés
            </TabsTrigger>
            <TabsTrigger
              value="bc"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Bons de commande
            </TabsTrigger>
            <TabsTrigger
              value="contrats"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
            >
              <FileCode className="mr-2 h-4 w-4" />
              Contrats
            </TabsTrigger>
          </TabsList>

          {/* Aperçu général */}
          <TabsContent value="apercu" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Marchés
                  </CardTitle>
                </CardHeader>
                <CardContent className={undefined}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {stats.totalMarches}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Montant total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatMontant(stats.montantTotalMarches)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payés</p>
                      <p className="text-xl font-semibold text-green-600">
                        {stats.marchesPaye}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">En cours</p>
                      <p className="text-xl font-semibold text-blue-600">
                        {stats.marchesEnCours}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Bons de commande
                  </CardTitle>
                </CardHeader>
                <CardContent className={undefined}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {stats.totalBC}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Montant total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatMontant(stats.montantTotalBC)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payés</p>
                      <p className="text-xl font-semibold text-green-600">
                        {stats.bcPaye}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">En cours</p>
                      <p className="text-xl font-semibold text-blue-600">
                        {stats.bcEnCours}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <FileCode className="mr-2 h-5 w-5" />
                    Contrats
                  </CardTitle>
                </CardHeader>
                <CardContent className={undefined}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {stats.totalContrats}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Montant total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatMontant(stats.montantTotalContrats)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Actifs</p>
                      <p className="text-xl font-semibold text-green-600">
                        {stats.contratActifs}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expirés</p>
                      <p className="text-xl font-semibold text-red-600">
                        {stats.contratExpires}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    Répartition des montants
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Graphique de répartition des montants par type</p>
                    <p className="text-sm mt-2">
                      (Données de visualisation à intégrer)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Évolution mensuelle
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Graphique d&apos;évolution des engagements par mois</p>
                    <p className="text-sm mt-2">
                      (Données de visualisation à intégrer)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Marchés */}
          <TabsContent value="marches" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900">
                    Statistiques des marchés
                  </CardTitle>
                </CardHeader>
                <CardContent className={undefined}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Nombre total de marchés
                      </span>
                      <span className="font-semibold text-gray-900">
                        {stats.totalMarches}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Montant total engagé
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatMontant(stats.montantTotalMarches)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Marchés payés</span>
                      <span className="font-semibold text-green-600">
                        {stats.marchesPaye}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Marchés en cours</span>
                      <span className="font-semibold text-blue-600">
                        {stats.marchesEnCours}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Taux d&apos;exécution
                      </span>
                      <span className="font-semibold text-gray-900">
                        {Math.round(
                          (stats.marchesPaye / stats.totalMarches) * 100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900">
                    Répartition par statut
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Graphique de répartition des marchés par statut</p>
                    <p className="text-sm mt-2">
                      (Données de visualisation à intégrer)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bons de commande */}
          <TabsContent value="bc" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900">
                    Statistiques des bons de commande
                  </CardTitle>
                </CardHeader>
                <CardContent className={undefined}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Nombre total de BC</span>
                      <span className="font-semibold text-gray-900">
                        {stats.totalBC}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Montant total engagé
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatMontant(stats.montantTotalBC)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">BC payés</span>
                      <span className="font-semibold text-green-600">
                        {stats.bcPaye}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">BC en cours</span>
                      <span className="font-semibold text-blue-600">
                        {stats.bcEnCours}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Taux d&apos;exécution
                      </span>
                      <span className="font-semibold text-gray-900">
                        {Math.round((stats.bcPaye / stats.totalBC) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900">
                    Évolution mensuelle des BC
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Graphique d&apos;évolution des BC par mois</p>
                    <p className="text-sm mt-2">
                      (Données de visualisation à intégrer)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contrats */}
          <TabsContent value="contrats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900">
                    Statistiques des contrats
                  </CardTitle>
                </CardHeader>
                <CardContent className={undefined}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Nombre total de contrats
                      </span>
                      <span className="font-semibold text-gray-900">
                        {stats.totalContrats}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Montant total engagé
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatMontant(stats.montantTotalContrats)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Contrats actifs</span>
                      <span className="font-semibold text-green-600">
                        {stats.contratActifs}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Contrats expirés</span>
                      <span className="font-semibold text-red-600">
                        {stats.contratExpires}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Taux de renouvellement
                      </span>
                      <span className="font-semibold text-gray-900">83%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className={undefined}>
                  <CardTitle className="text-lg text-gray-900">
                    Échéances à venir
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Graphique des échéances de contrats à venir</p>
                    <p className="text-sm mt-2">
                      (Données de visualisation à intégrer)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
