import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const initialState = {
    categories: [],
    status: 'idle',
    error: null
}

export const getAllCategory = createAsyncThunk('category/getall',
    async () => {
        // console.log("jhgjhgjhgjkgbkjhkjhk");
        const response = await categoryService.getAllCategory();
        // console.log(response);
        return response;
    })

export const categorySlice = createSlice({
    name: "category",
    initialState,    
    extraReducers: {
        [getAllCategory.pending]: (state) => {
            state.status = 'loading';
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            console.log(action);
            state.categories = action.payload.CategoryList;
        },
        [getAllCategory.rejected]: (state, action) => {
            state.status = 'failed';
            state.categories = [];
            state.error = action.payload;
        }
    }
})

export default categorySlice.reducer;