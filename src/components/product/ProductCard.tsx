"use client";
import React from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types/productType";
import Image from "next/image";
import { motion } from "motion/react";

type Props = {
  index?: number;
  product: Product;
};

export default function ProductCard({ index = 0, product }: Props) {
  const averageRating =
    product?.reviews?.reduce((acc, r) => acc + r?.rating, 0) /
      product?.reviews?.length || 0;

  return (
    <motion.div
      initial={{ y: 10, opacity: 0.8 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="rounded-md bg-white p-4 flex flex-col border-1 border-gray-200"
    >
      <div className="relative hover:bg-gray-200 transition-colors ease-in duration-300 rounded-xl">
        <Image
          width={196}
          height={196}
          src={
            product?.images[0] ||
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&auto=format"
          }
          alt={product?.title}
          className="rounded-xl w-full object-contain h-56"
          loading="lazy"
        />
        {product?.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product?.discountPercentage.toFixed(0)}% OFF
          </div>
        )}
        {product?.stock < 1 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col flex-grow gap-1">
        <h3 className="text-md font-semibold text-gray-800 line-clamp-1">
          {product?.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {product?.brand || "Apple"} • {product?.category}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`
                  ${
                    i < Math.round(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                `}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product?.reviews?.length})
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-gray-500 line-clamp-2 text-sm">
        <p>{product?.description}</p>
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
          <button className="bg-gray-900 text-white p-2 rounded-md hover:bg-opacity-80">
            <ShoppingCart size={16} />
          </button>
          <button className="transition-colors duration-300 ease-in-out border hover:border-gray-900 text-gray-900 p-2 rounded-md hover:bg-gray-900 hover:text-white">
            <Eye size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
