import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"



// post all data
export const localitiesPostThunk = createAsyncThunk('localitiesPostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/contentdpt/generate` ,
            data: values,
        })
        return response.data
    }
)

//Get all data

export const localitiesGetThunk = createAsyncThunk('localitiesGetThunk/data',
    async (enq) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/contentdpt/${enq}/edit` ,
        })
        return response.data
    }
)
 // Delete data
export const localitiesDeleteThunk = createAsyncThunk('localitiesDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/contentdpt/${id}` ,
        })
        return response.data
    }
)

//update data
export const localitiesUpdateThunk = createAsyncThunk('localitiesUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/contentdpt/generate` ,
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