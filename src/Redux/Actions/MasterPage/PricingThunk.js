import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const pricingPostThunk = createAsyncThunk(
  "pricingPostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        // url: URL + '/' +'charges',
        url: `${API_BASE_URL}/charges`,

        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Get all data

export const pricingGetThunk = createAsyncThunk(
  "pricingGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/charges`,
    });
    return response.data;
  }
);

// Delete data
export const pricingDeleteThunk = createAsyncThunk(
  "pricingDeleteThunk/data",
  async (id) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/charges/${id}`,
    });
    return response.data;
  }
);

//update data
export const pricingUpdateThunk = createAsyncThunk(
  "pricingUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        // url:URL +'/'+'charges',
        url: `${API_BASE_URL}/charges`,
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
      //   if (error.response) {
      //     return rejectWithValue({ reason: error });
      //   } else {
      //     return rejectWithValue({
      //       reason: "An unexpected error occurred: " + error.message,
      //     });
      //   }
    }
  }
);
