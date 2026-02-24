import { createSlice } from "@reduxjs/toolkit";
import { pricingConfirmThunk } from "../../Actions/Enquiry/pricingConfirmThunk";

const confirmReducer = createSlice({
    name: 'confirm',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(pricingConfirmThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(pricingConfirmThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(pricingConfirmThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const pricingConfirmReducer = confirmReducer.reducer
