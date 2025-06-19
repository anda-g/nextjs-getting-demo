import React from "react";
import Image from "next/image";
import { Product } from "@/types/productType";
import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

async function getProductById(id: string): Promise<Product> {
  const BASE_URL = `https://dummyjson.com/products/${id}`;
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Network error");
  }
  const data = await res.json();
  const product: Product = data;
  if (!product) {
    return notFound();
  }
  console.log(product);
  return product;
}

// export default function page({ params }: {params: {id: string}}) {
export default async function ProductDetail({ params }: Params) {
  const product = await getProductById(params.id);

  const { id, title, description, price, images, category } = product;
  return (
    <>
      <div key={id} className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Product Image Section */}
            <div className="lg:w-1/2 p-6">
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={
                    images[0] ||
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&auto=format"
                  }
                  alt={title}
                  width={600}
                  height={600}
                  className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="lg:w-1/2 p-8">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-full">
                  {category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>

              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    className="w-5 h-5 text-gray-300 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-gray-600 text-sm">4.5 (120 reviews)</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${price}
                </span>
                {price < 399 && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    $399.99
                  </span>
                )}
                {price < 399 && (
                  <span className="ml-3 px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-full">
                    25% OFF
                  </span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Color:</h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-black rounded-full border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"></button>
                  <button className="w-10 h-10 bg-gray-300 rounded-full border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"></button>
                  <button className="w-10 h-10 bg-blue-500 rounded-full border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"></button>
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity:
                </label>
                <div className="flex items-center">
                  <button className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300">
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    defaultValue="1"
                    className="w-16 text-center border-t border-b border-gray-300 py-1"
                  />
                  <button className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300">
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
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
                <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Wishlist
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Industry-leading noise cancellation</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>30-hour battery life</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Touch sensor controls</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Speak-to-chat technology</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
