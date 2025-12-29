import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

const URL = API_BASE_URL

// post all data
export const paymentScheduleEnqPostThunk = createAsyncThunk('paymentScheduleEnqPostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: API_BASE_URL + '/'+'addstages',
            data: values,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
)

//Get all data

export const paymentSchedulEnqGetThunk = createAsyncThunk('paymentSchedulEnqGetThunk/data',
    async (id) => {
        const response = await axios({
            method: 'get',
            url: API_BASE_URL + '/' + 'allstages/'+ id,
        })
        return response.data
    }
)
 // Delete data
export const paymentScheduleEnqDeleteThunk = createAsyncThunk('paymentScheduleEnqDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: API_BASE_URL + '/' + 'stagedelete' + '/' + id
        })
        return response.data
    }
)

//update data
export const paymentScheduleEnqUpdateThunk = createAsyncThunk('paymentScheduleEnqUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'addstages',
                data: values
            })
            return response.data
        }
        catch (error) {
            if (error.response) {
                return rejectWithValue({ reason: error });
            }
            else {
                return rejectWithValue({ reason: 'An unexpected error occurred: ' + error.message });
            }
        }
    }

)