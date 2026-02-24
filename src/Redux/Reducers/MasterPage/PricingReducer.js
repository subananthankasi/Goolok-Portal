import { createSlice } from "@reduxjs/toolkit";
import {
    pricingDeleteThunk,
    pricingGetThunk,
    pricingPostThunk,
    pricingUpdateThunk
} from "../../Actions/MasterPage/PricingThunk";

const pricingSlice = createSlice({
    name: 'pricing',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(pricingPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(pricingPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(pricingPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(pricingGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(pricingGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(pricingGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(pricingDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(pricingDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(pricingDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(pricingUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(pricingUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(pricingUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const pricingReducer = pricingSlice.reducer;
