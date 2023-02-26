import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ProductTypeMongo } from "@/utils/data";
import { toastFunc } from "@/functions/toast";

export type CartType = ProductTypeMongo & {
  quantity: number;
};

const cartItems: CartType[] = [];
const initialState = {
  cartItems,
  ShippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: "",
};
export type ShippingAddressType = typeof initialState.ShippingAddress;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem: async ({ cartItems }, { payload }: { payload: CartType }) => {
    //   // find if item is already in the cart list
    //   const productIndex = cartItems.findIndex((item) => item.id == payload.id);

    //   // if item is not in the cart list then push the product in cart
    //   if (productIndex == -1) {
    //     state.push(payload);
    //   }
    //   // else update the qunatity
    //   else cartItems[productIndex].quantity += payload.quantity;
    // },
    decItem: ({ cartItems }, { payload: productId }: { payload: string }) => {
      const cartProductIndex = cartItems.findIndex(
        (item) => item._id == productId
      );
      if (cartProductIndex != -1) {
        cartItems[cartProductIndex].quantity -= 1;
        if (cartItems[cartProductIndex].quantity == 0) {
          cartItems.splice(cartProductIndex, 1);
          toastFunc.success("Product completed removed");
        }
      } else {
        toastFunc.error("Product not found in cart");
      }
    },
    incItem: (
      { cartItems },
      { payload: product }: { payload: ProductTypeMongo }
    ) => {
      const cartProduct = cartItems.find((item) => item._id == product._id);
      if (cartProduct) {
        if (cartProduct.quantity < product.countInStock) {
          cartProduct.quantity += 1;
          // toast.success("product added to cart successfully!");
          toastFunc.success("product quantity increased by 1!");
        } else {
          toastFunc.error("Product out of stock!");
          // toast.error("product out of stock");
          // set the cart product quantity to max product in stock
          // this is to ensure that cart does not contain items than the max available items
          cartProduct.quantity = product.countInStock;
        }
      } else {
        cartItems.push({ ...product, quantity: 1 });
        toastFunc.success("product added to cart successfully");
      }
    },
    removeItem: (
      { cartItems },
      { payload: productId }: { payload: string }
    ) => {
      // find product in cart
      const cartItemIndex = cartItems.findIndex(
        (item) => item._id == productId
      );
      if (cartItemIndex != -1) {
        // then remove the product from cart
        cartItems.splice(cartItemIndex, 1);
      } else {
        toastFunc.error("Product not found in cart");
      }
    },
    deleteCart: (state) => {
      console.log("deleting cart");
      return { ...state, cartItems: [] };
    },
    setShippingAddress: (
      state,
      { payload }: { payload: ShippingAddressType }
    ) => {
      state.ShippingAddress = payload;
    },
    setPaymentMethod: (state, { payload }: { payload: string }) => {
      state.paymentMethod = payload;
    },
    resetCart: (state) => {
      return initialState;
    },
  },
});

export const {
  // addItem,
  incItem,
  decItem,
  removeItem,
  resetCart,
  setShippingAddress,
  setPaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCartItemsLength = (cart: CartType[]) =>
  cart.reduce((a, b) => a + b.quantity, 0);

export async function incItemAsync(
  productId: string,
  dispatch: ReturnType<typeof useDispatch>
) {
  let product = null;
  try {
    product = await (
      await fetch(`/api/products/findone?_id=${productId}`)
    ).json();
    if (!product) throw new Error("Product not found");
  } catch (err) {
    toastFunc.error(err.message);
  }

  console.log(product);

  dispatch(incItem(product));
}
