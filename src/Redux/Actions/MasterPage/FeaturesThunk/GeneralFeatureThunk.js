import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const gFeaturePostThunk = createAsyncThunk(
  "gFeaturePostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/generalfeature`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const gFeatureGetThunk = createAsyncThunk(
  "gFeatureGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/generalfeature`,
    });
    return response.data;
  }
);

export const gFeatureDeleteThunk = createAsyncThunk(
  "gFeatureDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/generalfeature/${deleteId}`,
    });
    return response.data;
  }
);

export const gFeatureUpdateThunk = createAsyncThunk(
  "gFeatureUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/generalfeature`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
