import { createSlice } from "@reduxjs/toolkit";
import { paymentScheduleEnqDeleteThunk, paymentScheduleEnqPostThunk, paymentScheduleEnqUpdateThunk, paymentSchedulEnqGetThunk } from "../../Actions/Enquiry/PaymentScheduleEnqThunk";

const paymentScheduleEnqSlice = createSlice({
    name: 'paymentScheduleEnq',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(paymentScheduleEnqPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(paymentScheduleEnqPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(paymentScheduleEnqPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(paymentSchedulEnqGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(paymentSchedulEnqGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(paymentSchedulEnqGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(paymentScheduleEnqDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(paymentScheduleEnqDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(paymentScheduleEnqDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(paymentScheduleEnqUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(paymentScheduleEnqUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(paymentScheduleEnqUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const paymentScheduleEnqReducer = paymentScheduleEnqSlice.reducer;
