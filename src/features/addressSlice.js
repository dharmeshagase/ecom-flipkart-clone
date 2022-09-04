import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import addressService from "../services/address.service"

const initialState = {
    address : [],
    status : 'idle',
    error : null
}

export const addAddress = createAsyncThunk('address/create',
async(payload)=>{
    const response = await addressService.addAddress(payload);
    return response;
})

export const getAddress = createAsyncThunk('address/get',
async()=>{
    const response = await addressService.getAddress();
    // console.log(response);
    return response;
})

const addressSlice = createSlice({
    name : 'address',
    initialState : initialState,
    extraReducers : {
        [addAddress.pending]: (state)=>{
            state.status = "loading"
        },
        [addAddress.fulfilled] : (state,action)=>{
            state.status = "succeeded"
            console.log(action);
        },
        [addAddress.rejected] : (state,action)=>{
            state.status  = "failed";
            state.error = action.payload.error;
        },
        [getAddress.pending]: (state)=>{
            state.status = "loading"
        },
        [getAddress.fulfilled] : (state,action)=>{
            state.status = "succeeded";
            state.address = action.payload.address;
            console.log(action);
        },
        [getAddress.rejected] : (state,action)=>{
            state.status  = "failed";
            state.error = action.payload.error;
        },
    }
})

export default addressSlice.reducer;