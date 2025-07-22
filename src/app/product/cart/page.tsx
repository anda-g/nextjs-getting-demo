"use client";
import { Button } from "@/components/ui/button";
import ProductCartItem from "@/components/product/ProductCartItem";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);

  const { total, itemCount } = useAppSelector((state) => state.cart);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  if (itemCount == 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center ">
        Your cart is empty
      </div>
    );
  }

  return (
    <main className=" pt-24 px-5 md:px-20 h-screen">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold">Your cart</h1>
        <p className="text-gray-600">{itemCount} Products in your cart</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Cart item list */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="w-full rounded-md border-2 border-gray-200">
            <div className="py-4 flex flex-col gap-4">
              {(items || []).map((item) => (
                <ProductCartItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-md border-2 border-gray-200 h-fit p-5">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Order summary</h1>
            <p className="text-gray-600">{itemCount} Products in your cart</p>
            <div className="flex justify-between ">
              <span>Subtotal ({itemCount} items)</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            {total < 50 && (
              <p className="text-sm text-muted-foreground">
                Add ${(50 - total).toFixed(2)} more for free shipping!
              </p>
            )}

            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Secure checkout</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Customer support</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
