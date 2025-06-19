export type Product = {
  id: number;
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage: number;
  images: string[];
  meta: {
    barcode: string;
    createdAt: string;
    qrCode: string;
    updatedAt: string;
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
};
