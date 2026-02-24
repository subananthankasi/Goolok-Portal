import { createSlice } from "@reduxjs/toolkit";
import { pricingCompletedThunk, pricingDptDeleteThunk, pricingDptGetThunk, pricingDptPostThunk, pricingDptUpdateThunk, pricingPendingThunk, pricingWaitingTakeThunk, pricingWaitingThunk } from "../../Actions/Enquiry/PricingEnquiryThunk";

const waiting = createSlice({
    name: 'waiting',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(pricingWaitingThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(pricingWaitingThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(pricingWaitingThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const waitingPricingReducer = waiting.reducer
//........................

const waitingTake = createSlice({
    name: 'waiting',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(pricingWaitingTakeThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(pricingWaitingTakeThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(pricingWaitingTakeThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const waitingTalePricingReducer = waitingTake.reducer
//.............................

const pending = createSlice({
    name: 'pending',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(pricingPendingThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(pricingPendingThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(pricingWaitingThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const pendingPricingReducer = pending.reducer
//..........................

const completed = createSlice({
    name: 'completed',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(pricingCompletedThunk.pending, (state) => {
            state.loading = true
        });
        builder.addCase(pricingCompletedThunk.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(pricingCompletedThunk.rejected, (state, action) => {
            state.error = action.payload
        });
    }
})

export const completedPricingReducer = completed.reducer
//...............................

const pricingDptSlice = createSlice({
    name: 'pricingDpt',
    initialState: {
        post: { data: [], loading: false, error: null },
        get:  { data:[], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(pricingDptPostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(pricingDptPostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(pricingDptPostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(pricingDptGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(pricingDptGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(pricingDptGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(pricingDptDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(pricingDptDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(pricingDptDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(pricingDptUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(pricingDptUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(pricingDptUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const pricingDptReducer = pricingDptSlice.reducer;
