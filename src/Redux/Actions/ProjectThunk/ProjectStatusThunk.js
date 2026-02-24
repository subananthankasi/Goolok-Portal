import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const projectStatusThunk = createAsyncThunk(
  "projectStatusThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/countstatus`,
      headers: {
        "Gl-Status": "sale",
      },
    });
    return response.data;
  }
);

export const ServiceProjectStatusThunk = createAsyncThunk(
  "ServiceProjectStatusThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/countstatus`,
      headers: {
        "Gl-Status": "service",
      },
    });
    return response.data;
  }
);
