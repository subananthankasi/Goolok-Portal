import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"




// post all data
export const nearByPostThunk = createAsyncThunk('nearByPostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/contentdpt/add` ,
            data: values,
        })
        return response.data
    }
)

//Get all data

export const nearByGetThunk = createAsyncThunk('nearByGetThunk/data',
    async (enq) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/alldata/${enq}` ,
        })
        return response.data
    }
)
 // Delete data
export const nearByDeleteThunk = createAsyncThunk('nearByDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/nearbydelete/${id}` ,
        })
        return response.data
    }
)

//update data
export const nearByUpdateThunk = createAsyncThunk('nearByUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/contentdpt/add` ,
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