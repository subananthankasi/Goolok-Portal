import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const stateGetThunk = createAsyncThunk(
    "stateGetThunk/data",
    async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/state`,
        });
        return response.data;
    }
);
export const districtGetThunk = createAsyncThunk(
    "districtGetThunk/data",
    async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/district`,
        });
        return response.data;
    }
);
export const talukGetThunk = createAsyncThunk(
    "talukGetThunk/data",
    async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/taluk`,
        });
        return response.data;
    }
);
export const villageGetThunk = createAsyncThunk(
    "villageGetThunk/data",
    async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/village`,
        });
        return response.data;
    }
);
export const pincodeGetThunk = createAsyncThunk(
    "pincodeGetThunk/data",
    async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/pincode`,
        });
        return response.data;
    }
);

export const sroGetThunk = createAsyncThunk(
    "sroGetThunk/data",
    async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/srodetails`,
        });
        return response.data;
    }
);
