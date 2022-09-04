import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const initialState = {
  products: [],
  productDetails: null,
  priceRange: {},
  productByPrice: {},
  status: "idle",
  error: null,
};

export const getProductBySlug = createAsyncThunk(
  "product/:slug",
  async (slug) => {
    const response = await productService.getProductBySlug(slug);
    return response;
  }
);

export const getProductDetailsById = createAsyncThunk(
  "product/getProductDetailsbyId",
  async (payload) => {
    const response = await productService.getProductDetailsById(payload);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [getProductBySlug.pending]: (state) => {
      state.status = "loading";
    },
    [getProductBySlug.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.products = action.payload.products;
      if (action.payload.productByPrice) {
        state.priceRange = action.payload.priceRange;
        state.productByPrice = action.payload.productByPrice;
      }
      console.log(action.payload);
    },
    [getProductBySlug.rejected]: (state, action) => {
      state.status = "failed";
      state.products = [];
      state.error = action.payload;
    },
    [getProductDetailsById.pending]: (state) => {
      state.status = "loading";
    },
    [getProductDetailsById.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.productDetails = action.payload.productDetails;
      // state.productByPrice = action.payload.productByPrice;
      console.log(action);
    },
    [getProductDetailsById.rejected]: (state, action) => {
      state.status = "failed";
      state.productDetails = null;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
