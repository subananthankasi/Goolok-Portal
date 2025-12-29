import { createSlice } from "@reduxjs/toolkit";
import { closedPropertyThunk } from "../../Actions/Enquiry/ClosedPropertyThunk";

const closedPropertySlice = createSlice({
  name: "closedPropertySlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(closedPropertyThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(closedPropertyThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(closedPropertyThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const closedPropertyReducer = closedPropertySlice.reducer;
