import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart.service";
import { useDispatch } from "react-redux";

const initialState = {
  cartItems: {},
  status: "idle",
  error: null,
  isUpdating: false,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await cartService.getCartItems();
  // console.log(response);
  return response;
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (undefined, { getState, dispatch }) => {
    const auth = getState().auth;
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    if (auth.isLoggedIn) {
      localStorage.removeItem("cart");
      if (cartItems) {
        // console.log(cartItems);
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await cartService.addToCart(payload);
          // console.log(res);
        }
      }
      // console.log('sjkdfhsjkdfhdf');
      return (await dispatch(getCartItems())).payload;
      // console.log(response);
      // return cartItems;
      // return dispatch(getCartItems());
    } else {
      if (cartItems) {
        console.log(cartItems);
        return { cartItems };
      }
    }

    // const response = await cartService.getCartItems();
    // console.log(response);
    // return response;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { getState, dispatch }) => {
    const { cartItems } = getState().cart;
    const auth = getState().auth;
    // console.log(cartItems);
    // console.log(product);
    let newQty = 1;
    if (product.newQty) {
      newQty = product.newQty;
      delete product.newQty;
    }

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty) + newQty
      : 1;
    const productObj = { ...product, qty };
    // console.log(productObj);
    const newcartItems = { ...cartItems, [productObj._id]: productObj };
    // console.log(newcartItems);
    if (auth.isLoggedIn) {
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };
      console.log(payload);
      const response = await cartService.addToCart(payload);
      console.log(response);
      const getItems = await dispatch(getCartItems());
      // console.log(getItems.payload);
      return getItems.payload;
      // return await dispatch(getCartItems());
      // return response;
    } else {
      localStorage.setItem("cart", JSON.stringify(newcartItems));
      // console.log(productObj);
      return { cartItems: newcartItems };
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (payload, { dispatch, getState }) => {
    // const {productId} = payload
    if (getState().auth.isLoggedIn) {
      const response = await cartService.removeCartItems(payload);
      // console.log(response);
      return (await dispatch(getCartItems())).payload;
    } else {
      const key = payload.productId;
      console.log(key);
      const cartKeys = Object.keys(getState().cart.cartItems).filter(
        (product) => {
          // console.log(product);
          return product !== key;
        }
      );
      var updatedCartItem = {};
      cartKeys.map((updatedkey) => {
        updatedCartItem[updatedkey] = getState().cart.cartItems[updatedkey];
      });
      console.log(cartKeys);
      console.log(updatedCartItem);
      localStorage.setItem("cart", JSON.stringify(updatedCartItem));
      return (await dispatch(updateCart())).payload;
      // return updatedCartItem;

      // const updatedCartItem = getState().cart.cartItems;
      // updatedCartItem = updatedCartItem.toObject();
      // console.log(updatedCartItem.cartItems);
      // delete updatedCartItem[key];
      // console.log(payload);
      // console.log(getState().cart);
      // console.log("dsjkhfksjfhkjdf", updatedCartItem);
    }
  }
);
// export const updateCart = createAsyncThunk('cart/updateCart',
// async(()=>{
//     const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
//     if(cartItems){
//         return cartItems;
//     }
//     else

// })
// );
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // updateCart: (state) =>{
    //     state.cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    //     state.status = 'succeeded';
    //     // console.log(state.cartItems)
    // },
    resetCart: (state) => {
      state.cartItems = initialState.cartItems;
      state.isUpdating = initialState.isUpdating;
      state.status = initialState.status;
      state.error = initialState.error;
      // console.log(state);
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.status = "loading";
    },
    [addToCart.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.cartItems = action.payload.cartItems;
      // state.productByPrice = action.payload.productByPrice;
      console.log(action);
    },
    [addToCart.rejected]: (state, action) => {
      state.status = "failed";
      // state.page = null;
      state.error = action.payload;
      console.log(action);
    },
    [getCartItems.pending]: (state) => {
      state.status = "loading";
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.cartItems = action.payload.cartItems;
      // state.productByPrice = action.payload.productByPrice;
      console.log(action);
    },
    [getCartItems.rejected]: (state, action) => {
      state.status = "failed";
      // state.page = null;
      state.error = action.payload;
      console.log(action);
    },
    [updateCart.pending]: (state) => {
      state.status = "loading";
      state.isUpdating = true;
    },
    [updateCart.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.isUpdating = false;
      state.cartItems = action.payload.cartItems;
      // state.productByPrice = action.payload.productByPrice;
      console.log(action);
    },
    [updateCart.rejected]: (state, action) => {
      state.status = "failed";
      state.isUpdating = false;
      // state.page = null;
      state.error = action.payload;
      console.log(action);
    },
    [removeCartItem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.cartItems = action.payload.cartItems;
      console.log(action);
    },
    [removeCartItem.pending]: (state) => {
      state.status = "loading";
    },
    [removeCartItem.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
  },
});
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
