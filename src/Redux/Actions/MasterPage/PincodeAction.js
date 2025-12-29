import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_PINCODE = "FETCH_PINCODE";
export const DELETE_PINCODE = "DELETE_PINCODE";

const fetchSuccess = (data) => {
  return {
    type: FETCH_PINCODE,
    payload: data,
  };
};

const deleteSuccess = (id) => {
  return {
    type: DELETE_PINCODE,
    payload: id,
  };
};

export const fetchPincode = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_PINCODE_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/pincode`,{
        headers:{
          "Gl-Status":"admin"
        }
      });
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      console.error("Error fetching error pincode", error);
    }
  };
};

export const addPincode = (insertData) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_PINCODE_LOADING" });
    try {
      await axios.post(`${API_BASE_URL}/pincode`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchPincode());
    } catch (error) {
      console.error("Error adding pincode", error);
    }
  };
};

export const deletePincode = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_PINCODE_LOADING" });
    try {
      await axios.delete(`${API_BASE_URL}/pincode/${id}`);
      dispatch(deleteSuccess(id));
    } catch (error) {
      console.error("Error deleting pincode", error);
    }
  };
};

export const updatePincode = (id, updateData) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_PINCODE_LOADING" });
    try {
      await axios.put(`${API_BASE_URL}/pincode/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchPincode());
    } catch (error) {
      console.error("Error Updating pincode:", error);
    }
  };
};
