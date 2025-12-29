
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

// const BASE_URL = 'https://webman.co.in/goolok/api';
const URL_API ='https://webman.co.in/goolok/api/enquirydeed/add'

export const DocumentPendingCreate = createAsyncThunk('DocumentPendingCreate/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url:URL_API,
            // BASE_URL : (`${BASE_URL}/enquirydeed/add`, values),
            data:values,
        })
        return response.data
    }
)
// get........... 
// const URL_APi ='https://webman.co.in/goolok/api/prdetail'

export const DocumentPendingGet = createAsyncThunk('DocumentPendingCreate/data',
    async (enqid) => {
        const response = await axios({
            method: 'GET',
            url:`${API_BASE_URL}/prdetail/${enqid}`,
        })
        return response.data
    }
)
