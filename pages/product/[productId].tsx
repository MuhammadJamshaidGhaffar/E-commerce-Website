import { addItem, CartType, getCartItemsLength } from "@/store/reducer";
import { selectCart } from "@/store/store";
import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { AddToCartHook } from "@/functions/addToCart";

export default function ProductPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const product = data.find((product) => product.id == router.query.productId);
  if (!product) {
    return <div>The product you're looking for doesn't exits</div>;
  }
  const addToCart = AddToCartHook(product.id);
  return (
    <div className="py-2">
      <Link href="/">back to Products</Link>
      <div className="grid md:grid-cols-4 md:gap-3">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          layout="responsive"
          className="md:col-span-2"
        />
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category : {product.category}</li>
            <li>Brand : {product.brand}</li>
            <li>Product Rating {product.rating} out of 5</li>
            <li>Description : {product.description}</li>
          </ul>
        </div>
        <div className="card p-5 h-fit">
          <div className="mb-2 flex justify-between">
            <p>Price</p>
            <p>${product.price}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Status</p>
            <p>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</p>
          </div>
          <button
            className="primary-button w-full"
            type="button"
            onClick={
              addToCart
                ? addToCart
                : () => {
                    console.log("Product not found");
                  }
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
