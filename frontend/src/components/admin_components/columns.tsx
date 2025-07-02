"use client";
import React, { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import TicketStatus from "@/components/TicketStatus";

import ActionDropdownMenu from "@/components/admin_components/ActionDropdownMenu";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  CheckCheckIcon,
  CheckIcon,
  ChevronDown,
} from "lucide-react";
import { computeArea } from "recharts/types/cartesian/Area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
    id: "service",
    enableColumnFilter: true,
  },
  {
    accessorKey: "category",
    header: "Categorie",
  },
  {
    accessorKey: "needs",
    header: "Besoins",
  },

  // TODO: send data already sorted by date from the backend
  {
    accessorKey: "date",
    header: ({ column }) => {
      useEffect(() => {
        column.toggleSorting(column.getIsSorted() === "asc");
      }, [column]);

      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-between text-center"
        >
          Date du demande
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("date")}</div>;
    },
  },

  // TODO: make the header a button to select which status to show
  {
    accessorKey: "ticketStatus",
    header: ({ column }) => {
      const statusOptions = [
        "SOUMISE",
        "EN_COURS_DE_VALIDATION",
        "APPROUVEE",
        "REJETEE",
        "EN_COURS_DE_TRAITEMENT",
        "PRETE_A_ETRE_LIVREE",
        "LIVREE",
        "CLOTUREE",
        "ANNULEE",
      ]; // your status values
      const currentFilter = column.getFilterValue() as string | undefined;

      return (
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm font-medium">Statut</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={undefined}>
                <ChevronDown className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className={undefined}>
              <DropdownMenuItem
                onClick={() => column.setFilterValue(undefined)}
                className={`flex items-center justify-between cursor-pointer ${
                  !currentFilter ? "bg-muted " : ""
                }`}
                inset={undefined}
              >
                Tous les statuts
                {!currentFilter && <CheckIcon />}
              </DropdownMenuItem>
              <DropdownMenuSeparator className={undefined} />
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => column.setFilterValue(status)}
                  className={`flex items-center justify-between cursor-pointer ${
                    currentFilter === status ? "bg-muted" : ""
                  }`}
                  inset={undefined}
                >
                  <TicketStatus status={status} />
                  {currentFilter === status && <CheckIcon />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("ticketStatus") as string;
      return (
        <div className="max-w-md flex flex-col items-center">
          <TicketStatus status={status} />
          {row.original.note && (
            <div className="text-black text-md mt-2 break-words whitespace-normal max-w-xs text-center">
              <span>
                📌
                <span className="italic font-semibold">Commentaire:</span>{" "}
                {row.original.note}
              </span>
            </div>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!value) return true;
      return row.getValue(id) === value;
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return <ActionDropdownMenu row={row} refreshTable={refreshTable} />;
    },
  },
];
