"use client";
import Loading from "@/app/loading";
import { fetcher } from "@/services/fetcher";
import { Product } from "@/types/productType";
import DataTable, { TableColumn } from "react-data-table-component";
import useSWR from "swr";

const columns: TableColumn<Product>[] = [
  {
    name: "Id",
    selector: (row) => row.id,
  },
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Stock",
    selector: (row) => row.stock,
  },
  {
    name: "Category",
    selector: (row) => row.category,
  },
];

export default function DataTableClient() {
  const { data, isLoading } = useSWR<{ products: Product[] }>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}?limit=100`,
    fetcher
  );
  if (isLoading) return <Loading />;
  return <DataTable pagination columns={columns} data={data?.products || []} />;
}
