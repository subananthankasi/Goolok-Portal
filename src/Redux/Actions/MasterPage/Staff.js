import axios from 'axios';
import API_BASE_URL from '../../../Api/api';

export const FETCH_STAFF = 'FETCH_STAFF';
export const ADD_STAFF = 'ADD_STAFF';
export const ADD_STAFF_FAILURE = 'ADD_STAFF_FAILURE';
export const STAFF_DEL = 'STAFF_DEL';
export const STAFF_ID = "STAFF_ID";
export const STAFF_ERROR = "STAFF_ERROR";


// Action Creators
export const fetchStaffSuccess = (staff) => ({
  type: FETCH_STAFF,
  payload: staff,
});



export const deleteStaffSuccess = (satffID) => ({
  type: STAFF_DEL,
  payload: satffID
})

const successStaffID = (id) => ({
  type: STAFF_ID,
  payload: id
})

const errorAction = (error) => ({
  type: STAFF_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});
// Thunk Actions
export const fetchStaff = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STAF_FETCH_LOADING" });
      const response = await axios.get(`${API_BASE_URL}/staff`);
      dispatch(fetchStaffSuccess(response.data));
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };
};


export const addStaff = (staffData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STAFF_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/staff`, staffData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(fetchStaff());
      return {
        success: true,
      };
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error adding property types:", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const deleteStaff = (staffID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STAFF_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/staff/${staffID}`);
      dispatch(deleteStaffSuccess(staffID));
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  }
}


export const fetchStaffID = () => {
  return async (dispatch) => {
    try {

      const response = await axios.get(`${API_BASE_URL}/staff/${3}`);
      dispatch(successStaffID(response.data))
    }
    catch (error) {
      console.error("Error fetching branch", error)
    }
  }
}


export const updateStaff = (id, updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STAFF_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/staff/${id}`, updateData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(fetchStaff())
       return {
        success: true,
      };
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error adding property types:", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  }
}