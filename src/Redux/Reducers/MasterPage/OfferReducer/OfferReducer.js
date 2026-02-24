import { createSlice } from "@reduxjs/toolkit";
import { offerDeleteThunk, offerGetThunk, offerPostThunk, offerUpdateThunk } from "../../../Actions/MasterPage/OfferThunk/OfferThunk";

const offerSlice = createSlice({
    name: 'offerSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(offerPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(offerPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(offerPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(offerGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(offerGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(offerGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(offerDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(offerDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(offerDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(offerUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(offerUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(offerUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const offerReducer = offerSlice.reducer;
