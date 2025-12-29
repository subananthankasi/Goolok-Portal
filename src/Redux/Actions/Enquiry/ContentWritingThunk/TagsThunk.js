import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"




// post all data
export const tagsPostThunk = createAsyncThunk('tagsPostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/contentdpt/createtags` ,
            data: values,
        })
        return response.data
    }
)

//Get all data

export const tagsGetThunk = createAsyncThunk('tagsGetfffffThunk/data',
    async (enq) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/alltags/${enq}` ,
        })
        return response.data
    }
)
 // Delete data
export const tagsDeleteThunk = createAsyncThunk('tagsDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/alltags/${id}` ,
        })
        return response.data
    }
)

//update data
export const tagsUpdateThunk = createAsyncThunk('tagsUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/contentdpt/createtags` ,
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