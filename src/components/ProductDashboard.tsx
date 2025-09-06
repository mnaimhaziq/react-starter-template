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
  Badge,
  Button,
  Select,
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

// Mock product data (replace with your actual data source)
const mockProducts = [
  {
    id: 1,
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: 2999,
    stock: 50,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Apple+MacBook+Pro",
  },
  {
    id: 2,
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: 1999,
    stock: 30,
    status: "Low Stock",
    image: "https://via.placeholder.com/100?text=Microsoft+Surface+Pro",
  },
  {
    id: 3,
    name: "Magic Keyboard",
    color: "Black",
    category: "Accessories",
    price: 99,
    stock: 100,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Magic+Keyboard",
  },
  {
    id: 4,
    name: "Google Pixel 7",
    color: "Black",
    category: "Phone",
    price: 599,
    stock: 20,
    status: "Out of Stock",
    image: "https://via.placeholder.com/100?text=Google+Pixel+7",
  },
  {
    id: 5,
    name: "Samsung Galaxy S23",
    color: "Green",
    category: "Phone",
    price: 799,
    stock: 40,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Samsung+Galaxy+S23",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    color: "Black",
    category: "Headphones",
    price: 349,
    stock: 60,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Sony+WH-1000XM5",
  },
  {
    id: 7,
    name: "Logitech MX Master 3",
    color: "Graphite",
    category: "Accessories",
    price: 99,
    stock: 80,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Logitech+MX+Master+3",
  },
  {
    id: 8,
    name: "Dell XPS 13",
    color: "Silver",
    category: "Laptop",
    price: 1299,
    stock: 25,
    status: "Low Stock",
    image: "https://via.placeholder.com/100?text=Dell+XPS+13",
  },
  {
    id: 9,
    name: 'iPad Pro 12.9"',
    color: "Space Gray",
    category: "Tablet",
    price: 1099,
    stock: 35,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=iPad+Pro",
  },
  {
    id: 10,
    name: "Bose QuietComfort 45",
    color: "White",
    category: "Headphones",
    price: 329,
    stock: 45,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Bose+QuietComfort+45",
  },
  {
    id: 11,
    name: "Amazon Echo Dot",
    color: "Black",
    category: "Smart Home",
    price: 49,
    stock: 100,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Amazon+Echo+Dot",
  },
  {
    id: 12,
    name: "Fitbit Versa 3",
    color: "Pink",
    category: "Wearable",
    price: 229,
    stock: 70,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Fitbit+Versa+3",
  },
  {
    id: 13,
    name: "Canon EOS R6",
    color: "Black",
    category: "Camera",
    price: 2499,
    stock: 15,
    status: "Low Stock",
    image: "https://via.placeholder.com/100?text=Canon+EOS+R6",
  },
  {
    id: 14,
    name: "Nintendo Switch",
    color: "Neon Blue/Red",
    category: "Gaming",
    price: 299,
    stock: 50,
    status: "In Stock",
    image: "https://via.placeholder.com/100?text=Nintendo+Switch",
  },
  {
    id: 15,
    name: "DJI Mavic Air 2",
    color: "Gray",
    category: "Drone",
    price: 799,
    stock: 20,
    status: "Out of Stock",
    image: "https://via.placeholder.com/100?text=DJI+Mavic+Air+2",
  },
];

interface Product {
  id: number;
  name: string;
  color: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}

const ProductDashboard: React.FC = () => {
  const data = useMemo(() => mockProducts, []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "image",
        header: "Image",
        accessorFn: (row) => row.image,
        cell: ({ row }) =>
          row.original.image ? (
            <img
              src={row.original.image}
              alt={row.original.name}
              className="h-12 w-12 transform rounded-lg object-cover shadow-sm transition-transform duration-200 hover:scale-105"
            />
          ) : null,
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900 dark:text-white">
            {row.original.name}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-300">
            {row.original.color}
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
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            ${row.original.price.toLocaleString()}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: false,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-300">
            {row.original.stock}
          </span>
        ),
        enableSorting: true,
        enableColumnFilter: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className="rounded-full px-3 py-1 font-medium"
            color={
              row.original.status === "In Stock"
                ? "success"
                : row.original.status === "Low Stock"
                  ? "warning"
                  : "failure"
            }
          >
            {row.original.status}
          </Badge>
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
            <Dropdown.Item className="hover:bg-blue-50 dark:hover:bg-gray-700">
              View
            </Dropdown.Item>
            <Dropdown.Item className="hover:bg-blue-50 dark:hover:bg-gray-700">
              Edit
            </Dropdown.Item>
            <Dropdown.Item className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
              Delete
            </Dropdown.Item>
          </Dropdown>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [],
  );

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
    debugTable: true,
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const total = table.getFilteredRowModel().rows.length;
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <div className="mx-auto max-w-7xl rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Product Dashboard
      </h2>

      {/* Search and Add Button */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <TextInput
          icon={HiSearch}
          placeholder="Search products..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 sm:max-w-md"
        />
        <Button className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700">
          Add Product
        </Button>
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
          products
        </span>
        <div className="flex items-center space-x-4">
          <Select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            sizing="sm"
            className="rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            {[10, 25, 50].map((size) => (
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
};

export default ProductDashboard;
