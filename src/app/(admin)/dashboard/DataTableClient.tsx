// "use client";
// import Loading from "@/app/loading";
// import { fetcher } from "@/services/fetcher";
// import { Product } from "@/types/productType";
// import { ColumnDef, useReactTable } from "@tanstack/react-table";
// import useSWR from "swr";
// // import DataTable, { TableColumn } from "react-data-table-component";

// const columns: ColumnDef<Product>[] = [
//   {
//     header: "Id",
//     accessorKey: "id",
//   },
//   {
//     header: "Title",
//     accessorKey: "title",
//   },
//   {
//     header: "Price",
//     accessorKey: "price",
//   },
//   {
//     header: "Stock",
//     accessorKey: "stock",
//   },
//   {
//     header: "Category",
//     accessorKey: "category",
//   },
// ];

// // export default function DataTableClient() {
// //   const { data, isLoading } = useSWR<{ products: Product[] }>(
// //     `${process.env.NEXT_PUBLIC_BASE_API_URL}?limit=100`,
// //     fetcher
// //   );
// //   if (isLoading) return <Loading />;
// //   return <DataTable pagination columns={columns} data={data?.products || []} />;
// // }

// export default function DataTableClient() {
//   const { data, isLoading } = useSWR<{ products: Product[] }>(
//     `${process.env.NEXT_PUBLIC_BASE_API_URL}?limit=100`,
//     fetcher
//   );

//   const table = useReactTable({
//     data: data?.products ?? [],
//     columns,
//   });
//   if (isLoading) return <Loading />;
//   return <div>DataTableClient</div>;
// }

"use client";
import Loading from "@/app/loading";
import { fetcher } from "@/services/fetcher";
import { Product } from "@/types/productType";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import DataTableComponent from "@/components/data-table/DataTableComponent";

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    size: 30,
  },
  {
    header: "ID",
    accessorKey: "id",
    enableResizing: false,
    size: 80,
  },
  {
    header: "Product title",
    accessorKey: "title",
    enableResizing: false,
    size: 400,
  },
  {
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Price <ArrowUpDown className="ml-2 h-3 w-3" />
        </span>
      );
    },
    accessorKey: "price",
  },
  {
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Stock <ArrowUpDown className="ml-2 h-3 w-3" />
        </span>
      );
    },
    accessorKey: "stock",
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => {
      const rawValue = row.getValue("category");
      const category =
        typeof rawValue === "string"
          ? rawValue.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          : "";
      return <span>{category}</span>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(product.id))}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableClient() {
  const { data, isLoading } = useSWR<{ products: Product[] }>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}?limit=100`,
    fetcher
  );

  if (isLoading || !data) return <Loading />;

  console.log(data);

  return <DataTableComponent columns={columns} data={data?.products} />;
}
