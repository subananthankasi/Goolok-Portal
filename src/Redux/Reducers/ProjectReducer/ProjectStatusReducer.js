import { createSlice } from "@reduxjs/toolkit";
import { projectStatusThunk, ServiceProjectStatusThunk } from "../../Actions/ProjectThunk/ProjectStatusThunk";
import { projectVerifyThunk } from "../../Actions/ProjectThunk/ProjectThunk";

const projectStatus = createSlice({
    name: 'projectStatus',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(projectStatusThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(projectStatusThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(projectStatusThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const projectStatusReducer = projectStatus.reducer

const ServiceProjectStatus = createSlice({
    name: 'ServiceProjectStatus',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(ServiceProjectStatusThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(ServiceProjectStatusThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(ServiceProjectStatusThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const ServiceProjectReducer = ServiceProjectStatus.reducer