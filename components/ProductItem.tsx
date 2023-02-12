import React from "react";
import type { ProductType } from "@/utils/data";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { incItem } from "@/store/reducer";
import { useRouter } from "next/router";

export default function ProductItem({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  const router = useRouter();

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
          onClick={() => {
            dispatch(incItem(product.id));
            router.push("/cart");
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
