import axios from "axios"
import API_BASE_URL from "../../../Api/api"

export const FETCH_AMENITIES = "FETCH_AMENITIES"
export const DELETE_AMENITIES = "DELETE_AMENITIES"
export const AMENITIES_ERROR = "AMENITIES_ERROR"

const fetchSuccess = (data) => {
    return {
        type: FETCH_AMENITIES,
        payload: data
    }
}

const deleteSuccess = (id) => {
    return {
        type: DELETE_AMENITIES,
        payload: id
    }
}


const errorAction = (error) => ({
    type: AMENITIES_ERROR,
    payload:
        error?.response?.data?.message?.subproperty ||
        error?.response?.data?.message ||
        "Something went wrong",
});


export const fetchAmenities = () => {
    return async (dispatch) => {
        try {   
            dispatch({ type: "AMENITIES_LOADING" });
            const response = await axios.get(`${API_BASE_URL}/amenities`)
            dispatch(fetchSuccess(response.data))
        } catch (error) {
            console.error("Error fetching amenities", error)
        }
    }
}

export const addAmenities = (insertData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "AMENITIES_ADD_LOADING" });
            await axios.post(`${API_BASE_URL}/amenities`, insertData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(fetchAmenities())
            return {
                success: true,
            };

        } catch (error) {
            console.error("Error adding Group types:", error);
            dispatch(errorAction(error));
            const errMessage =
                error?.response?.data?.messages || "Something went wrong";
            return {
                success: false,
                error: errMessage,
            };
        }
    }
}

export const deleteAmenities = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "AMENITIES_DELETE_LOADING" });
            await axios.delete(`${API_BASE_URL}/amenities/${id}`);
            dispatch(deleteSuccess(id));
        } catch (error) {
            console.error('Error deleting amenities:', error);
        }
    }
}

export const updateAmenities = (insertData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "AMENITIES_UPDATE_LOADING" });
            await axios.put(`${API_BASE_URL}/amenities/${insertData?.id}`, insertData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(fetchAmenities())
            return {
                success: true,
            };

        } catch (error) {
            console.error("Error adding Group types:", error);
            dispatch(errorAction(error));
            const errMessage =
                error?.response?.data?.messages || "Something went wrong";
            return {
                success: false,
                error: errMessage,
            };
        }
    }
}