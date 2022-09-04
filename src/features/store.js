import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import pageReducer from "./pageSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import addressReducer from "./addressSlice";
import orderReducer from "./orderSlice";
import thunk from "redux-thunk";

const store = configureStore(
  {
    reducer: {
      category: categoryReducer,
      product: productReducer,
      page: pageReducer,
      auth: authReducer,
      cart: cartReducer,
      address: addressReducer,
      order: orderReducer,
    },
  },
  applyMiddleware(thunk)
);
export default store;
