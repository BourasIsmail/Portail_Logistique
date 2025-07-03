import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  usePagination?: boolean;
  sorting?: SortingState;
  setSorting?: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  usePagination = false,
  sorting,
  setSorting,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable(
    usePagination
      ? {
          data,
          columns,
          state: {
            pagination,
            sorting,
            columnFilters,
          },
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          onPaginationChange: setPagination,
          onSortingChange: setSorting,
          getSortedRowModel: getSortedRowModel(),
          onColumnFiltersChange: setColumnFilters,
          getFilteredRowModel: getFilteredRowModel(),
        }
      : {
          data,
          columns,
          state: {
            sorting,
          },
          getCoreRowModel: getCoreRowModel(),
          onSortingChange: setSorting,
          getSortedRowModel: getSortedRowModel(),
        }
  );

  return (
    <div>
      {usePagination && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrer par entité ..."
            value={
              (table.getColumn("service")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("service")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            type={"text"}
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table className={undefined}>
          <TableHeader className={undefined}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={undefined}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={undefined}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={undefined}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={undefined}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={undefined}>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {usePagination && (
        <div className="flex items-center justify-end px-4 mt-4">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Button>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
