import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const propertyPostThunk = createAsyncThunk(
  "propertyPostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/propertytag`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const propertyGetThunk = createAsyncThunk(
  "propertyGetThunk/data",
  async (values) => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/propertytag`,

      data: values,
    });
    return response.data;
  }
);

export const propertyDeleteThunk = createAsyncThunk(
  "propertyDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/propertytag/${deleteId}`,
    });
    return response.data;
  }
);

export const propertyUpdateThunk = createAsyncThunk(
  "propertyUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/propertytag`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
