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
    Object.values(item).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
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
    <div className="space-y-4 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 border-gray-300"
              type={undefined}
            />
          </div>
          <Button
            onClick={onAdd}
            className={undefined}
            // className="bg-blue-600 hover:bg-blue-700"
            variant={undefined}
            size={undefined}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
          <Button
            variant="outline"
            onClick={onExport}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            size={undefined}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
        <Table className={undefined}>
          <TableHeader className="bg-gray-50">
            <TableRow className={undefined}>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="text-gray-700 font-medium"
                >
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="text-gray-700 font-medium text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={undefined}>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleViewDetails(item)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${item.id}-${column.key}`}
                      className={undefined}
                    >
                      {column.render
                        ? column.render(item)
                        : String((item as Record<string, unknown>)[column.key])}
                    </TableCell>
                  ))}
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEdit) onEdit(item);
                    }}
                    className={undefined}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    {userDetails?.role === "ROLE_ADMIN" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();

                          setItemToDelete(item);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={undefined}>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-gray-500"
                >
                  Aucune donnée trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className={undefined}>
          <PaginationContent className={undefined}>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={`text-gray-600 hover:bg-gray-50 ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage
                      ? "bg-black"
                      : "text-gray-600 hover:bg-gray-50"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                aria-disabled={currentPage === totalPages}
                className={`text-gray-600 hover:bg-gray-50 ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className={undefined}>
          <AlertDialogHeader className={undefined}>
            <AlertDialogTitle className={undefined}>
              Êtes-vous sûr de vouloir supprimer cet élément ?
            </AlertDialogTitle>
            <AlertDialogDescription className={undefined}>
              Cette action est irréversible. Cet élément sera définitivement
              supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={undefined}>
            <AlertDialogCancel
              className={undefined}
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setItemToDelete(null);
              }}
            >
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(itemToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
