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
import { useState } from "react";
import ProductDetailsModal from "@/components/product/ProductDetailsModal";

export default function DataTableClient() {
  const { data, isLoading } = useSWR<{ products: Product[] }>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}?limit=100`,
    fetcher
  );

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
      header: "Brand",
      accessorKey: "brand",
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
            ? rawValue
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())
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
                onClick={() =>
                  navigator.clipboard.writeText(String(product.id))
                }
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProductView(row.original)}>
                View product
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [toggleProduct, setToggleProduct] = useState<Product>();
  const [isOpen, setIsOpen] = useState(false);
  const handleProductView = (product: Product) => {
    setIsOpen(true);
    setToggleProduct(product);
  };
  if (isLoading || !data) return <Loading />;

  console.log(data);

  return (
    <>
      <DataTableComponent columns={columns} data={data?.products} />
      {isOpen && (
        <ProductDetailsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleProduct={toggleProduct || null}
        />
        // <div
        //   id="default-modal"
        //   aria-hidden="true"
        //   className="flex bg-black/40 h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 max-h-full"
        // >
        //   <div className="relative p-4 w-full max-w-2xl max-h-full">
        //     <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        //       <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        //         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        //           {toggleProduct?.title}
        //         </h3>
        //         <button
        //           onClick={() => setIsOpen(false)}
        //           type="button"
        //           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        //           data-modal-hide="default-modal"
        //         >
        //           <svg
        //             className="w-3 h-3"
        //             aria-hidden="true"
        //             xmlns="http://www.w3.org/2000/svg"
        //             fill="none"
        //             viewBox="0 0 14 14"
        //           >
        //             <path
        //               stroke="currentColor"
        //               strokeLinecap="round"
        //               strokeLinejoin="round"
        //               strokeWidth="2"
        //               d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        //             />
        //           </svg>
        //           <span className="sr-only">Close modal</span>
        //         </button>
        //       </div>
        //       <div className="p-4 md:p-5 space-y-4">
        //         <Image
        //           width={200}
        //           height={200}
        //           unoptimized
        //           className="w-2/3 object-contain mx-auto"
        //           src={toggleProduct?.images[0] || ""}
        //           alt={toggleProduct?.title || ""}
        //         />
        //         <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //           {toggleProduct?.description}
        //         </p>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
}
