import axios from "../helpers/axios";

const login = (email, password) => {
  return axios
    .post("/signin", {
      email,
      password,
    })
    .then((response) => {
      // console.log(response)
      if (response.data.token) {
        window.localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  return axios.post("/signout").then((response) => {
    // window.localStorage.removeItem("user");
    localStorage.clear();
    return response.data;
  });
};

const signup = (user) => {
  // console.log(user)
  return axios.post("/signup", user).then((response) => {
    return response.data;
  });
};
const authService = {
  login,
  logout,
  signup,
};
export default authService;
