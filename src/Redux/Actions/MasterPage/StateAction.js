import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_STATE = "FETCH_STATE";
export const ADD_STATE = "ADD_STATE";
export const DEL_STATE = "DEL_STATE";
export const UPDATE_STATE = "UPDATE_STATE";
export const STATE_ERROR = "STATE_ERROR";

export const fetchStateSuccess = (StateData) => ({
  type: FETCH_STATE,
  payload: StateData,
});

export const addStateSuccess = (insertData) => ({
  type: ADD_STATE,
  payload: insertData,
});

export const deletePropertySuccess = (id) => ({
  type: DEL_STATE,
  payload: id,
});

export const updateStateSuccess = (updateData) => ({
  type: UPDATE_STATE,
  payload: updateData,
});
const errorAction = (error) => ({
  type: STATE_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});
// Api

export const fetchState = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STATE_FETCH_LOADING" });
      const response = await axios.get(`${API_BASE_URL}/state`,{
        headers:{
          "Gl-Status":"admin"
        }
      });
      dispatch(fetchStateSuccess(response.data));
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error fetching property types:", error);
    }
  };
};

export const addState = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STATE_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/state`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(fetchState());
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

export const deleteState = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STATE_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/state/${id}`);
      dispatch(deletePropertySuccess(id));
    } catch (error) {
      console.error("Error deleting property types:", error);
      dispatch(errorAction(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const updateState = (id, updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "STATE_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/state/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchState());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating property types:", error);
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
