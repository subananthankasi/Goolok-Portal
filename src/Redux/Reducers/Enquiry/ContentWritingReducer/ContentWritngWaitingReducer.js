import { createSlice } from "@reduxjs/toolkit";
import { contentWritingCompleteThunk, contentWritingPendingThunk, contentWritingWaitingThunk } from "../../../Actions/Enquiry/ContentWritingThunk/ContentWritingThunk";

const waitingContentReducer = createSlice({
    name: 'waitingContentReducer',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(contentWritingWaitingThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(contentWritingWaitingThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(contentWritingWaitingThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const contentWritingWaitingReducer = waitingContentReducer.reducer

//.....

const pendingContentReducer = createSlice({
    name: 'pendingContentReducer',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(contentWritingPendingThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(contentWritingPendingThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(contentWritingPendingThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const contentWritingPendingReducer = pendingContentReducer.reducer

//........
const completeContentReducer = createSlice({
    name: 'completeContentReducer',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(contentWritingCompleteThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(contentWritingCompleteThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(contentWritingCompleteThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const contentWritingCompleteReducer = completeContentReducer.reducer
