import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const suitablePostThunk = createAsyncThunk(
  "suitablePostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/suitabletag`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const suitableGetThunk = createAsyncThunk(
  "suitableGetThunk/data",
  async (values) => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/suitabletag`,

      data: values,
    });
    return response.data;
  }
);

export const suitableDeleteThunk = createAsyncThunk(
  "suitableDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/suitabletag/${deleteId}`,
    });
    return response.data;
  }
);

export const suitableUpdateThunk = createAsyncThunk(
  "suitableUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/suitabletag`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
