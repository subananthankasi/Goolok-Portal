import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"

export const mediaAttachmentPostThunk = createAsyncThunk('mediaAttachmentPostThunk/data',
    async (payload) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/createattach`,
            data:payload,
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    }
)

export const mediaAttachmentGetThunk = createAsyncThunk('mediaAttachmentGetThunk/data',
    async (enqid) => {

        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/allmediadoc/${enqid}`
        })
        return response.data
    }
)

export const mediaAttachmentUpdateThunk = createAsyncThunk('mediaAttachmentUpdateThunk/data',
    async (payload) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/updateattach`,
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            data:payload
        })
        return response.data
    }
)

export const mediaAttachmentDeleteThunk = createAsyncThunk('mediaAttachmentDeleteThunk/data',
    async (deleteId) => {

        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/deleteattach/${deleteId}`
        })
        return response.data
    }
)