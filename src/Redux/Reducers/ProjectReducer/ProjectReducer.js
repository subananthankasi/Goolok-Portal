import { createSlice } from "@reduxjs/toolkit";
import { projectServiceVerifyThunk, projectVerifyThunk } from "../../Actions/ProjectThunk/ProjectThunk";

const projectverify = createSlice({
    name: 'projectverify',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(projectVerifyThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(projectVerifyThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(projectVerifyThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const projectverifyReducer = projectverify.reducer

const projectServiceVerify = createSlice({
    name: 'projectverify',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(projectServiceVerifyThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(projectServiceVerifyThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(projectServiceVerifyThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        });
    }
})

export const projectServiceVerifyService = projectServiceVerify.reducer