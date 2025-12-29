import { createSlice } from "@reduxjs/toolkit";
import { districtGetThunk, pincodeGetThunk, sroGetThunk, stateGetThunk, talukGetThunk, villageGetThunk } from "../../Actions/MasterPage/GeneralAddressAction";

const generalAddressSlice = createSlice({
    name: "address",
    initialState: {
        state: { data: [], loading: false, error: null },
        district: { data: [], loading: false, error: null },
        taluk: { data: [], loading: false, error: null },
        village: { data: [], loading: false, error: null },
        pincode: { data: [], loading: false, error: null },
        sro: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {

        // STATE
        builder
            .addCase(stateGetThunk.pending, (s) => { s.state.loading = true })
            .addCase(stateGetThunk.fulfilled, (s, a) => {
                s.state.data = a.payload; s.state.loading = false;
            })
            .addCase(stateGetThunk.rejected, (s, a) => {
                s.state.error = a.error; s.state.loading = false;
            });

        // DISTRICT
        builder
            .addCase(districtGetThunk.pending, (s) => { s.district.loading = true })
            .addCase(districtGetThunk.fulfilled, (s, a) => {
                s.district.data = a.payload; s.district.loading = false;
            })
            .addCase(districtGetThunk.rejected, (s, a) => {
                s.district.error = a.error; s.district.loading = false;
            });

        // TALUK
        builder
            .addCase(talukGetThunk.pending, (s) => { s.taluk.loading = true })
            .addCase(talukGetThunk.fulfilled, (s, a) => {
                s.taluk.data = a.payload; s.taluk.loading = false;
            })
            .addCase(talukGetThunk.rejected, (s, a) => {
                s.taluk.error = a.error; s.taluk.loading = false;
            });

        // VILLAGE
        builder
            .addCase(villageGetThunk.pending, (s) => { s.village.loading = true })
            .addCase(villageGetThunk.fulfilled, (s, a) => {
                s.village.data = a.payload; s.village.loading = false;
            })
            .addCase(villageGetThunk.rejected, (s, a) => {
                s.village.error = a.error; s.village.loading = false;
            });

        // PINCODE
        builder
            .addCase(pincodeGetThunk.pending, (s) => { s.pincode.loading = true })
            .addCase(pincodeGetThunk.fulfilled, (s, a) => {
                s.pincode.data = a.payload; s.pincode.loading = false;
            })
            .addCase(pincodeGetThunk.rejected, (s, a) => {
                s.pincode.error = a.error; s.pincode.loading = false;
            });
        // SRO
        builder
            .addCase(sroGetThunk.pending, (s) => { s.sro.loading = true })
            .addCase(sroGetThunk.fulfilled, (s, a) => {
                s.sro.data = a.payload; s.sro.loading = false;
            })
            .addCase(sroGetThunk.rejected, (s, a) => {
                s.sro.error = a.error; s.sro.loading = false;
            });
    },
});

export const generalAddressReducer = generalAddressSlice.reducer;
