import { createSlice } from "@reduxjs/toolkit";
import { couponsDeleteThunk, couponsGetThunk, couponsPostThunk, couponsUpdateThunk } from "../../../Actions/MasterPage/CouponsThunk/CouponsThunk";

const couponSlice = createSlice({
    name: 'couponSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(couponsPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(couponsPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(couponsPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(couponsGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(couponsGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(couponsGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(couponsDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(couponsDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(couponsDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(couponsUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(couponsUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(couponsUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const couponsReducer = couponSlice.reducer;
