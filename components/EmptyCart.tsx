import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <div>
      Cart is Empty{"   "}
      <Link href="/" className="primary-button">
        Go shopping
      </Link>
    </div>
  );
}
