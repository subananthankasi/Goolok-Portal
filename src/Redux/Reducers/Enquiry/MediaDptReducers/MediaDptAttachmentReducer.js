import { mediaAttachmentDeleteThunk, mediaAttachmentGetThunk, mediaAttachmentPostThunk, mediaAttachmentUpdateThunk } from "../../../Actions/Enquiry/MediaDptEnq/MediaDptAttachmentThunk";
import { createSlice } from "@reduxjs/toolkit";


const mediaDptAttachment = createSlice({
    name: 'mediaDptAttachment',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(mediaAttachmentPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(mediaAttachmentPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(mediaAttachmentPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(mediaAttachmentGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(mediaAttachmentGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(mediaAttachmentGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(mediaAttachmentDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(mediaAttachmentDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(mediaAttachmentDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(mediaAttachmentUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(mediaAttachmentUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(mediaAttachmentUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const mediaDptAttachmentReducer = mediaDptAttachment.reducer;
