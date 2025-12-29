import { createSlice } from "@reduxjs/toolkit";
import { contentDptConfirmThunk } from "../../../Actions/Enquiry/ContentWritingThunk/ContentDptConfirmThunk";

const contentDptConfirmSlice = createSlice({
    name: 'contentDptConfirmSlice',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(contentDptConfirmThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(contentDptConfirmThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(contentDptConfirmThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const contentDptConfirmReducer = contentDptConfirmSlice.reducer