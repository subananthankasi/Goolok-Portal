import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../Api/api";

export const enquiryCountsThunk = createAsyncThunk(
  "enquiryCountsThunk/data",
  async (values) => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/enquirycount`,
      data: values,
    });
    return response.data;
  },
);
