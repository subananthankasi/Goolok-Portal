import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

const staffid = JSON.parse(localStorage.getItem('token'));

export const contentWritingWaitingThunk = createAsyncThunk('contentWritingWaitingThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url:`${API_BASE_URL}/contentdpt/new`
        })
        return response.data
    }
)
export const contentWritingPendingThunk = createAsyncThunk('contentWritingPendingThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
           url: `${API_BASE_URL}/contentdpt?id=${staffid.loginid}&status=pending`
        })
        return response.data
    }
)

export const contentWritingCompleteThunk = createAsyncThunk('contentWritingCompleteThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/contentdpt?id=${staffid.loginid}&status=complete`
        })
        return response.data
    }
)