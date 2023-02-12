import { createSlice } from "@reduxjs/toolkit";
import type { Data } from "@/utils/data";
import data from "@/utils/data";

export type CartType = Data & {
  quantity: number;
};

const cartItems: CartType[] = [];
const initialState = { cartItems };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: ({ cartItems }, { payload }: { payload: CartType }) => {
      // find if item is in the list
      const productIndex = cartItems.findIndex((item) => item.id == payload.id);

      // if item is not in the list then push the product in cart
      if (productIndex == -1) {
        state.push(payload);
      }
      // else update the qunatity
      else cartItems[productIndex].quantity += payload.quantity;
    },
    decItem: ({ cartItems }, { payload: productId }: { payload: string }) => {
      const cartProductIndex = cartItems.findIndex(
        (item) => item.id == productId
      );
      if (cartProductIndex != -1) {
        cartItems[cartProductIndex].quantity -= 1;
        if (cartItems[cartProductIndex].quantity == 0) {
          cartItems.splice(cartProductIndex, 1);
        }
      } else {
        console.log("item in cart not found");
      }
      const product = data.find((item) => item.id == productId);
      if (product) {
        product.countInStock += 1;
      }
    },
    incItem: ({ cartItems }, { payload: productId }: { payload: string }) => {
      // console.log("[incItem]", state.cartItems);
      const product = data.find((item) => item.id == productId);
      if (product) {
        if (product.countInStock > 0) {
          product.countInStock -= 1;

          const cartProduct = cartItems.find((item) => item.id == productId);
          if (cartProduct) {
            cartProduct.quantity += 1;
          } else {
            cartItems.push({ ...product, quantity: 1 });
          }
        } else {
          alert("Product out of stock");
        }
      }
    },
    removeItem: (
      { cartItems },
      { payload: productId }: { payload: string }
    ) => {
      // find product in cart
      const cartItemIndex = cartItems.findIndex((item) => item.id == productId);
      if (cartItemIndex != -1) {
        // if found then find the product in database
        const product = data.find((item) => item.id == item.id);
        if (product) {
          // if found then increase the stock
          product.countInStock += cartItems[cartItemIndex].quantity;
        }
        // then remove the product from cart
        cartItems.splice(cartItemIndex, 1);
      } else {
        console.log("product not found in cart");
      }
    },
  },
});

export const { addItem, incItem, decItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

export const getCartItemsLength = (cart: CartType[]) =>
  cart.reduce((a, b) => a + b.quantity, 0);
