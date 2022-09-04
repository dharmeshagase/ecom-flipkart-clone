import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { resetCart } from "./cartSlice";
// import { setMessage } from "./messageSlice";

const user = window.localStorage.getItem("user");
// ?JSON.parse(window.localStorage.getItem('user')):null;
// console.log(user);

//Async Thunk Functions for Login,Logout and Signup
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      //The login service is written in the auth.service of the services folder
      const data = await authService.login(email, password);
      return data;
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || error.message;
      // console.log(message)
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (undefined, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.logout();
      // thunkAPI.dispatch(setMessage(response.message));
      console.log(response);
      dispatch(resetCart());
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.signup(userData);
      // thunkAPI.dispatch(setMessage(response.message));
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
// console.log(user)
const initialStateValue = user
  ? {
      isLoggedIn: true,
      isLoading: false,
      user: JSON.parse(user).user,
      token: JSON.parse(user).token,
    }
  : { isLoggedIn: false, isLoading: false, user: null, token: null };
export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateValue,
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
      console.log(action);
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      const userData = action.payload.user;
      const token = action.payload.token;
      // console.log(action.payload);
      // console.log(userData);
      // console.log(token);
      state.user = userData;
      state.token = token;
      state.isLoading = false;
      console.log(action);
      // console.log(state);
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.user = null;
      console.log(action);
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      console.log("logging out");
      // console.log(state);
    },
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      const userData = action.payload.user;
      const token = action.payload.token;
      state.user = userData;
      state.token = token;
      state.isLoading = false;
      console.log(action);
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      console.log(action);
    },
  },
});

//export reducers
export default authSlice.reducer;

//export the action creators
// export const {loginSuccess} = authSlice.actions;

// export const login = ({ email, password }) => async dispatch => {
//     try {
//     //   const res = await api.post('/api/auth/login/', { email, password })
//     const res = await axios.post(api+'/admin/signin',{email,password})
//       dispatch(loginSuccess({email}));
//     } catch (e) {
//       return console.error(e.message);
//     }
//   }
