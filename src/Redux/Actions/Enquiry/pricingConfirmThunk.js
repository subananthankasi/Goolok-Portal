import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";


export const pricingConfirmThunk = createAsyncThunk('pricingConfirmThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/pricingcomplete`,
                data: values
            })
            return response.data
        }
        catch (error) {
            if (error.response) {
                return rejectWithValue({ reason: error });
            }
            else {
                return rejectWithValue({ reason: 'An unexpected error occurred: ' + error.message });
            }
        }
    }

)