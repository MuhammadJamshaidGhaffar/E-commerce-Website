import React from "react";
import type { Data } from "@/utils/data";
import Link from "next/link";
import Image from "next/image";
import { AddToCartHook } from "@/functions/addToCart";

export default function ProductItem({ product }: { product: Data }) {
  const addToCart = AddToCartHook(product.id);

  return (
    <div className="card">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow h-60 mx-auto"
          //   style={{ height: "60%" }}
        />
      </Link>
      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product.id}`} className="text-lg">
          {product.name}
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="mb-2">{product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={
            addToCart ? addToCart : () => console.log("Product not found")
          }
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
