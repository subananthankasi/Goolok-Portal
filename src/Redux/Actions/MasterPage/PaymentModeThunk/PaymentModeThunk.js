import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const PaymentModePostThunk = createAsyncThunk(
  "PaymentModePostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/paymentmode`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const PaymentModeGetThunk = createAsyncThunk(
  "PaymentModeGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/paymentmode`,
    });
    return response.data;
  }
);

export const PaymentModeDeleteThunk = createAsyncThunk(
  "PaymentModeDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/paymentmode/${deleteId}`,
    });
    return response.data;
  }
);

export const PaymentModeUpdateThunk = createAsyncThunk(
  "PaymentModeUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/paymentmode`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
