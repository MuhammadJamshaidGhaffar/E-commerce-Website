import Image from "next/image";
import Link from "next/link";
import React from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { incItemAsync } from "@/store/reducer";
import productModel from "@/utils/product";
import db from "@/utils/db";
import { GetServerSidePropsContext } from "next";
import { ProductTypeMongo } from "@/utils/data";

const ProductPage: React.FC<{
  product: ProductTypeMongo;
}> = ({ product }) => {
  const dispatch = useDispatch();
  if (!product) {
    return <div>The product you&apos;re looking for doesn&apos;t exits</div>;
  }
  console.log(product);

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

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
              onClick={() => {
                incItemAsync(product._id, dispatch);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await db.connect();

  if (!context?.params?.productId)
    return {
      notFound: true,
    };

  const product = db.convertDocToObj(
    await productModel.findOne({ _id: context.params.productId }).lean()
  );
  return {
    props: {
      product,
    },
  };
}
