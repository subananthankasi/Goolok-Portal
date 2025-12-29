import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";

export const FETCH_UNIT = "FETCH_UNIT";
export const DEL_UNIT = "DEL_UNIT";
export const UNIT_ERROR = "UNIT_ERROR";

const fetchUnitSuccess = (data) => {
  return {
    type: FETCH_UNIT,
    payload: data,
  };
};

const deleteSuccess = (id) => {
  return {
    type: DEL_UNIT,
    payload: id,
  };
};

const errorAction = (error) => ({
  type: UNIT_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

export const fetchUnit = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UNIT_FETCH_LOADING" });
      const response = await axios.get(`${API_BASE_URL}/unit`);
      dispatch(fetchUnitSuccess(response.data));
    } catch (error) {
      console.error("Error fetching taluk data:", error);
    }
  };
};

export const addUnit = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UNIT_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/unit`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Added successfully", type: "success" });
      dispatch(fetchUnit());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Adding taluk:", error);
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

export const deleteUnit = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UNIT_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/unit/${id}`);
      dispatch(deleteSuccess(id));
    } catch (error) {
      console.error("Error deleting taluk:", error);
    }
  };
};

export const updateUnit = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UNIT_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/unit/${data.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchUnit());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Updating taluk:", error);
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
