import { createSlice } from "@reduxjs/toolkit";
import {
  contactPersonDeleteThunk,
  contactPersonGetThunk,
  contactPersonPostThunk,
  contactPersonUpdateThunk,
} from "../../Actions/MasterPage/ContactPersonTalukThunk";
import {
  contactPersonSroDeleteThunk,
  contactPersonSroGetThunk,
  contactPersonSroPostThunk,
  contactPersonSroUpdateThunk,
} from "../../Actions/MasterPage/ContactPersonSroThunk";

const contactSroSlice = createSlice({
  name: "contactSroSlice",
  initialState: {
    post: { data: [], loading: false, error: null },
    get: { data: [], loading: false, error: null },
    delete: { data: [], loading: false, error: null },
    update: { data: [], loading: false, error: null },
  },
  extraReducers: (builder) => {
    // POST reducers
    builder.addCase(contactPersonSroPostThunk.pending, (state) => {
      state.post.loading = true;
    });
    builder.addCase(contactPersonSroPostThunk.fulfilled, (state, action) => {
      state.post.data = action.payload;
      state.post.loading = false;
    });
    builder.addCase(contactPersonSroPostThunk.rejected, (state, action) => {
      state.post.error = action.payload;
      state.post.loading = false;
    });

    // GET reducers
    builder.addCase(contactPersonSroGetThunk.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(contactPersonSroGetThunk.fulfilled, (state, action) => {
      state.get.data = action.payload;
      state.get.loading = false;
    });
    builder.addCase(contactPersonSroGetThunk.rejected, (state, action) => {
      state.get.error = action.payload;
      state.get.loading = false;
    });

    // DELETE reducers
    builder.addCase(contactPersonSroDeleteThunk.pending, (state) => {
      state.delete.loading = true;
    });
    builder.addCase(contactPersonSroDeleteThunk.fulfilled, (state, action) => {
      state.delete.data = action.payload;
      state.delete.loading = false;
    });
    builder.addCase(contactPersonSroDeleteThunk.rejected, (state, action) => {
      state.delete.error = action.payload;
      state.delete.loading = false;
    });

    // UPDATE reducers
    builder.addCase(contactPersonSroUpdateThunk.pending, (state) => {
      state.update.loading = true;
    });
    builder.addCase(contactPersonSroUpdateThunk.fulfilled, (state, action) => {
      state.update.data = action.payload;
      state.update.loading = false;
    });
    builder.addCase(contactPersonSroUpdateThunk.rejected, (state, action) => {
      state.update.error = action.payload;
      state.update.loading = false;
    });
  },
});

export const contactPersonSroReducer = contactSroSlice.reducer;
