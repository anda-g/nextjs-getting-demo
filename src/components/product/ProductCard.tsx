"use client";
import React from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types/productType";
import Image from "next/image";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const averageRating =
    product?.reviews?.reduce((acc, r) => acc + r?.rating, 0) /
      product?.reviews?.length || 0;

  return (
    <div className="rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col">
      <div className="relative">
        <Image
          width={196}
          height={196}
          src={product?.images[0]}
          alt={product?.title}
          className="rounded-xl w-full object-cover h-48"
          loading="lazy"
        />
        {product?.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product?.discountPercentage.toFixed(0)}% OFF
          </div>
        )}
        {product?.stock < 1 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="mt-4 flex-grow">
        <h3 className="text-sm font-semibold text-gray-800">
          {product?.title}
        </h3>
        <p className="text-xs text-gray-500">
          {product?.brand} • {product?.category}
        </p>

        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.round(averageRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product?.reviews?.length})
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-base font-bold text-primary">
            ${product?.price}
          </span>
          {product?.discountPercentage > 0 && (
            <span className="text-sm line-through text-gray-400 ml-1">
              $
              {(
                product?.price /
                (1 - product?.discountPercentage / 100)
              ).toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-80">
            <ShoppingCart size={16} />
          </button>
          <button className="border border-primary text-primary p-2 rounded-lg hover:bg-primary hover:text-white">
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
