import axios from "../helpers/axios";

const getOrder = () => {
  return axios.get(`getOrder`).then((response) => {
    if (response.status == 200) {
      // console.log(response.data);
      return response.data;
    } else return response.error;
  });
};

const addOrder = (payload) => {
  console.log(payload);
  return axios.post(`addOrder`, payload).then((response) => {
    if (response.status == 200) return response.data;
    else return response.error;
  });
};

const getOrderDetails = (payload) => {
  return axios.post(`/getOrderDetails`, payload).then((response) => {
    if (response.status == 200) {
      // console.log(response.data);
      return response.data;
    } else return response.error;
  });
};
const orderService = {
  getOrder,
  addOrder,
  getOrderDetails,
};
export default orderService;
