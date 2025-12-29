import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";


const URL_API ='https://webman.co.in/goolok/api/lawyer'

export const AddDocumentPendingCreate = createAsyncThunk('DocumentPendingCreate/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url:URL_API,
            // BASE_URL : (`${BASE_URL}/enquirydeed/add`, values),
            // headers: {
            //     "Gl-status": 'document'
            // },
            data:values,
        })
        return response.data
    }
)
