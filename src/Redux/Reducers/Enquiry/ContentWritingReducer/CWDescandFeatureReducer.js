import { createSlice } from "@reduxjs/toolkit";
import { iFeatureDeleteThunk, iFeatureGetThunk, iFeaturePostThunk, iFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/InteriorFeatureThunk";
import { eFeatureDeleteThunk, eFeatureGetThunk, eFeaturePostThunk, eFeatureUpdateThunk } from "../../../Actions/MasterPage/FeaturesThunk/ExteriorFeatureThunk";
import { CWDescAndFeatureGetThunk, CWDescAndFeaturePostThunk, eEnqFeatureDeleteThunk, eEnqFeatureGetThunk, eEnqFeaturePostThunk, eEnqFeatureUpdateThunk, gEnqFeatureDeleteThunk, gEnqFeatureGetThunk, gEnqFeaturePostThunk, gEnqFeatureUpdateThunk, iEnqFeatureDeleteThunk, iEnqFeatureGetThunk, iEnqFeaturePostThunk, iEnqFeatureUpdateThunk } from "../../../Actions/Enquiry/ContentWritingThunk/CWDescriptionFeatureThunk";

const descAndFetureSlice = createSlice({
    name: 'descAndFetureSlice',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(CWDescAndFeaturePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(CWDescAndFeaturePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(CWDescAndFeaturePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(CWDescAndFeatureGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(CWDescAndFeatureGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(CWDescAndFeatureGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(eFeatureDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(eFeatureDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(eFeatureDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(eFeatureUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(eFeatureUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(eFeatureUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const CWdescAndFetureReducer = descAndFetureSlice.reducer;



//.................................................................................
//..GEnq features

const GEnqfutures = createSlice({
    name: 'GEnqfutures',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(gEnqFeaturePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(gEnqFeaturePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(gEnqFeaturePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(gEnqFeatureGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(gEnqFeatureGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(gEnqFeatureGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(gEnqFeatureDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(gEnqFeatureDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(gEnqFeatureDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(gEnqFeatureUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(gEnqFeatureUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(gEnqFeatureUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const GEnqfuturesReducer = GEnqfutures.reducer;

//.................................................................................
//..interior Enquiry features
const IEnqfutures = createSlice({
    name: 'IEnqfutures',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(iEnqFeaturePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(iEnqFeaturePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(iEnqFeaturePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(iEnqFeatureGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(iEnqFeatureGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(iEnqFeatureGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(iEnqFeatureDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(iEnqFeatureDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(iEnqFeatureDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(iEnqFeatureUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(iEnqFeatureUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(iEnqFeatureUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const IEnqfuturesReducer = IEnqfutures.reducer;



//.................................................................................
//..interior Enquiry features
const eEnqfutures = createSlice({
    name: 'eEnqfutures',
    initialState: {
        post: { data: [], loading: false, error: null },
        get: { data: [], loading: false, error: null },
        delete: { data: [], loading: false, error: null },
        update: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        // POST reducers
        builder.addCase(eEnqFeaturePostThunk.pending, (state) => {
            state.post.loading = true;
        });
        builder.addCase(eEnqFeaturePostThunk.fulfilled, (state, action) => {
            state.post.data = action.payload;
            state.post.loading = false;
        });
        builder.addCase(eEnqFeaturePostThunk.rejected, (state, action) => {
            state.post.error = action.payload;
            state.post.loading = false;
        });

        // GET reducers
        builder.addCase(eEnqFeatureGetThunk.pending, (state) => {
            state.get.loading = true;
        });
        builder.addCase(eEnqFeatureGetThunk.fulfilled, (state, action) => {
            state.get.data = action.payload;
            state.get.loading = false;
        });
        builder.addCase(eEnqFeatureGetThunk.rejected, (state, action) => {
            state.get.error = action.payload;
            state.get.loading = false;
        });

        // DELETE reducers
        builder.addCase(eEnqFeatureDeleteThunk.pending, (state) => {
            state.delete.loading = true;
        });
        builder.addCase(eEnqFeatureDeleteThunk.fulfilled, (state, action) => {
            state.delete.data = action.payload;
            state.delete.loading = false;
        });
        builder.addCase(eEnqFeatureDeleteThunk.rejected, (state, action) => {
            state.delete.error = action.payload;
            state.delete.loading = false;
        });

        // UPDATE reducers
        builder.addCase(eEnqFeatureUpdateThunk.pending, (state) => {
            state.update.loading = true;
        });
        builder.addCase(eEnqFeatureUpdateThunk.fulfilled, (state, action) => {
            state.update.data = action.payload;
            state.update.loading = false;
        });
        builder.addCase(eEnqFeatureUpdateThunk.rejected, (state, action) => {
            state.update.error = action.payload;
            state.update.loading = false;
        });
    },
});

export const eEnqfuturesReducer = eEnqfutures.reducer;
