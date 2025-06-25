"use client";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/productType";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Loading from "../loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage() {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    fetcher
  );

  if (isLoading && !data) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-5 pt-20">
        {(data.products as Product[]).map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}
