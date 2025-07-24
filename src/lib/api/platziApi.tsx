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

type CategoryResponse = {
  id: string;
  name: string;
};

type FileResponse = {
  originalname: string;
  filename: string;
  location: string;
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
    addFile: builder.mutation<FileResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file); // must match API

        return {
          url: "files/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
    getCategory: builder.query<CategoryResponse[], void>({
      query: () => "categories",
      providesTags: ["Platzi"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useAddFileMutation,
  useGetCategoryQuery,
} = platziApi;
