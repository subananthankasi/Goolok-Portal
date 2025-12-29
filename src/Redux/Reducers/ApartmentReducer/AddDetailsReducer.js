import { createSlice } from "@reduxjs/toolkit";
import {AddDocumentDropdown, AddDocumentPendingCreate,AddDocumentPendingget} from "../../Actions/ApartmentDocument/AddDocument"

const ApartmentAddDocPendingSlice = createSlice({
    name: 'ApartmentAddDocPendingSlice',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(AddDocumentPendingCreate.pending, (state) => {
            state.loading = true
        });
        builder.addCase(AddDocumentPendingCreate.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(AddDocumentPendingCreate.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})
export const ApartmentAddReducer = ApartmentAddDocPendingSlice.reducer
