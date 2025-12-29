import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FECTCH_DISCTRICT = "FECTCH_DISCTRICT";
export const DEL_DISTRICT = "DEL_DISTRICT";
export const DISTRICT_ERROR = "DISTRICT_ERROR";

const fetchSuccess = (data) => {
  return {
    type: FECTCH_DISCTRICT,
    payload: data,
  };
};

const deleteSuccess = (id) => {
  return {
    type: DEL_DISTRICT,
    payload: id,
  };
};

const errorAction = (error) => ({
  type: DISTRICT_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

export const fetchDistrict = () => {
  return async (dispatch) => {
    dispatch({ type: "DISTRICT_FETCH_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/district`, {
        headers: {
          "Gl-Status": "admin"
        }
      });
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      console.error("Error fetching district", error);
      dispatch(errorAction(error));
    }
  };
};

export const addDistrict = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DISTRICT_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/district`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchDistrict());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Adding District:", error);
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

export const deleteDistrict = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DISTRICT_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/district/${id}`);
      dispatch(deleteSuccess(id));
    } catch (error) {
      console.error("Error deleting District:", error);
      dispatch(errorAction(error));
    }
  };
};

export const updateDistrict = (id, updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DISTRICT_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/district/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchDistrict());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Updating District:", error);
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
