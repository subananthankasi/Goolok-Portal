import { createSlice } from "@reduxjs/toolkit";
import { gFeatureDeleteThunk, gFeatureGetThunk, gFeaturePostThunk, gFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/GeneralFeatureThunk";

const generalFeatureSlice = createSlice({
    name: 'generalFeatureSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(gFeaturePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(gFeaturePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(gFeaturePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(gFeatureGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(gFeatureGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(gFeatureGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(gFeatureDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(gFeatureDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(gFeatureDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(gFeatureUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(gFeatureUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(gFeatureUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const generalFeatureReducer = generalFeatureSlice.reducer;
