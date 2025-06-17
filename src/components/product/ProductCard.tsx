import { Product } from "@/types/productType";
import React from "react";
import Image from "next/image";

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
}: Product) {
  return (
    <div
      key={id}
      className="group relative  bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-3 py-1 text-xs font-bold tracking-wide text-white bg-black rounded-full shadow">
          PREMIUM
        </span>
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 cursor-pointer bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition">
        <svg
          className="w-5 h-5 text-gray-600 group-hover:text-rose-500 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Product Image */}
      <div className="relative h-60 bg-gray-100 flex items-center justify-center">
        <Image
          width={240}
          height={240}
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&auto=format"
          }
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {category}
          </span>
          <div className="flex">
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-amber-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09L5.64 12.18.762 7.91l6.093-.885L10 1l3.145 6.025 6.093.885-4.878 4.27 1.518 5.91z" />
              </svg>
            ))}
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09L5.64 12.18.762 7.91l6.093-.885L10 1l3.145 6.025 6.093.885-4.878 4.27 1.518 5.91z" />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">${price}</span>
            {price < 399 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                $399
              </span>
            )}
          </div>

          {price < 399 && (
            <span className="px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
              25% OFF
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition flex items-center justify-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition flex items-center justify-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z"
              />
            </svg>
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
}
