import { createSlice } from "@reduxjs/toolkit";
import { iFeatureDeleteThunk, iFeatureGetThunk, iFeaturePostThunk, iFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/InteriorFeatureThunk";
import { eFeatureDeleteThunk, eFeatureGetThunk, eFeaturePostThunk, eFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/ExteriorFeatureThunk";

const exteriorFeatureSlice = createSlice({
    name: 'exteriorFeatureSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(eFeaturePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(eFeaturePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(eFeaturePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(eFeatureGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(eFeatureGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(eFeatureGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(eFeatureDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(eFeatureDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(eFeatureDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(eFeatureUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(eFeatureUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(eFeatureUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const exteriorFeatureReducer = exteriorFeatureSlice.reducer;
