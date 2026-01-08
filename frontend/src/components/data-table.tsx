import React, { JSX, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Plus, Search, Pencil, Trash2 } from "lucide-react";
import type { Column } from "@/gestion_marche/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthProvider";
import api from "@/utils/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { set } from "react-hook-form";

interface DataTableProps<T> {
  dataT: T[];
  columns: Column<T>[];
  onAdd: () => void;
  onExport: () => void;
  onEdit?: (item: T) => void;
  title: string;
}

// Ajout de la navigation vers la page de détail
export default function DataTable<T extends { id: number | string }>({
  dataT,
  columns,
  onAdd,
  onExport,
  onEdit,
  title,
}: DataTableProps<T>): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [data, setData] = useState<T[]>(dataT);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  useEffect(() => {
    if (dataT && dataT.length > 0) {
      setData(dataT);
    }
  }, [dataT]);

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    columns.some((column) => {
      const value = column.render
        ? column.render(item)
        : (item as Record<string, any>)[column.key];
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewDetails = (item: T): void => {
    // Determine the route based on the data structure
    let route = "";
    if ("referenceMarche" in item) {
      route = `/gm/marches/${item.id}`;
    } else if ("typeAO" in item) {
      route = `/gm/appelOffres/${item.id}`;
    } else if ("numBC" in item) {
      route = `/gm/bons-commande/${item.id}`;
    } else if ("reference" in item) {
      route = `/gm/contrats/${item.id}`;
    }

    if (route) {
      navigate(route, { state: { item } });
    }
  };

  async function handleDelete(item) {
    if (!item) return;

    let route = "";
    if ("referenceMarche" in item) {
      route = `/admin/delete-marche/${item.id}`;
    } else if ("typeAO" in item) {
      route = `/admin/delete-appel-offre/${item.id}`;
    } else if ("numBC" in item) {
      route = `/admin/delete-bon-commande/${item.id}`;
    } else if ("reference" in item) {
      route = `/admin/delete-contract/${item.id}`;
    }
    if (route) {
      try {
        const response = await api.delete(route);
        if (response.status === 200 && response.data.includes("deleted")) {
          console.log("Item deleted successfully:", item);
          setData(data.filter((i) => i.id !== item.id));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  }

  return (
    <div className="space-y-4 rounded-lg border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border-slate-300 bg-white pl-9 focus:ring-slate-500"
              type="search"
            />
          </div>
          <Button
            onClick={onAdd}
            className="flex items-center justify-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
            variant="default"
            size="default"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
          <Button
            variant="outline"
            onClick={onExport}
            className="flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-green-600 hover:text-white"
            size="default"
          >
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto overflow-hidden rounded-md border border-slate-200/80">
        <Table className="mmin-w-full table-auto">
          <TableHeader className="bg-slate-50">
            <TableRow className="">
              {columns.map((column) => (
                <TableHead
                  key={column.key as string}
                  className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-600"
                >
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="px-2 py-2 text-center text-xs font-medium uppercase tracking-wider text-slate-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-200/80 bg-white">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer transition-colors hover:bg-slate-50"
                  onClick={() => handleViewDetails(item)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${item.id}-${column.key as string}`}
                      className="px-2 py-2 text-sm text-slate-700"
                    >
                      {column.render
                        ? column.render(item)
                        : String(
                            (item as Record<string, unknown>)[
                              column.key as string
                            ]
                          )}
                    </TableCell>
                  ))}
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="px-2 py-2 text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        onClick={() => onEdit && onEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {userDetails.role.includes("ROLE_ADMIN") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:bg-red-100 hover:text-red-700"
                          onClick={() => {
                            setIsDeleteDialogOpen(true);
                            setItemToDelete(item);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell
                  colSpan={columns.length + 1}
                  className="py-10 text-center text-slate-500"
                >
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="">
          <PaginationContent className="">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none text-slate-400"
                    : "text-slate-700"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                  className="rounded-md"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none text-slate-400"
                    : "text-slate-700"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="">
          <AlertDialogHeader className="">
            <AlertDialogTitle className="">Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription className="">
              Cette action est irréversible. Cela supprimera définitivement
              l'élément sélectionné.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <AlertDialogCancel className="">Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete(itemToDelete);
                setIsDeleteDialogOpen(false);
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
