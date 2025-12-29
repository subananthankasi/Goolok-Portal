import { createSlice } from "@reduxjs/toolkit";
import {
  contactPersonDeleteThunk,
  contactPersonGetThunk,
  contactPersonPostThunk,
  contactPersonTalukDeleteThunk,
  contactPersonTalukGetThunk,
  contactPersonTalukPostThunk,
  contactPersonTalukUpdateThunk,
  contactPersonUpdateThunk,
} from "../../Actions/MasterPage/ContactPersonTalukThunk";

const contactTalukSlice = createSlice({
  name: "contactTalukSlice",
  initialState: {
    post: { data: [], loading: false, error: null },
    get: { data: [], loading: false, error: null },
    delete: { data: [], loading: false, error: null },
    update: { data: [], loading: false, error: null },
  },
  extraReducers: (builder) => {
    // POST reducers
    builder.addCase(contactPersonTalukPostThunk.pending, (state) => {
      state.post.loading = true;
    });
    builder.addCase(contactPersonTalukPostThunk.fulfilled, (state, action) => {
      state.post.data = action.payload;
      state.post.loading = false;
    });
    builder.addCase(contactPersonTalukPostThunk.rejected, (state, action) => {
      state.post.error = action.payload;
      state.post.loading = false;
    });

    // GET reducers
    builder.addCase(contactPersonTalukGetThunk.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(contactPersonTalukGetThunk.fulfilled, (state, action) => {
      state.get.data = action.payload;
      state.get.loading = false;
    });
    builder.addCase(contactPersonTalukGetThunk.rejected, (state, action) => {
      state.get.error = action.payload;
      state.get.loading = false;
    });

    // DELETE reducers
    builder.addCase(contactPersonTalukDeleteThunk.pending, (state) => {
      state.delete.loading = true;
    });
    builder.addCase(contactPersonTalukDeleteThunk.fulfilled, (state, action) => {
      state.delete.data = action.payload;
      state.delete.loading = false;
    });
    builder.addCase(contactPersonTalukDeleteThunk.rejected, (state, action) => {
      state.delete.error = action.payload;
      state.delete.loading = false;
    });

    // UPDATE reducers
    builder.addCase(contactPersonTalukUpdateThunk.pending, (state) => {
      state.update.loading = true;
    });
    builder.addCase(contactPersonTalukUpdateThunk.fulfilled, (state, action) => {
      state.update.data = action.payload;
      state.update.loading = false;
    });
    builder.addCase(contactPersonTalukUpdateThunk.rejected, (state, action) => {
      state.update.error = action.payload;
      state.update.loading = false;
    });
  },
});

export const contactTalukReducer = contactTalukSlice.reducer;
