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
            headers: {
                "Gl-status": 'document'
            },
            data:values,
        })
        return response.data
    }
)

// const URL_APi =' https://webman.co.in/goolok/api/documentcat'

export const AddDocumentDropdown = createAsyncThunk('AddDocumentDropdown/data',
    async () => {
        const response = await axios({
            method: 'GET',
            // url:URL_APi,
             url : `${API_BASE_URL}/documentcat`,
          
            
        })


        return response.data
    }
)