import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"

 
const staffid = JSON.parse(sessionStorage.getItem('token'));

export const mediaWaitingThunk = createAsyncThunk('mediaWaitingThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url: API_BASE_URL + '/' + 'mediadpt/new',
        })
        return response.data
    }
)

export const mediaPendingThunk = createAsyncThunk('mediaPendingThunk/data',
    async () => {

        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/mediadpt?id=${staffid.loginid}&status=pending`
        })
        return response.data
    }
)


export const mediaCompleteThunk = createAsyncThunk('mediaCompleteThunk/data',
    async () => {

        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/mediadpt?id=${staffid.loginid}&status=complete`
        })
        return response.data
    }
)