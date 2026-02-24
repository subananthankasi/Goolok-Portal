import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const eFeaturePostThunk = createAsyncThunk(
  "eFeaturePostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/exteriorfeature`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const eFeatureGetThunk = createAsyncThunk(
  "eFeatureGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/exteriorfeature`,
    });
    return response.data;
  }
);

export const eFeatureDeleteThunk = createAsyncThunk(
  "eFeatureDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/exteriorfeature/${deleteId}`,
    });
    return response.data;
  }
);

export const eFeatureUpdateThunk = createAsyncThunk(
  "eFeatureUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/exteriorfeature`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
