import { useRouter } from "next/router";
import React from "react";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div className="text-center mt-20">
      <h1 className="text-xl">Acess Denied</h1>
      {message && <div className="mb-4 text-red-500">{message} </div>}
    </div>
  );
}
