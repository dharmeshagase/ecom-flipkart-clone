import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";
import { resetCart } from "./cartSlice";

const initialState = {
  order: [],
  orderDetails: {},
  status: "idle",
  error: null,
  orderFetching: false,
  placedOrderId : null
};

export const addOrder = createAsyncThunk(
  "order/create",
  async (payload, { dispatch }) => {
    dispatch(resetCart());
    const response = await orderService.addOrder(payload);
    return response;
  }
);

export const getOrder = createAsyncThunk("order/get", async () => {
  const response = await orderService.getOrder();
  // console.log(response);
  return response;
});

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (payload) => {
    const response = await orderService.getOrderDetails(payload);
    // console.log(response);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  extraReducers: {
    [addOrder.pending]: (state) => {
      state.status = "loading";
    },
    [addOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.placedOrderId = action.payload.order._id;
      console.log(action);
    },
    [addOrder.rejected]: (state, action) => {
      state.status = "failed";
      console.log(action);
      state.placedOrderId = null;
      state.error = action.payload;
    },
    [getOrder.pending]: (state) => {
      state.status = "loading";
      state.orderFetching = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.order = action.payload.order;
      state.orderFetching = false;
      console.log(action);
    },
    [getOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.orderFetching = false;
      state.error = action.payload.error;
    },
    [getOrderDetails.pending]: (state) => {
      state.status = "loading";
      // state.orderFetching = true;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orderDetails = action.payload.order;
      state.orderFetching = false;
      console.log(action);
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.status = "failed";
      // state.orderFetching = false;
      state.error = action.payload.error;
    },
  },
});

export default orderSlice.reducer;
