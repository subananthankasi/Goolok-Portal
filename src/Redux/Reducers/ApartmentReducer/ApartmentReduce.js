import { createSlice } from "@reduxjs/toolkit";
import {DocumentPendingCreate,DocumentPendingGet} from "../../Actions/ApartmentDocument/ApartmentDocPending"

const ApartmentPendingSlice = createSlice({
    name: 'ApartmentPendingSlice',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(DocumentPendingCreate.pending, (state) => {
            state.loading = true
        });
        builder.addCase(DocumentPendingCreate.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(DocumentPendingCreate.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const ApartmentReducer = ApartmentPendingSlice.reducer


const ApartmentPendinggetSlice = createSlice({
    name: 'ApartmentPendinggetSlice',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(DocumentPendingGet.pending, (state) => {
            state.loading = true
        });
        builder.addCase(DocumentPendingGet.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(DocumentPendingGet.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const ApartmentGetReducer = ApartmentPendinggetSlice.reducer