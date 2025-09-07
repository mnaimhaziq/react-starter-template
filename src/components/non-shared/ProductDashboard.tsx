import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, Dropdown } from "flowbite-react";
import ReusableTable from "../ui/reusabletable";

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
    [],
  );

  return (
    <ReusableTable
      data={data}
      columns={columns}
      globalFilterPlaceholder="Search products..."
      defaultPageSize={10}
      pageSizeOptions={[10, 25, 50]}
      onAddClick={() => alert("Add product clicked!")}
      addButtonText="Add Product"
    />
  );
};

export default ProductDashboard;