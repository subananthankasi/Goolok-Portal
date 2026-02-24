import { createSlice } from "@reduxjs/toolkit";
import { iFeatureDeleteThunk, iFeatureGetThunk, iFeaturePostThunk, iFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/InteriorFeatureThunk";
import { eFeatureDeleteThunk, eFeatureGetThunk, eFeaturePostThunk, eFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/ExteriorFeatureThunk";
import { CWDescAndFeatureGetThunk, CWDescAndFeaturePostThunk } from "../../../Actions/Enquiry/ContentWritingThunk/CWDescriptionFeatureThunk";
import { localitiesDeleteThunk, localitiesGetThunk, localitiesPostThunk, localitiesUpdateThunk } from "../../../Actions/Enquiry/ContentWritingThunk/LocalitiesThunk";
import { nearByDeleteThunk, nearByGetThunk, nearByPostThunk, nearByUpdateThunk } from "../../../Actions/Enquiry/ContentWritingThunk/NearByDevelopmentThunk";

const nearBySlice = createSlice({
    name: 'nearBySlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(nearByPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(nearByPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(nearByPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(nearByGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(nearByGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(nearByGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(nearByDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(nearByDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(nearByDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(nearByUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(nearByUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(nearByUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const nearByReducer = nearBySlice.reducer;
