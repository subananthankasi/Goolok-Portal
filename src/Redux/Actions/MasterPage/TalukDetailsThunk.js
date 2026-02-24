import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const talukDetailsPostThunk = createAsyncThunk(
  "talukDetailsPostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/talukOffice`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const talukDetailsGetThunk = createAsyncThunk(
  "talukDetailsGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/talukOffice`,
    });
    return response.data;
  }
);

export const talukDetailsDeleteThunk = createAsyncThunk(
  "talukDetailsDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/talukOffice/${deleteId}`,
    });
    return response.data;
  }
);

export const talukDetailsUpdateThunk = createAsyncThunk(
  "talukDetailsUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/talukOffice`,
        data: values,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
