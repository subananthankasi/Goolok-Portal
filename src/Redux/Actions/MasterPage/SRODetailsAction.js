import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_SRO_Details = "FETCH_SRO_Details";
export const DEL_SRO_Details = "DEL_SRO_Details";
export const SRO_DETAILS_ERROR = "SRO_DETAILS_ERROR";

const fetchSRODetailsSuccess = (SRODetailsData) => {
  return {
    type: FETCH_SRO_Details,
    payload: SRODetailsData,
  };
};

const deleteSRODetailsSuccess = (id) => {
  return {
    type: DEL_SRO_Details,
    payload: id,
  };
};
const errorAction = (error) => ({
  type: SRO_DETAILS_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});
export const fetchSRODetails = () => {
  return async (dispatch) => {
    dispatch({ type: "SRO_DETAILS_FETCH_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/srodetails`, {
        headers: {
          "Gl-Status": "admin"
        }
      });
      dispatch(fetchSRODetailsSuccess(response.data));
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error Fetching SRODetails:", error);
    }
  };
};

export const addSRODetails = (insertData) => {
  return async (dispatch) => {
    dispatch({ type: "SRO_DETAILS_ADD_LOADING" });
    try {
      await axios.post(`${API_BASE_URL}/srodetails`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchSRODetails());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Adding SRODetails:", error);
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

export const deleteSRODetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SRO_DETAILS_DELETE_LOADING" });
    try {
      await axios.delete(`${API_BASE_URL}/srodetails/${id}`);
      dispatch(deleteSRODetailsSuccess(id));
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error deleting SRODetails:", error);
    }
  };
};

export const updateSRODetails = (updateData) => {
  return async (dispatch) => {
    dispatch({ type: "SRO_DETAILS_UPDATE_LOADING" });
    try {
      await axios.put(
        `${API_BASE_URL}/srodetails/${updateData.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchSRODetails());
      return {
        success: true,
      };
    } catch (error) {
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      dispatch(errorAction(error));
      console.error("Error Updating SRODetails:", error);
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};
