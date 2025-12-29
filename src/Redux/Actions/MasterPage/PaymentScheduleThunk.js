import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
// import API_BASE_URL from "../../../Api/api";

// const URL = API_BASE_URL

// post all data
export const paymentSchedulePostThunk = createAsyncThunk(
  "paymentSchedulePostThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: API_BASE_URL + "/" + "stages",
        data: values,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Get all data

export const paymentSchedulGetThunk = createAsyncThunk(
  "paymentSchedulGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: API_BASE_URL + "/" + "stages",
    });
    return response.data;
  }
);
// Delete data
export const paymentScheduleDeleteThunk = createAsyncThunk(
  "paymentScheduleDeleteThunk/data",
  async (id) => {
    const response = await axios({
      method: "delete",
      url: API_BASE_URL + "/" + "stages" + "/" + id,
    });
    return response.data;
  }
);

//update data
export const paymentScheduleUpdateThunk = createAsyncThunk(
  "paymentScheduleUpdateThunk/data",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: API_BASE_URL + "/" + "stages",
        data: values,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
