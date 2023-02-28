import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { incItemAsync } from "@/store/reducer";
import { ProductTypeMongo } from "@/utils/data";

const ProductItem: React.FC<{ product: ProductTypeMongo }> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <Link href={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow h-60 mx-auto"
        />
      </Link>
      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product._id}`} className="text-lg">
          {product.name}
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="mb-2">{product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            incItemAsync(product._id, dispatch);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
