import { createSlice } from "@reduxjs/toolkit";
import { mediaDptConfirmThunk } from "../../../Actions/Enquiry/MediaDptEnq/MediaDptConfirmThunk";

const confirmReducer = createSlice({
    name: 'confirm',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(mediaDptConfirmThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(mediaDptConfirmThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(mediaDptConfirmThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const mediaConfirmReducer = confirmReducer.reducer
