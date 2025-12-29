import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_BRANCH = "FETCH_BRANCH";
export const DELETE_BRANCH = "DELETE_BRANCH";
export const BRANCH_ID = "BRANCH_ID";
export const BRANCH_ERROR = "BRANCH_ERROR";

const fetchSuccess = (data) => {
  return {
    type: FETCH_BRANCH,
    payload: data,
  };
};

const deleteSuccess = (id) => {
  return {
    type: DELETE_BRANCH,
    payload: id,
  };
};

const successBranchID = (id) => {
  return {
    type: BRANCH_ID,
    payload: id,
  };
};

const errorAction = (error) => ({
  type: BRANCH_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

export const fetchBranch = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_BRANCH_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/branch`);
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      console.error("Error fetching branch", error);
    }
  };
};

export const addBranch = (insertData) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_BRANCH_LOADING" });
    try {
      await axios.post(`${API_BASE_URL}/branch`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchBranch());
      return {
        success: true,
      };
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error :", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const updateBranch = (id, updateData) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_BRANCH_LOADING" });
    try {
      await axios.put(`${API_BASE_URL}/branch/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchBranch());
      return {
        success: true,
      };
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error :", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const deleteBranch = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_BRANCH_LOADING" });
    try {
      await axios.delete(`${API_BASE_URL}/branch/${id}`);
      dispatch(deleteSuccess(id));
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };
};

export const fetchBranchID = () => {
  return async (dispatch) => {
    // dispatch({ type: "FETCH_BRANCH_ID_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/branch/${3}`);
      dispatch(successBranchID(response.data));
    } catch (error) {
      console.error("Error fetching branch", error);
    }
  };
};
