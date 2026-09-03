import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const bankPostThunk = createAsyncThunk(
  "bankPostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/bankname`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const bankGetThunk = createAsyncThunk(
  "bankGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/bankname`,
    });
    return response.data;
  }
);

export const bankDeleteThunk = createAsyncThunk(
  "bankDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/bankname/${deleteId}`,
    });
    return response.data;
  }
);

export const bankUpdateThunk = createAsyncThunk(
  "bankUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/bankname`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
