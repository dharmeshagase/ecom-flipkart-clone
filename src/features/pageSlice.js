import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pageService from "../services/page.service";

const initialState = {
    page : null,
    status: 'idle',
    error: null
}

export const getProductPage = createAsyncThunk('page/:category/:type',
async(payload)=>{
    const response = await pageService.getProductPage(payload);
    // console.log(response);
    return response;
})

export const pageSlice = createSlice({
    name: "page",
    initialState,
    extraReducers: {
        [getProductPage.pending]: (state) => {
            state.status = 'loading';
        },
        [getProductPage.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            state.page = action.payload.page;
            // state.productByPrice = action.payload.productByPrice;
            console.log(action)
        },
        [getProductPage.rejected]: (state, action) => {
            state.status = 'failed';
            state.page = null;
            state.error = action.payload;
        }
    }
})
export default pageSlice.reducer;