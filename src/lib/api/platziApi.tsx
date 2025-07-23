import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CreateProductType = {
  title: string;
  price: number;
  categoryId: string;
  description: string;
  images: string[];
};

type ProductResponseType = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
  };
};

export const platziApi = createApi({
  reducerPath: "platziApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
  tagTypes: ["Platzi"],
  endpoints: (builder) => ({
    addProduct: builder.mutation<ProductResponseType, CreateProductType>({
      query: (body) => ({
        url: "products/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Platzi"],
    }),
  }),
});

export const { useAddProductMutation } = platziApi;
