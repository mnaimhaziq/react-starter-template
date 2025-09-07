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
  Badge,
  Dropdown,
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

// Mock Ticket Data
interface Ticket {
  id: number;
  title: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdDate: string;
  assignedAgent: string;
  category: string;
}

const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Website login issue",
    priority: "High",
    status: "Open",
    createdDate: "2025-09-01T10:00:00Z",
    assignedAgent: "Alice Johnson",
    category: "Technical",
  },
  {
    id: 2,
    title: "Payment processing error",
    priority: "Urgent",
    status: "In Progress",
    createdDate: "2025-09-02T14:30:00Z",
    assignedAgent: "Bob Smith",
    category: "Billing",
  },
  {
    id: 3,
    title: "Feature request: Dark mode",
    priority: "Low",
    status: "Open",
    createdDate: "2025-09-03T09:15:00Z",
    assignedAgent: "Unassigned",
    category: "Enhancement",
  },
  {
    id: 4,
    title: "Server downtime reported",
    priority: "Urgent",
    status: "Resolved",
    createdDate: "2025-09-04T08:45:00Z",
    assignedAgent: "Charlie Brown",
    category: "Technical",
  },
  {
    id: 5,
    title: "Incorrect user data displayed",
    priority: "Medium",
    status: "In Progress",
    createdDate: "2025-09-05T11:20:00Z",
    assignedAgent: "Dana White",
    category: "Data",
  },
  {
    id: 6,
    title: "Mobile app crash on startup",
    priority: "High",
    status: "Open",
    createdDate: "2025-09-06T16:00:00Z",
    assignedAgent: "Emma Davis",
    category: "Technical",
  },
  {
    id: 7,
    title: "Refund request",
    priority: "Medium",
    status: "Closed",
    createdDate: "2025-09-06T12:30:00Z",
    assignedAgent: "Frank Miller",
    category: "Billing",
  },
  {
    id: 8,
    title: "UI bug in dashboard",
    priority: "Low",
    status: "Open",
    createdDate: "2025-09-07T07:50:00Z",
    assignedAgent: "Unassigned",
    category: "UI/UX",
  },
  {
    id: 9,
    title: "Security vulnerability report",
    priority: "Urgent",
    status: "In Progress",
    createdDate: "2025-09-07T09:00:00Z",
    assignedAgent: "Grace Lee",
    category: "Security",
  },
  {
    id: 10,
    title: "Event ticket not received",
    priority: "Medium",
    status: "Open",
    createdDate: "2025-09-07T10:15:00Z",
    assignedAgent: "Henry Wilson",
    category: "Event",
  },
];

// Reusable Table Component
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

// Ticket Dashboard Component
const TicketTable: React.FC = () => {
  const data = useMemo(() => mockTickets, []);

  const columns = useMemo<ColumnDef<Ticket>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Ticket ID",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900 dark:text-white">
            {row.original.id}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-300">
            {row.original.title}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => (
          <Badge
            className="rounded-full px-3 py-1 font-medium"
            color={
              row.original.priority === "Urgent"
                ? "failure"
                : row.original.priority === "High"
                ? "warning"
                : row.original.priority === "Medium"
                ? "info"
                : "success"
            }
          >
            {row.original.priority}
          </Badge>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className="rounded-full px-3 py-1 font-medium"
            color={
              row.original.status === "Open"
                ? "info"
                : row.original.status === "In Progress"
                ? "warning"
                : row.original.status === "Resolved"
                ? "success"
                : "dark"
            }
          >
            {row.original.status}
          </Badge>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "createdDate",
        header: "Created Date",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-300">
            {new Date(row.original.createdDate).toLocaleDateString()}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: false,
      },
      {
        accessorKey: "assignedAgent",
        header: "Assigned Agent",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-300">
            {row.original.assignedAgent}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-300">
            {row.original.category}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Dropdown
            label=""
            renderTrigger={() => (
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700"
              >
                Actions
              </Button>
            )}
          >
            <span className="block cursor-pointer px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">
              View
            </span>
            <span className="block cursor-pointer px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">
              Edit
            </span>
            <span className="block cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
              Delete
            </span>
          </Dropdown>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    []
  );

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Support Tickets
      </h1>
      <ReusableTable
        data={data}
        columns={columns}
        globalFilterPlaceholder="Search tickets..."
        defaultPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        onAddClick={() => alert("Add ticket clicked!")}
        addButtonText="Add Ticket"
      />
    </div>
  );
};

export default TicketTable;