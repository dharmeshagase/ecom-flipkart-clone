import axios from "axios";
import { api } from "../apiConfig";
import { logout } from "../features/authSlice";

const user = JSON.parse(window.localStorage.getItem("user"));
// const user = useSelector(state=>state.authStore);
// console.log(user);

//InjectStore function used to call store variable from the index.js file
//Store cannot be directly imported in this file as it will create a circular dependency problem
let store;
export const injectStore = (_store) => {
  // console.log(_store);
  store = _store;
};
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: user ? `Bearer ${user.token}` : "",
  },
});

// Interceptor for the request api
axiosInstance.interceptors.request.use((req) => {
  // console.log(req);
  const auth = store.getState().auth;
  // console.log(auth);
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 500) {
      console.log("Into response interceptor");
      store.dispatch(logout()).then(() => {
        // window.location.reload();
      });
      console.log(status);
    }
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
