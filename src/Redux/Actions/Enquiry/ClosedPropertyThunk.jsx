import { createAsyncThunk } from "@reduxjs/toolkit"
import API_BASE_URL from "../../../Api/api"
import axios from "axios"


export const closedPropertyThunk = createAsyncThunk('closedPropertyThunk/data',
    async (payload) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/closed`,
            data:payload,
        })
        return response.data
    }
)
