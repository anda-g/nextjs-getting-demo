import ProductCard from "@/components/product/ProductCard";
import { productData } from "@/data/productData";
import Link from "next/link";
import React from "react";

export default async function Product() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-5">
        {productData.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              category={product.category}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
