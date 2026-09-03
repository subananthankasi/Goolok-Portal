import { createSlice } from "@reduxjs/toolkit";
import { enquiryCountsThunk } from "../Actions/EnquiryCountsThunk";

const enquiryCountsSlice = createSlice({
    name: 'enquiryCountsSlice',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(enquiryCountsThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(enquiryCountsThunk.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(enquiryCountsThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});
export const enquiryCountsReducer = enquiryCountsSlice.reducer;