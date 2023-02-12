import { addItem } from "@/store/reducer";
import type { Data } from "@/utils/data";
import data from "@/utils/data";
import { useDispatch } from "react-redux";

export function AddToCartHook(productId: string) {
  const dispatch = useDispatch();

  const product = data.find((item) => item.id == productId);

  if (product)
    return () => {
      if (product.countInStock > 0) {
        product.countInStock -= 1;
        dispatch(addItem({ ...product, quantity: 1 }));
      } else {
        alert("Product out of stock");
      }
    };
  else {
    return undefined;
  }
}
