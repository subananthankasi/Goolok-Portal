import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import API_BASE_URL from "../../../../Api/api"



// post all data
export const CWDescAndFeaturePostThunk = createAsyncThunk('CWDescAndFeaturePostThunk/data',
    async (values) => {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/contentdpt` ,
            data: values,
        })
        return response.data
    }
)

//Get all data

export const CWDescAndFeatureGetThunk = createAsyncThunk('CWDescAndFeatureGetThunk/data',
    async (enq) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/contentdpt/${enq}` ,
        })
        return response.data
    }
)
 // Delete data
export const paymentScheduleEnqDeleteThunk = createAsyncThunk('paymentScheduleEnqDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: API_BASE_URL + '/' + 'stagedelete' + '/' + id
        })
        return response.data
    }
)

//update data
export const paymentScheduleEnqUpdateThunk = createAsyncThunk('paymentScheduleEnqUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'addstages',
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

//genaralFeatureThunk...........................................................................................................................

export const gEnqFeaturePostThunk = createAsyncThunk('gEnqFeaturePostThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'contentdpt/addgeneral',
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

export const gEnqFeatureGetThunk = createAsyncThunk('gEnqFeatureGetThunk/data',
    async (eid) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/allgeneral/${eid}` ,
        })
        return response.data
    }
)

export const gEnqFeatureDeleteThunk = createAsyncThunk('gEnqFeatureDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/generaldelete/${id}` ,
        })
        return response.data
    }
)

//update data
export const gEnqFeatureUpdateThunk = createAsyncThunk('gEnqFeatureUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'contentdpt/addgeneral',
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

//......................................................................................................

// Interior feature
export const iEnqFeaturePostThunk = createAsyncThunk('iEnqFeaturePostThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'contentdpt/addinterior',
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

export const iEnqFeatureGetThunk = createAsyncThunk('iEnqFeatureGetThunk/data',
    async (eid) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/allinterior/${eid}` ,
        })
        return response.data
    }
)

export const iEnqFeatureDeleteThunk = createAsyncThunk('iEnqFeatureDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/interiordelete/${id}` ,
        })
        return response.data
    }
)

//update data
export const iEnqFeatureUpdateThunk = createAsyncThunk('iEnqFeatureUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'contentdpt/addinterior',
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

//......................................................................................................

// exterior feature


export const eEnqFeaturePostThunk = createAsyncThunk('eEnqFeaturePostThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'contentdpt/addexterior',
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

export const eEnqFeatureGetThunk = createAsyncThunk('eEnqFeatureGetThunk/data',
    async (eid) => {
        const response = await axios({
            method: 'get',
            url: `${API_BASE_URL}/allexterior/${eid}` ,
        })
        return response.data
    }
)

export const eEnqFeatureDeleteThunk = createAsyncThunk('eEnqFeatureDeleteThunk/data',
    async (id) => {
        const response = await axios({
            method: 'delete',
            url: `${API_BASE_URL}/exteriordelete/${id}` ,
        })
        return response.data
    }
)

//update data
export const eEnqFeatureUpdateThunk = createAsyncThunk('eEnqFeatureUpdateThunk/data',
    async (values, { rejectWithValue }) => {

        try {

            const response = await axios({
                method: 'post',
                url:API_BASE_URL +'/'+'contentdpt/addexterior',
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
