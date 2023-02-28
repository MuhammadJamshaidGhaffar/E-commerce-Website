import { getError } from "@/utils/get-error";
import { orderType } from "@/utils/order";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

type initialStateType = {
  loading: boolean;
  error: string;
  order: orderType | null;
};

const initialState: initialStateType = {
  loading: true,
  error: "",
  order: null,
};

function reducer(
  state: typeof initialState,
  action: { type: String; payload?: any }
): initialStateType {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", order: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const router = useRouter();
  const orderId = router.query.id;

  const [{ loading, error, order }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchOrder() {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data: orderType = await response.json();
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    }
    fetchOrder();
  }, [orderId]);

  return (
    <div>
      <h1 className="mb-4 text-xl">{orderId}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : order == null ? (
        ""
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="md:col-span-3 overflow-x-auto">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {order.shippingAddress.fullName} ,{" "}
                {order.shippingAddress.address} , {order.shippingAddress.city} ,{" "}
                {order.shippingAddress.postalCode} ,{" "}
                {order.shippingAddress.country}
              </div>
              {order.isDelivered ? (
                <div className="alert-success">
                  Delivered at {order.deliveredAt}
                </div>
              ) : (
                <div className="alert-error">Not Delivered</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{order.paymentMethod}</div>
              {order.isPaid ? (
                <div className="alert-success">Paid at {order.paidAt}</div>
              ) : (
                <div className="alert-error">Not Paid</div>
              )}
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
                  {order.orderItems.map((product) => (
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
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${order.totalPrice}</div>
                </div>
              </li>

              {order.paymentMethod != "CashOnDelivery" ? (
                <li>
                  <button
                    className="primary-button w-full"
                    onClick={async () => {
                      const response = await (
                        await fetch(`/api/orders/${orderId}/pay`)
                      ).json();
                      window.location.href = response.url;
                    }}
                  >
                    Pay with {order.paymentMethod}
                  </button>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

OrderScreen.auth = true;
