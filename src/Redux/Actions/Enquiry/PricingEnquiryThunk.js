
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";


const URL = API_BASE_URL

const staffid = JSON.parse(sessionStorage.getItem('token'));

export const pricingWaitingThunk = createAsyncThunk('pricingWaitingThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/pricingdpt/new`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
)

export const pricingWaitingTakeThunk = createAsyncThunk('pricingWaitingTakeThunk/data',
    async (docId, taken) => {
        const response = await axios({
            method: 'put',
            url: `${API_BASE_URL}/pricingdpt/${docId}`,
            data:taken

        })
        
        return response.data

    }
)



export const pricingPendingThunk = createAsyncThunk('pricingPendingThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/pricingdpt?id=${staffid.loginid}&status=pending`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
)

export const pricingCompletedThunk = createAsyncThunk('pricingCompletedThunk/data',
    async () => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/pricingdpt?id=${staffid.loginid}&status=complete`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data

    }
)
//////............................................................................................................

export const pricingDptPostThunk = createAsyncThunk('pricingDptPostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/pricingdpt`,
            data:values,

        })
        return response.data
    }
)
export const pricingDptGetThunk = createAsyncThunk('pricingDptGetThunk/data',
    async (eid) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/pricingdpt/${eid}`,
        })
        return response.data
    }
)

export const pricingDptUpdateThunk = createAsyncThunk('pricingDptUpdateThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/pricingdpt`,
            data:values
        })
        return response.data
    }
)
export const pricingDptDeleteThunk = createAsyncThunk('pricingDptDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/pricingdpt/${id}`,
        })
        return response.data
    }
)