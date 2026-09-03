import { createSlice } from "@reduxjs/toolkit";
import { PaymentModeDeleteThunk, PaymentModeGetThunk, PaymentModePostThunk, PaymentModeUpdateThunk } from "../../../Actions/MasterPage/PaymentModeThunk/PaymentModeThunk";

const paymentModeSlice = createSlice({
    name: 'paymentModeSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(PaymentModePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(PaymentModePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(PaymentModePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(PaymentModeGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(PaymentModeGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(PaymentModeGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(PaymentModeDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(PaymentModeDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(PaymentModeDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(PaymentModeUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(PaymentModeUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(PaymentModeUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const paymentModeReducer = paymentModeSlice.reducer;
