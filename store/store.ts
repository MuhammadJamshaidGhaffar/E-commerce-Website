import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartType } from "./reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
export const selectCart = (state): CartType[] => state.cart.cartItems;
