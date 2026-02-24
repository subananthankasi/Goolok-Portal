import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"

export const offerPostThunk = createAsyncThunk('offerPostThunk/data',
    async (values) => {

        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/coupons`,
            data: values
        })
        return response.data
    }
)

export const offerGetThunk = createAsyncThunk('offerGetThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/discount`,
        })
        return response.data
    }
)

export const offerDeleteThunk = createAsyncThunk('offerDeleteThunk/data',
    async (deleteId) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/discount/${deleteId}`,
        })
        return response.data
    }
)

export const offerUpdateThunk = createAsyncThunk('offerUpdateThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/discount`,
            data: values
        })
        return response.data
    }
)