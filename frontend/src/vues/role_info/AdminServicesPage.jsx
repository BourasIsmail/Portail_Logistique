import React, { useEffect, useState } from "react";

import Dashboard from "@/components/role_info/Dashboard";
import api from "@/utils/api";
import { DataTable } from "@/components/role_info/data-table";
import { columns } from "@/components/role_info/ServicesColumns";

export default function AdminServcesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const usersData = await api.get("/admin/get-users");

      setData(usersData.data);
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
      <Dashboard title="Serv. Informatique Dashboard">
        <h1 className="text-2xl font-semibold mb-4">Parametrage Entités</h1>
        <div className="min-w-3xl mx-auto px-10">
          <DataTable columns={columns(getData)} data={data} />
        </div>
      </Dashboard>
    </>
  );
}
