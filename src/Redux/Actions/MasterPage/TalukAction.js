
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_TALUK = "FETCH_TALUK";
export const DEL_TALUK = "DEL_TALUK";
export const TALUK_ERROR = "TALUK_ERROR";

const fetchTalukSuccess = (data) => {
  return {
    type: FETCH_TALUK,
    payload: data,
  };
};

const deleteSuccess = (id) => {
  return {
    type: DEL_TALUK,
    payload: id,
  };
};
const errorAction = (error) => ({
  type: TALUK_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

export const fetchTaluk = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Fetch_Taluk" });
      const response = await axios.get(`${API_BASE_URL}/taluk`, {
        headers: {
          "Gl-Status": "admin"
        }
      });
      dispatch(fetchTalukSuccess(response.data));
    } catch (error) {
      console.error("Error fetching taluk data:", error);
    }
  };
};

export const addTaluk = (insertData) => {
  return async (dispatch) => {
    dispatch({ type: "Add_Taluk" });
    try {
      await axios.post(`${API_BASE_URL}/taluk`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchTaluk());
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

export const deleteTaluk = (id) => {
  return async (dispatch) => {
    dispatch({ type: "Del_Taluk" });
    try {
      await axios.delete(`${API_BASE_URL}/taluk/${id}`);
      dispatch(deleteSuccess(id));
    } catch (error) {
      console.error("Error deleting taluk:", error);
    }
  };
};

export const updateTaluk = (id, updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Update_Taluk" });
      await axios.put(`${API_BASE_URL}/taluk/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchTaluk());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Updating Taluk:", error);
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
