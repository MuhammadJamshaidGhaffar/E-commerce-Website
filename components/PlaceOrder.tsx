import { toastFunc } from "@/functions/toast";
import {
  selectCart,
  selectPaymentMethod,
  selectShippingAddress,
} from "@/store/store";
import { getError } from "@/utils/get-error";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { useState } from "react";
import { deleteCart } from "@/store/reducer";

type props = {
  step: number;
  updateStep: any;
};

export default function PlaceOrder({ step, updateStep }: props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = cart.reduce((a, b) => a + b.quantity * b.price, 0);
  const taxPrice = round2(itemsPrice * 0.15);
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    console.log(
      JSON.stringify({
        orderItems: cart,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
    try {
      setLoading(true);
      const order = await (
        await fetch(`api/orders`, {
          method: "POSt",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            orderItems: cart,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          }),
        })
      ).json();
      dispatch(deleteCart());
      router.push(`/order/${order._id}`);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toastFunc.error(getError(err));
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-xl mt-4">Place Order</h1>
      {cart.length == 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 ">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName} , {shippingAddress.address} ,{" "}
                {shippingAddress.city} , {shippingAddress.postalCode} ,{" "}
                {shippingAddress.country}
              </div>
              <div>
                <a onClick={() => updateStep(1)}>edit</a>
              </div>
              <div className="card p-5">
                <h2 className="mb-2 text-lg">Payment Method</h2>
                <div>{paymentMethod}</div>
                <div>
                  <a onClick={() => updateStep(2)}>edit</a>
                </div>
              </div>
              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg">Order Items</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="p-5 text-right">Quantity</th>
                      <th className="p-5 text-right">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <Link href={`/product/${product._id}`}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={50}
                              height={50}
                            />
                            &nbsp;
                            {product.name}
                          </Link>
                        </td>
                        <td className="p-5 text-right">{product.quantity}</td>
                        <td className="p-5 text-right">${product.price}</td>
                        <td className="p-5 text-right">
                          ${product.price * product.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 border-t-gray-400 border-t">
                  <Link href="/cart">edit</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrder}
                  className="primary-button w-full"
                >
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
