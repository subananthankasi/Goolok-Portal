import { createSlice } from "@reduxjs/toolkit";
import { paymentScheduleStageEnqGetThunk, paymentScheduleStageEnqPostThunk } from "../../Actions/Enquiry/PaymentScheduleEnqStageThunk";

const postSelect = createSlice({
    name: 'select',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(paymentScheduleStageEnqPostThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(paymentScheduleStageEnqPostThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(paymentScheduleStageEnqPostThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const paymentScheduleStagePostReducer = postSelect.reducer

//.................................
const getSelect = createSlice({
    name: 'getSelect',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(paymentScheduleStageEnqGetThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(paymentScheduleStageEnqGetThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(paymentScheduleStageEnqGetThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const paymentScheduleStageEnqGetReducer = getSelect.reducer
