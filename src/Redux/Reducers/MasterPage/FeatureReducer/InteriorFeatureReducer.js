import { createSlice } from "@reduxjs/toolkit";
import { iFeatureDeleteThunk, iFeatureGetThunk, iFeaturePostThunk, iFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/InteriorFeatureThunk";

const interiorFeatureSlice = createSlice({
    name: 'interiorFeatureSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(iFeaturePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(iFeaturePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(iFeaturePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(iFeatureGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(iFeatureGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(iFeatureGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(iFeatureDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(iFeatureDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(iFeatureDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(iFeatureUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(iFeatureUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(iFeatureUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const interiorFeatureReducer = interiorFeatureSlice.reducer;
