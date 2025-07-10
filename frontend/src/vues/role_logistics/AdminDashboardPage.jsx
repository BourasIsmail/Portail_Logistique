import React, { useEffect, useState, PureComponent } from "react";
import api from "@/utils/api";
import { TrendingUp, Clock, CheckCircle, Package } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dashboard from "@/components/role_logistics/Dashboard";
import TicketStatus from "@/components/TicketStatus";

import Chart from "@/components/role_logistics/Chart";

const getMats = (tickets) => {
  const materialMap = new Map();

  // 1. Count total quantity per material
  tickets.forEach((ticket) => {
    ticket.needs.forEach((mat) => {
      const currentQty = materialMap.get(mat.name) || 0;
      materialMap.set(mat.name, currentQty + mat.quantity);
    });
  });

  // 2. Sort by quantity descending
  const sortedMaterials = Array.from(materialMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  // 3. Get top 4 materials
  const top4 = sortedMaterials.slice(0, 4).map(([name, quantity]) => ({
    name,
    value: quantity,
  }));

  // 4. Group the rest into "Autre"
  const otherTotal = sortedMaterials
    .slice(4)
    .reduce((sum, [, quantity]) => sum + quantity, 0);

  if (otherTotal > 0) {
    top4.push({ name: "Autre", value: otherTotal });
  }

  return top4;
};

const generateChartData = (data) => {
  const entries = Object.entries(data).sort(([, a], [, b]) => b - a);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  const top4 = entries.slice(0, 4);
  const top4Sum = top4.reduce((sum, [, value]) => sum + value, 0);

  const result = top4.map(([name, value]) => ({
    name,
    value: (value / total) * 100,
  }));

  if (entries.length > 4) {
    result.push({
      name: "Autre",
      value: ((total - top4Sum) / total) * 100,
    });
  }

  return result;
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [materialsData, setMaterialsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [statusCountsByType, setStatusCountsByType] = useState({
    SOUMISE: 0,
    EN_COURS_DE_VALIDATION: 0,
    APPROUVEE: 0,
    REJETEE: 0,
    EN_COURS_DE_TRAITEMENT: 0,
    PRETE_A_ETRE_LIVREE: 0,
    LIVREE: 0,
    CLOTUREE: 0,
    ANNULEE: 0,
  });

  const cardData = [
    {
      title: "En Cours de Traitement",
      status: "EN_COURS_DE_TRAITEMENT",
      value: statusCountsByType.EN_COURS_DE_TRAITEMENT,
      icon: Clock,
      description: "Demandes en cours de traitement",
      gradient: "from-yellow-50 to-yellow-100/50",
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
    },
    {
      title: "Clôturées",
      status: "CLOTUREE",
      value: statusCountsByType.CLOTUREE,
      icon: CheckCircle,
      description: "Demandes terminées",
      gradient: "from-slate-50 to-slate-100/50",
      iconColor: "text-slate-600",
      iconBg: "bg-slate-100",
    },
    {
      title: "Livrées",
      status: "LIVREE",
      value: statusCountsByType.LIVREE,
      icon: Package,
      description: "Demandes livrées",
      gradient: "from-emerald-50 to-emerald-100/50",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const ticketsData = await api.get("/admin/get-allTickets");
      console.log("Tickets Data:", ticketsData.data.tickets);
      setData(ticketsData.data.tickets);

      // Getting the status counts
      setStatusCountsByType((prevCounts) => {
        const newCounts = { ...prevCounts };
        ticketsData.data.tickets.forEach((ticket) => {
          if (newCounts.hasOwnProperty(ticket.ticketStatus)) {
            newCounts[ticket.ticketStatus]++;
          }
        });
        return newCounts;
      });

      // Getting the materials stats
      setMaterialsData(getMats(ticketsData.data.tickets));

      // Getting the services stats
      const servicesData = ticketsData.data.tickets.reduce((acc, ticket) => {
        if (ticket.service) {
          acc[ticket.service] = (acc[ticket.service] || 0) + 1;
        }
        return acc;
      }, {});
      setServicesData(generateChartData(servicesData));

      // Getting the categories stats
      const categoriesData = ticketsData.data.tickets.reduce((acc, ticket) => {
        if (ticket.category) {
          acc[ticket.category] = (acc[ticket.category] || 0) + 1;
        }
        return acc;
      }, {});
      setCategoriesData(generateChartData(categoriesData));
    } catch (error) {
      console.error("Error fetching tickets data:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return null;
  }
  return (
    <>
      <Dashboard title="Serv. Logistique Dashboard">
        <div className="flex flex-col gap-2 mb-1">
          <h1 className="text-2xl font-semibold mb-1 ">Tableau de Bord</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des performances et des statistiques
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-10">
          {cardData.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <Card
                key={index}
                className={`gap-4 relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${card.gradient}`}
              >
                {/* Background Pattern */}

                <CardHeader className="relative ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${card.iconBg}`}>
                        <IconComponent
                          className={`h-5 w-5 ${card.iconColor}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium text-gray-600 mb-1">
                          Nombre de demandes
                        </CardTitle>
                        <TicketStatus status={card.status} />
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative pt-0">
                  <div className="space-y-4">
                    {/* Main Value */}
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold tabular-nums text-gray-900">
                        {card.value}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        demandes
                      </span>
                    </div>

                    {/* Description */}
                    <CardDescription className="text-sm pt-1 ">
                      {card.description}
                    </CardDescription>
                  </div>
                </CardContent>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${
                    card.status === "EN_COURS_DE_TRAITEMENT"
                      ? "bg-yellow-400"
                      : card.status === "CLOTUREE"
                      ? "bg-slate-400"
                      : "bg-emerald-400"
                  }`}
                />
              </Card>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 my-4 ">
          <h1 className="text-2xl font-semibold mb-1">Statistiques</h1>
          <p className="text-muted-foreground">
            Graphiques et tendances des demandes
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-10">
          <Chart
            data={materialsData}
            title={"Matériaux les plus demandés"}
            description={
              "Répartition des matériaux les plus sollicités en totale"
            }
          />
          <Chart
            data={servicesData}
            title={"Pourcentage des demandes par entité"}
            description={
              "Visualisation des parts des demandes réparties selon les différents entités"
            }
          />
          <Chart
            data={categoriesData}
            title={"Pourcentage des demandes par catégorie"}
            description={
              "Visualisation des parts des demandes réparties selon les différentes catégories"
            }
          />
        </div>
      </Dashboard>
    </>
  );
}
