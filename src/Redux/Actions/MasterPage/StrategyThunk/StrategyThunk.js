import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const strategyPostThunk = createAsyncThunk(
  "strategyPostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/strategy`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const strategyGetThunk = createAsyncThunk(
  "strategyGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/strategy`,
    });
    return response.data;
  }
);

export const strategyDeleteThunk = createAsyncThunk(
  "strategyDeleteThunk/data",
  async (deleteId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/strategy/${deleteId}`,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const strategyUpdateThunk = createAsyncThunk(
  "strategyUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/strategy`,
        data: values,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);
