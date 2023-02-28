import {
  decItem,
  getCartItemsLength,
  incItem,
  removeItem,
} from "@/store/reducer";
import { selectCart } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import EmptyCart from "@/components/EmptyCart";

export default function Cart() {
  const router = useRouter();
  const cart = useSelector(selectCart);
  const cartLength = getCartItemsLength(cart);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="mb-4 text-x1">Shopping Cart</h1>
      {cartLength === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td>
                      <Link
                        href={`/product/${product._id}`}
                        className="flex items-center"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                        &nbsp;{product.name}
                      </Link>
                    </td>

                    <td className="p-5 flex flex-row-reverse">
                      <div className="flex flex-col">
                        <button>
                          <ArrowSmallUpIcon
                            className="h-5 w-5"
                            onClick={() => {
                              dispatch(incItem(product));
                            }}
                          ></ArrowSmallUpIcon>
                        </button>
                        <button>
                          <ArrowSmallDownIcon
                            className="h-5 w-5"
                            onClick={() => {
                              dispatch(decItem(product._id));
                            }}
                          ></ArrowSmallDownIcon>
                        </button>
                      </div>
                      <div
                        className="text-right"
                        style={{ alignSelf: "center" }}
                      >
                        {product.quantity}
                      </div>
                    </td>
                    <td className="p-5 text-right">{product.price}</td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => {
                          dispatch(removeItem(product.id));
                        }}
                      >
                        {" "}
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 h-fit">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartLength}) : $
                  {cart.reduce((a, b) => a + b.quantity * b.price, 0)}
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-full"
                  onClick={() => {
                    if (session?.user) router.push("/shipping");
                    else router.push("/login?redirect=/shipping");
                  }}
                >
                  Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
