import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const contactPersonSroPostThunk = createAsyncThunk(
  "contactPersonSroPostThunk/data",
  async (values) => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/contactPerson`,
      data: values,
    });
    return response.data;
  }
);

export const contactPersonSroGetThunk = createAsyncThunk(
  "contactPersonSroGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/contactPerson`,
      headers:{
        "Pr-Root" : "sro"
      }
    });
    return response.data;
  }
);

export const contactPersonSroDeleteThunk = createAsyncThunk(
  "contactPersonSroDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/contactPerson/${deleteId}`,
    });
    return response.data;
  }
);

export const contactPersonSroUpdateThunk = createAsyncThunk(
  "contactPersonSroUpdateThunk/data",
  async (values) => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/contactPerson`,
      data: values,
    });
    return response.data;
  }
);
