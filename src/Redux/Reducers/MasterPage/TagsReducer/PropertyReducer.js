import { createSlice } from "@reduxjs/toolkit";
import { propertyDeleteThunk, propertyGetThunk, propertyPostThunk, propertyUpdateThunk } from "../../../Actions/MasterPage/TagsThunk/PropertyThunk";

const propertySlice = createSlice({
    name: 'propertySlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(propertyPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(propertyPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(propertyPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(propertyGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(propertyGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(propertyGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(propertyDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(propertyDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(propertyDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(propertyUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(propertyUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(propertyUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const propertyReducer = propertySlice.reducer;
