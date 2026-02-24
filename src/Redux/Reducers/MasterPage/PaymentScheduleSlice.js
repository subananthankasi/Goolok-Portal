import { createSlice } from "@reduxjs/toolkit";
import {
  paymentScheduleDeleteThunk,
  paymentSchedulePostThunk,
  paymentScheduleUpdateThunk,
  paymentSchedulGetThunk,
} from "../../Actions/MasterPage/PaymentScheduleThunk";

const paymentScheduleSlice = createSlice({
  name: "paymentSchedule",
  initialState: {
    post: { data: [], loading: false, error: null },
    get: { data: [], loading: false, error: null },
    delete: { data: [], loading: false, error: null },
    update: { data: [], loading: false, error: null },
  },
  extraReducers: (builder) => {
    // POST reducers
    builder.addCase(paymentSchedulePostThunk.pending, (state) => {
      state.post.loading = true;
    });
    builder.addCase(paymentSchedulePostThunk.fulfilled, (state, action) => {
      state.post.data = action.payload;
      state.post.loading = false;
    });
    builder.addCase(paymentSchedulePostThunk.rejected, (state, action) => {
      state.post.error = action.payload;
      state.post.loading = false;
    });

    // GET reducers
    builder.addCase(paymentSchedulGetThunk.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(paymentSchedulGetThunk.fulfilled, (state, action) => {
      state.get.data = action.payload;
      state.get.loading = false;
    });
    builder.addCase(paymentSchedulGetThunk.rejected, (state, action) => {
      state.get.error = action.payload;
      state.get.loading = false;
    });

    // DELETE reducers
    builder.addCase(paymentScheduleDeleteThunk.pending, (state) => {
      state.delete.loading = true;
    });
    builder.addCase(paymentScheduleDeleteThunk.fulfilled, (state, action) => {
      state.delete.data = action.payload;
      state.delete.loading = false;
    });
    builder.addCase(paymentScheduleDeleteThunk.rejected, (state, action) => {
      state.delete.error = action.payload;
      state.delete.loading = false;
    });

    // UPDATE reducers
    builder.addCase(paymentScheduleUpdateThunk.pending, (state) => {
      state.update.loading = true;
    });
    builder.addCase(paymentScheduleUpdateThunk.fulfilled, (state, action) => {
      state.update.data = action.payload;
      state.update.loading = false;
    });
    builder.addCase(paymentScheduleUpdateThunk.rejected, (state, action) => {
      state.update.error = action.payload;
      state.update.loading = false;
    });
  },
});

export const paymentScheduleReducer = paymentScheduleSlice.reducer;
