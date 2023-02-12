import { createSlice } from "@reduxjs/toolkit";
import type { Data } from "@/utils/data";

export type CartType = Data & {
  quantity: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartType[],
  reducers: {
    addItem: (state, { payload }: { payload: CartType }) => {
      // find if item is in the list
      const productIndex = state.findIndex((item) => item.id == payload.id);
      console.log("product Index : ", productIndex);

      // if item is not in the list then push the product in cart
      if (productIndex == -1) {
        state.push(payload);
      }
      // else update the qunatity
      else state[productIndex].quantity += payload.quantity;
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;

export const getCartItemsLength = (cart: CartType[]) =>
  cart.reduce((a, b) => a + b.quantity, 0);
