import axios from "axios";
import API_BASE_URL from "../../../Api/api";
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export const DEL_CATEGORY = "DEL_CATEGORY";
export const CATEGORY_ERROR = "CATEGORY_ERROR";

const fetchCategorySuccess = (categorydata) => ({
  type: FETCH_CATEGORY,
  payload: categorydata,
});

const deleteCategorySuccess = (id) => ({
  type: DEL_CATEGORY,
  payload: id,
});

const errorAction = (error) => ({
  type: CATEGORY_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

// Api
export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CATEGORY_LOADING" });
      const response = await axios.get(`${API_BASE_URL}/category`);
      dispatch(fetchCategorySuccess(response.data));
    } catch (error) {
      console.error("Error fetching category types:", error);
    }
  };
};

export const addCategory = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CATEGORY_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/category`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchCategory());
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
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CATEGORY_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/category/${id}`);
      dispatch(deleteCategorySuccess(id));
    } catch (error) {
      console.error("Error deleting category types:", error);
    }
  };
};

export const updateCategory = (updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CATEGORY_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/category/${updateData.id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchCategory());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating category types:", error);
      console.error("Error adding Group types:", error);
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
