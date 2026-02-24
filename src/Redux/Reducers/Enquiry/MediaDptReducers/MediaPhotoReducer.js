import { createSlice } from "@reduxjs/toolkit";
import { mediaDeletePhotoThunk, mediaGetPhotoThunk, mediaPostPhotoThunk, mediaUpdatePhotoThunk } from "../../../Actions/Enquiry/MediaDptEnq/MediaDptPhotoThunk";


const mediaDptPhoto = createSlice({
    name: 'mediaDptPhoto',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(mediaPostPhotoThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(mediaPostPhotoThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(mediaPostPhotoThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(mediaGetPhotoThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(mediaGetPhotoThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(mediaGetPhotoThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(mediaDeletePhotoThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(mediaDeletePhotoThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(mediaDeletePhotoThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(mediaUpdatePhotoThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(mediaUpdatePhotoThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(mediaUpdatePhotoThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const mediaDptPhotoReducer = mediaDptPhoto.reducer;
