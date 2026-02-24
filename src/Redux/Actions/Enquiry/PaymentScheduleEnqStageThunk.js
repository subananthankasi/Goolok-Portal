import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

const URL = API_BASE_URL

export const paymentScheduleStageEnqPostThunk = createAsyncThunk('paymentScheduleStageEnqPostThunk/data',
    async (payload) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/emicreate`,
            data:payload
        })
        return response.data
    }
)


export const paymentScheduleStageEnqGetThunk = createAsyncThunk('paymentScheduleStageEnqGetThunk/data',
    async (id) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/pricingdpt/${id}/edit`,
      
        })
        return response.data
    }
)