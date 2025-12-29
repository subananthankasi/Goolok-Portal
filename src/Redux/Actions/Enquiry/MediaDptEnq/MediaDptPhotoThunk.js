import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"

export const mediaPostPhotoThunk = createAsyncThunk('mediaPostPhotoThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/creategallery`,
            data:values,
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    }
)

export const mediaGetPhotoThunk = createAsyncThunk('mediaGetPhotoThunk/data',
    async (ids) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/mediadpt/${ids}/edit`,
      
        })
        return response.data
    }
)

export const mediaUpdatePhotoThunk = createAsyncThunk('mediaUpdatePhotoThunk/data',
    async (payload) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/creategallery`,
            data:payload,
            headers:{
                'Content-Type': 'multipart/form-data',
            }
      
        })
        return response.data
    }
)

export const mediaDeletePhotoThunk = createAsyncThunk('mediaDeletePhotoThunk/data',
    async (deleteId) => {

        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/gallerydelete/${deleteId}`,
      
        })
        return response.data
    }
)