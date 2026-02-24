import { createSlice } from "@reduxjs/toolkit";
import { mediaVideoDeleteThunk, mediaVideoGetThunk, mediaVideoPostThunk, mediaVideoUpdateThunk } from "../../../Actions/Enquiry/MediaDptEnq/MediaDptEnqVideoThunk";


const mediaDptVideo = createSlice({
    name: 'mediaDptVideo',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(mediaVideoPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(mediaVideoPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(mediaVideoPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(mediaVideoGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(mediaVideoGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(mediaVideoGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(mediaVideoDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(mediaVideoDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(mediaVideoDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(mediaVideoUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(mediaVideoUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(mediaVideoUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const mediaDptPostReducer = mediaDptVideo.reducer;
