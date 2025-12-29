import { createSlice } from "@reduxjs/toolkit";
import { iFeatureDeleteThunk, iFeatureGetThunk, iFeaturePostThunk, iFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/InteriorFeatureThunk";
import { suitableDeleteThunk, suitableGetThunk, suitablePostThunk, suitableUpdateThunk } from "../../../Actions/MasterPage/TagsThunk/SuitableThunk";

const suitableSlice = createSlice({
    name: 'suitableSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(suitablePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(suitablePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(suitablePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(suitableGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(suitableGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(suitableGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(suitableDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(suitableDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(suitableDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(suitableUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(suitableUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(suitableUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const suitableReducer = suitableSlice.reducer;
