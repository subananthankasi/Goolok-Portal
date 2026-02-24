import { createSlice } from "@reduxjs/toolkit";
import {
  talukDetailsDeleteThunk,
  talukDetailsGetThunk,
  talukDetailsPostThunk,
  talukDetailsUpdateThunk,
} from "../../Actions/MasterPage/TalukDetailsThunk";

const talukDetailsSlice = createSlice({
  name: "talukDetailsSlice",
  initialState: {
    post: { data: [], loading: false, error: null },
    get: { data: [], loading: false, error: null },
    delete: { data: [], loading: false, error: null },
    update: { data: [], loading: false, error: null },
  },
  extraReducers: (builder) => {
    // POST reducers
    builder.addCase(talukDetailsPostThunk.pending, (state) => {
      state.post.loading = true;
    });
    builder.addCase(talukDetailsPostThunk.fulfilled, (state, action) => {
      state.post.data = action.payload;
      state.post.loading = false;
    });
    builder.addCase(talukDetailsPostThunk.rejected, (state, action) => {
      state.post.error = action.payload;
      state.post.loading = false;
    });

    // GET reducers
    builder.addCase(talukDetailsGetThunk.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(talukDetailsGetThunk.fulfilled, (state, action) => {
      state.get.data = action.payload;
      state.get.loading = false;
    });
    builder.addCase(talukDetailsGetThunk.rejected, (state, action) => {
      state.get.error = action.payload;
      state.get.loading = false;
    });

    // DELETE reducers
    builder.addCase(talukDetailsDeleteThunk.pending, (state) => {
      state.delete.loading = true;
    });
    builder.addCase(talukDetailsDeleteThunk.fulfilled, (state, action) => {
      state.delete.data = action.payload;
      state.delete.loading = false;
    });
    builder.addCase(talukDetailsDeleteThunk.rejected, (state, action) => {
      state.delete.error = action.payload;
      state.delete.loading = false;
    });

    // UPDATE reducers
    builder.addCase(talukDetailsUpdateThunk.pending, (state) => {
      state.update.loading = true;
    });
    builder.addCase(talukDetailsUpdateThunk.fulfilled, (state, action) => {
      state.update.data = action.payload;
      state.update.loading = false;
    });
    builder.addCase(talukDetailsUpdateThunk.rejected, (state, action) => {
      state.update.error = action.payload;
      state.update.loading = false;
    });
  },
});

export const talukDetailsReducer = talukDetailsSlice.reducer;
