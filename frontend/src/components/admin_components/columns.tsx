"use client";
import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import TicketStatus from "@/components/TicketStatus";

import ActionDropdownMenu from "@/components/admin_components/ActionDropdownMenu";

export type Demande = {
  id: string;
  ticketDescription: string;
  service: string;
  category: string;
  needs: string;
  date: string;
  ticketStatus: string;
  note?: string | "";
};

export const columns = (refreshTable: () => void): ColumnDef<Demande>[] => [
  {
    accessorKey: "ticketDescription",
    header: "Desctiption",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "category",
    header: "Categorie",
  },
  {
    accessorKey: "needs",
    header: "Besoins",
  },
  {
    accessorKey: "date",
    header: "Date du demande",
  },
  {
    accessorKey: "ticketStatus",
    header: () => <div className="text-center ">Statut</div>,
    cell: ({ row }) => {
      const status = row.getValue("ticketStatus") as string;
      return (
        <>
          <div className="max-w-md flex flex-col items-center ">
            <div>
              <TicketStatus status={status} />
            </div>
            {row.original.note && (
              <div className="text-black text-md mt-2 break-words whitespace-normal max-w-xs text-center">
                <span>
                  📌
                  <span className=" italic font-semibold">
                    Commentaire:
                  </span>{" "}
                  {row.original.note}
                </span>
              </div>
            )}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return <ActionDropdownMenu row={row} refreshTable={refreshTable} />;
    },
  },
];
