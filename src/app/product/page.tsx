import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/productType";
import Link from "next/link";
import React from "react";

export default async function ProductPage() {
  const BASE_URL: string = "https://dummyjson.com/products";
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Network error");
  }
  const data = await res.json();
  const products: Product[] = data.products;
  console.log(products);

  await new Promise((resolve) => setTimeout(resolve, 10000));
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-5">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}
