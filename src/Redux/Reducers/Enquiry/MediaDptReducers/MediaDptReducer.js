import { createSlice } from "@reduxjs/toolkit";
import { mediaCompleteThunk, mediaPendingThunk, mediaWaitingThunk } from "../../../Actions/Enquiry/MediaDptEnq/MediaDptEnqThunk";


const waitingGetMedia = createSlice({
    name: 'waitingGetMedia',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(mediaWaitingThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(mediaWaitingThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(mediaWaitingThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const mediaWaitingReducer = waitingGetMedia.reducer
//.............................................................

const pendingGetMedia = createSlice({
    name: 'pendingGetMedia',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(mediaPendingThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(mediaPendingThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(mediaPendingThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const mediaPendingReducer = pendingGetMedia.reducer
//.....................................
const completeGet = createSlice({
    name: 'completeGet',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(mediaCompleteThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(mediaCompleteThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false

        });
        builder.addCase(mediaCompleteThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false

        });
    }
})

export const mediaCompleteReducer = completeGet.reducer

