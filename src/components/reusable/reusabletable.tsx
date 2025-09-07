import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
  TextInput,
  Button,
  Select,
} from "flowbite-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { HiSearch } from "react-icons/hi";

interface ReusableTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  globalFilterPlaceholder?: string;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onAddClick?: () => void;
  addButtonText?: string;
}

function ReusableTable<T>({
  data,
  columns,
  globalFilterPlaceholder = "Search...",
  defaultPageSize = 10,
  pageSizeOptions = [10, 25, 50],
  onAddClick,
  addButtonText = "Add Item",
}: ReusableTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const total = table.getFilteredRowModel().rows.length;
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Search and Add Button */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <TextInput
          icon={HiSearch}
          placeholder={globalFilterPlaceholder}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 sm:max-w-md"
        />
        {onAddClick && (
          <Button
            onClick={onAddClick}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700"
          >
            {addButtonText}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
        <Table className="w-full">
          <TableHead className="bg-gray-100 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="text-gray-700 dark:text-gray-200"
              >
                {headerGroup.headers.map((header) => (
                  <TableHeadCell
                    key={header.id}
                    className="px-6 py-4 font-semibold"
                  >
                    <div className="flex flex-col">
                      <span
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex cursor-pointer items-center transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <span className="ml-2">
                          {{
                            asc: " ↑",
                            desc: " ↓",
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                      </span>
                      {header.column.getCanFilter() ? (
                        <TextInput
                          className="mt-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                          value={
                            (header.column.getFilterValue() as string) ?? ""
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          placeholder={`Filter ${header.column.columnDef.header}`}
                          sizing="sm"
                        />
                      ) : null}
                    </div>
                  </TableHeadCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white transition-colors duration-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination and Info */}
      <div className="mt-6 flex flex-col items-center justify-between text-gray-600 sm:flex-row dark:text-gray-300">
        <span className="mb-4 text-sm font-medium sm:mb-0">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {start}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {end}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {total}
          </span>{" "}
          items
        </span>
        <div className="flex items-center space-x-4">
          <Select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            sizing="sm"
            className="rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </Select>
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={Math.max(1, table.getPageCount())}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            showIcons
            className="flex items-center space-x-2"
          />
        </div>
      </div>
    </div>
  );
}

export default ReusableTable;