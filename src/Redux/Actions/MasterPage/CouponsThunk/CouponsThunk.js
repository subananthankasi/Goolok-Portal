import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"

export const couponsPostThunk = createAsyncThunk('couponsPostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/coupons`,
            data: values
        })
        return response.data
    }
)

export const couponsGetThunk = createAsyncThunk('couponsGetThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/coupons`,
        })
        return response.data
    }
)

export const couponsDeleteThunk = createAsyncThunk('couponsDeleteThunk/data',
    async (deleteId) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/coupons/${deleteId}`,
        })
        return response.data
    }
)

export const couponsUpdateThunk = createAsyncThunk('couponsUpdateThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/coupons`,
            data: values
        })
        return response.data
    }
)