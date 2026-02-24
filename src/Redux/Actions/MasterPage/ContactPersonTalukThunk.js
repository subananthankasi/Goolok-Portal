import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const contactPersonTalukPostThunk = createAsyncThunk(
  "contactPersonTalukPostThunk/data",
  async (values) => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/contactPerson`,
      data: values,
    });
    return response.data;
  }
);

export const contactPersonTalukGetThunk = createAsyncThunk(
  "contactPersonTalukGetThunk/data",
  async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/contactPerson`,
      headers:{
        "Pr-Root" : "taluk"
      }
    });
    return response.data;
  }
);

export const contactPersonTalukDeleteThunk = createAsyncThunk(
  "contactPersonTalukDeleteThunk/data",
  async (deleteId) => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/contactPerson/${deleteId}`,
    });
    return response.data;
  }
);

export const contactPersonTalukUpdateThunk = createAsyncThunk(
  "contactPersonTalukUpdateThunk/data",
  async (values) => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/contactPerson`,
      data: values,
    });
    return response.data;
  }
);
