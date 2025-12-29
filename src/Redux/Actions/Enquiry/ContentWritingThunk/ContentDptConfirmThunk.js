import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

export const contentDptConfirmThunk = createAsyncThunk('contentDptConfirmThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/contentdpt/confirm` ,
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