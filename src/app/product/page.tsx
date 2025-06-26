"use client";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/productType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loading from "../loading";
import { fetcher } from "@/services/fetcher";
import { useRouter, useSearchParams } from "next/navigation";
import ProductNotFound from "@/components/not-found/ProductNotFound";

export default function ProductPage() {
  const [filterProduct, setFilterProduct] = useState<Product[]>([]);
  const searchParam = useSearchParams();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}?limit=100`,
    fetcher
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const param = new URLSearchParams();
    if (query.trim()) {
      param.set("search", query.trim().toLowerCase());
    } else {
      param.delete("search");
    }
    router.push(`/product?${param.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const param = new URLSearchParams();
    if (value.trim()) {
      param.set("search", value);
    } else {
      param.delete("search");
    }
    router.push(`/product?${param.toString()}`);
  };

  useEffect(() => {
    if (!data) return;
    const s = searchParam.get("search");

    if (!s) {
      setFilterProduct(data.products);
    } else {
      setQuery(s);
      setFilterProduct(
        data.products.filter((p: Product) =>
          p.title.toLowerCase().includes(s.toLowerCase())
        )
      );
    }
  }, [data, searchParam]);
  if (isLoading && !data) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <>
      <main className="flex flex-col pt-16">
        <div className="bg-blue-50 w-full h-64 px-20 flex items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl">ALL Product</h1>
            <ol className="flex items-center whitespace-nowrap">
              <li className="inline-flex items-center">
                <Link
                  className="flex items-center text-sm text-gra hover:text-blue-600"
                  href="/"
                >
                  Home
                </Link>
                <svg
                  className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li
                className="inline-flex items-center text-sm text-gray-600"
                aria-current="page"
              >
                Products
              </li>
            </ol>
          </div>
        </div>
        <div className="flex items-center justify-between py-5 px-20">
          <div></div>
          <div>
            <label
              htmlFor="hs-trailing-button-add-on-with-icon-and-button"
              className="sr-only"
            >
              Label
            </label>
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex rounded-lg"
            >
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearchChange}
                className="py-2.5 sm:py-3 px-4 ps-11 block w-full border-2 border-blue-200 rounded-s-lg sm:text-sm active:z-10 focus:outline-blue-500 "
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                <svg
                  className="shrink-0 size-4 text-blue-400 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 px-20 w-full">
          {filterProduct.length === 0 ? (
            <ProductNotFound />
          ) : (
            filterProduct.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))
          )}
        </div>
      </main>
    </>
  );
}
