import { createSlice } from "@reduxjs/toolkit";
import { nearByDeleteThunk, nearByGetThunk, nearByPostThunk, nearByUpdateThunk } from "../../../Actions/Enquiry/ContentWritingThunk/NearByDevelopmentThunk";
import { tagsDeleteThunk, tagsGetThunk, tagsPostThunk, tagsUpdateThunk } from "../../../Actions/Enquiry/ContentWritingThunk/TagsThunk";

const tagSlice = createSlice({
    name: 'tagSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(tagsPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(tagsPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(tagsPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(tagsGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(tagsGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(tagsGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(tagsDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(tagsDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(tagsDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(tagsUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(tagsUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(tagsUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const tagReducer = tagSlice.reducer;
