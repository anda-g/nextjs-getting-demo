"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/productType";

interface ProductDetailsModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleProduct: Product | null;
}

const StarRating = ({
  rating,
  size = "w-4 h-4",
}: {
  rating: number;
  size?: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function ProductDetailsModal({
  isOpen,
  setIsOpen,
  toggleProduct,
}: ProductDetailsModalProps) {
  if (!toggleProduct) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent id="default-modal" aria-hidden="true">
        <DialogHeader>
          <DialogTitle>{toggleProduct?.title}</DialogTitle>
          <StarRating rating={toggleProduct?.rating} />
        </DialogHeader>

        <div className="p-4 md:p-5 space-y-4">
          <Image
            width={200}
            height={200}
            unoptimized
            className="w-2/3 object-contain mx-auto"
            src={toggleProduct?.images[0] || ""}
            alt={toggleProduct?.title || ""}
          />
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {toggleProduct?.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
