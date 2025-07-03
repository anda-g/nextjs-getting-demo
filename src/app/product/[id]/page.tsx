import { Product } from "@/types/productType";
import { Metadata } from "next";
import ProductDetail from "./ProductDetail";

type Params = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const data = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}${id}`
  ).then((res) => res.json())) as Product;
  if (!data) {
    return {};
  }
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://kuika.vercel.app/product/${id}`,
      siteName: "Kuika",
      images: [
        {
          url: data.thumbnail,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function page() {
  return <ProductDetail />;
}
