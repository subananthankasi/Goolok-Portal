import { createSlice } from "@reduxjs/toolkit";
import { bankDeleteThunk, bankGetThunk, bankPostThunk, bankUpdateThunk } from "../../../Actions/MasterPage/BankThunk/BankThunk";

const bankSlice = createSlice({
    name: 'bankSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(bankPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(bankPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(bankPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(bankGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(bankGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(bankGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(bankDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(bankDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(bankDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(bankUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(bankUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(bankUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const bankReducer = bankSlice.reducer;
