import { Product } from "@/types/productType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ProductResponse = {
  products: Product[];
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, void>({
      query: () => "products?limit=100",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
