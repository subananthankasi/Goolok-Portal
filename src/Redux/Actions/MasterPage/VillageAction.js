import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_VILLAGE = "FETCH_VILLAGE";
export const DELETE_VILLAGE = "DELETE_VILLAGE";
export const VILLAGE_ERROR = "VILLAGE_ERROR";

const fetchSuccess = (data) => {
  return {
    type: FETCH_VILLAGE,
    payload: data,
  };
};

const deleteSuccess = (id) => {
  return {
    type: "DELETE_VILLAGE",
    payload: id,
  };
};
const errorAction = (error) => ({
  type: VILLAGE_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

export const fetchVillage = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_VILLAGE_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/village`, {
        headers: {
          "Gl-Status": "admin"
        }
      });
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      console.error("error fetchig village", error);
    }
  };
};

export const addVillage = (insertData) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_VILLAGE_LOADING" });
    try {
      await axios.post(`${API_BASE_URL}/village`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchVillage());
      return {
        success: true,
      };
    } catch (error) {
      console.error("error adding village", error);
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

export const deleteVillage = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_VILLAGE_LOADING" });
    try {
      await axios.delete(`${API_BASE_URL}/village/${id}`);
      dispatch(deleteSuccess(id));
    } catch (error) { }
  };
};

export const updateVillage = (id, updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_VILLAGE_LOADING" });
      await axios.put(`${API_BASE_URL}/village/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchVillage());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Updating village:", error);
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
