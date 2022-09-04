import axios from "../helpers/axios";

const getCartItems = () => {
  // console.log(payload);
  // const {cid,type} = payload;
  return axios.post(`user/cart/getCartItems`).then((response) => {
    return response.data;
  });
};

const addToCart = (payload) => {
  // console.log(payload);
  // const {cid,type} = payload;
  return axios.post(`user/cart/add-to-cart`, payload).then((response) => {
    return response.data;
  });
};
const removeCartItems = (payload) => {
  // console.log(payload);
  // const {cid,type} = payload;
  return axios.post(`user/cart/removeCartItem`, payload).then((response) => {
    return response.data;
  });
};

const cartService = {
  getCartItems,
  addToCart,
  removeCartItems,
};

export default cartService;
