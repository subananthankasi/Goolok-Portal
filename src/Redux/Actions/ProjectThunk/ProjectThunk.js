import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../Api/api"

export const projectVerifyThunk = createAsyncThunk('projectVerifyThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/enquiryreport/status`,
            data: values
        })
        return response.data
    }
)
export const projectServiceVerifyThunk = createAsyncThunk('projectServiceVerifyThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/enquiryreport/service_verify`,
            data: values
        })
        return response.data
    }
)