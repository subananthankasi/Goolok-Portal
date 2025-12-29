import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"

export const mediaVideoPostThunk = createAsyncThunk('mediaVideoPostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/mediadpt`,
            data:values,
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    }
)

export const mediaVideoGetThunk = createAsyncThunk('mediaVideoGetThunk/data',
    async (eid) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/mediadpt/${eid}`,

        })
        return response.data
    }
)

export const mediaVideoDeleteThunk = createAsyncThunk('mediaVideoDeleteThunk/data',
    async (deleteId) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/mediadpt/${deleteId}`,

        })
        return response.data
    }
)

export const mediaVideoUpdateThunk = createAsyncThunk('mediaVideoUpdateThunk/data',
    async (payload) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/mediadpt`,
            data:payload,
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    }
)