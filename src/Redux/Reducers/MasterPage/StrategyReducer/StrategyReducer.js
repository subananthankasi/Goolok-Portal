import { createSlice } from "@reduxjs/toolkit";
import {  strategyDeleteThunk, strategyGetThunk, strategyPostThunk, strategyUpdateThunk } from "../../../Actions/MasterPage/StrategyThunk/StrategyThunk";

const StrategySlice = createSlice({
    name: 'StrategySlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(strategyPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(strategyPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(strategyPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(strategyGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(strategyGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(strategyGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(strategyDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(strategyDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(strategyDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(strategyUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(strategyUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(strategyUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const StrategyReducer = StrategySlice.reducer;
