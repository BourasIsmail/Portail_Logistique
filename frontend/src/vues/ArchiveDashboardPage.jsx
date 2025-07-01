import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/admin_components/Dashboard";
import api from "@/utils/api";
import { columns } from "@/components/admin_components/columns";
import { DataTable } from "@/components/admin_components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArchiveRestoreIcon, MoreHorizontal } from "lucide-react";

export default function TicketsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedColumns, setUpdatedColumns] = useState([]);

  useEffect(() => {
    getData();

    setUpdatedColumns(
      columns(getData).map((column) => {
        if (column.accessorKey === "id") {
          return {
            ...column,
            cell: ({ row }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size={undefined}
                    className={undefined}
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={undefined}>
                  <DropdownMenuItem
                    onClick={async () => {
                      console.log("De archiving ticket:", row.getValue("id"));
                      await api.put(
                        `/admin/archive-ticket/${row.getValue("id")}`
                      );
                      getData();
                    }}
                    className={undefined}
                    inset={undefined}
                  >
                    <ArchiveRestoreIcon className="h-4 w-4" />
                    Restaurer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          };
        }
        return column;
      })
    );
  }, []);

  const getData = async () => {
    try {
      const ticketsData = await api.get("/admin/get-allTickets");
      console.log("Tickets Data:", ticketsData);
      setData(
        ticketsData.data.tickets.filter((ticket) => ticket.archived === true)
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
        <h1 className="text-2xl font-semibold mb-4">Demandes Archivées</h1>
        <div className="container mx-auto py-10">
          <DataTable columns={updatedColumns} data={data} />
        </div>
      </Dashboard>
    </>
  );
}
