import { getError } from "@/utils/get-error";
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { orderTypeMongo } from "@/utils/order";
import Link from "next/link";

type orderTypeMongoPaidAtString = Omit<
  orderTypeMongo,
  "paidAt" | "deliveredAt"
> & { paidAt: string; deliveredAt: string };

type initialStateType = {
  loading: boolean;
  error: string;
  orders: orderTypeMongoPaidAtString[];
};

const initialState: initialStateType = {
  loading: false,
  error: "",
  orders: [],
};

function reducer(state, action): initialStateType {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, errors: "" };
    case "FETCH_ERROR":
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
}

export default function OrderHistory() {
  const [{ loading, error, orders }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function fetchOrders() {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/orders/history");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: getError(err) });
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl">Order History</h1>
      {loading ? (
        <div>
          <CircularProgress
            size={100}
            sx={{
              color: "red",
              position: "absolute",
              top: "30%",
              left: "50%",
            }}
          />
          ;
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="px-5 text-left">DATE</th>
                <th className="px-5 text-left">TOTAL</th>
                <th className="px-5 text-left">PAID</th>
                <th className="px-5 text-left">DELIVERED</th>
                <th className="px-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="border-b" key={order._id}>
                  <td className="p-5">*****{order._id.substring(20, 24)}</td>
                  <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-5">{order.totalPrice}</td>
                  <td className="p-5">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "not Paid"}{" "}
                  </td>
                  <td className="p-5">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "not Delivered"}
                  </td>
                  <td className="p-5">
                    <Link href={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

OrderHistory.auth = true;
