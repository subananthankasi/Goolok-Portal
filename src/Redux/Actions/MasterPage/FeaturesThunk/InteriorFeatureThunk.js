import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const iFeaturePostThunk = createAsyncThunk(
  "iFeaturePostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/interiorfeature`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const iFeatureGetThunk = createAsyncThunk(
  "iFeatureGetThunk/data",
  async (values) => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/interiorfeature`,

      data: values,
    });
    return response.data;
  }
);

export const iFeatureDeleteThunk = createAsyncThunk(
  "iFeatureDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/interiorfeature/${deleteId}`,
    });
    return response.data;
  }
);

export const iFeatureUpdateThunk = createAsyncThunk(
  "iFeatureUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/interiorfeature`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
