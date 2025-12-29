import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_SubCATEGORY = "FETCH_SubCATEGORY";
export const DEL_SubCATEGORY = "DEL_SubCATEGORY";
export const SUB_CATEGORY_ERROR = "SUB_CATEGORY_ERROR";

const fetchSubCategorySuccess = (Subcategorydata) => ({
  type: FETCH_SubCATEGORY,
  payload: Subcategorydata,
});

const deleteSubCategorySuccess = (id) => ({
  type: DEL_SubCATEGORY,
  payload: id,
});
const errorAction = (error) => ({
  type: SUB_CATEGORY_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

// Api
export const fetchSubCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SUBCATEGORY_LOADING" });
      const response = await axios.get(`${API_BASE_URL}/subcategory`);
      dispatch(fetchSubCategorySuccess(response.data));
    } catch (error) {
      console.error("Error fetching Subcategory types:", error);
    }
  };
};

export const addSubCategory = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SUBCATEGORY_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/subcategory`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchSubCategory());
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

export const deleteSubCategory = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SUBCATEGORY_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/subcategory/${id}`);
      dispatch(deleteSubCategorySuccess(id));
    } catch (error) {
      console.error("Error deleting Subcategory types:", error);
    }
  };
};

export const updateSubCategory = (updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SUBCATEGORY_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/subcategory/${updateData.id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchSubCategory());
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
