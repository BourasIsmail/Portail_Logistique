import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/admin_components/Dashboard";
import api from "@/utils/api";
import { columns } from "@/components/admin_components/columns";
import { DataTable } from "@/components/admin_components/data-table";

export default function AdminTicketsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const ticketsData = await api.get("/admin/get-allTickets");
      console.log("Tickets Data:", ticketsData);
      setData(
        ticketsData.data.tickets.filter((ticket) => ticket.archived === false)
      );
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
      <Dashboard>
        <h1 className="text-2xl font-semibold mb-4">Demandes</h1>
        <div className="container mx-auto px-10">
          <DataTable columns={columns(getData)} data={data} />
        </div>
      </Dashboard>
    </>
  );
}
